# /dsfr:form - Créer un Formulaire DSFR Accessible

Génère un formulaire React accessible et conforme RGAA avec les composants DSFR.

## Usage

```
/dsfr:form [NomFormulaire] [--fields "nom,email,message"] [--with-validation]
```

## Template de Base

```tsx
import { useState, FormEvent } from "react";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

interface ${NomFormulaire}Data {
  // Définir les champs du formulaire
  name: string;
  email: string;
  // ...
}

interface ${NomFormulaire}Errors {
  name?: string;
  email?: string;
  // ...
}

export function ${NomFormulaire}() {
  const [formData, setFormData] = useState<${NomFormulaire}Data>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<${NomFormulaire}Errors>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: ${NomFormulaire}Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse email valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Focus sur le premier champ en erreur pour l'accessibilité
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      (firstErrorField as HTMLElement)?.focus();
      return;
    }

    try {
      // Soumettre le formulaire
      // await submitForm(formData);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const handleChange = (field: keyof ${NomFormulaire}Data) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Effacer l'erreur quand l'utilisateur corrige
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitStatus === "success" && (
        <Alert
          severity="success"
          title="Formulaire envoyé"
          description="Votre demande a été enregistrée avec succès."
          className="fr-mb-4w"
        />
      )}

      {submitStatus === "error" && (
        <Alert
          severity="error"
          title="Erreur"
          description="Une erreur est survenue. Veuillez réessayer."
          className="fr-mb-4w"
        />
      )}

      <Input
        label="Nom complet"
        hintText="Prénom et nom de famille"
        state={errors.name ? "error" : "default"}
        stateRelatedMessage={errors.name}
        nativeInputProps={{
          required: true,
          name: "name",
          value: formData.name,
          onChange: handleChange("name"),
          "aria-invalid": !!errors.name,
        }}
      />

      <Input
        label="Adresse email"
        hintText="exemple@domaine.fr"
        state={errors.email ? "error" : "default"}
        stateRelatedMessage={errors.email}
        nativeInputProps={{
          type: "email",
          required: true,
          name: "email",
          value: formData.email,
          onChange: handleChange("email"),
          "aria-invalid": !!errors.email,
        }}
      />

      <ButtonsGroup
        buttons={[
          {
            children: "Envoyer",
            type: "submit",
            iconId: "fr-icon-send-plane-line",
            iconPosition: "right"
          },
          {
            children: "Annuler",
            priority: "secondary",
            type: "reset",
            onClick: () => {
              setFormData({ name: "", email: "" });
              setErrors({});
              setSubmitStatus("idle");
            }
          }
        ]}
      />
    </form>
  );
}
```

## Types de Champs DSFR

### Input (texte, email, password, etc.)
```tsx
<Input
  label="Label du champ"
  hintText="Texte d'aide optionnel"
  state="default" | "error" | "success"
  stateRelatedMessage="Message d'erreur ou succès"
  nativeInputProps={{
    type: "text" | "email" | "password" | "tel" | "number",
    required: true,
    name: "fieldName",
    placeholder: "Placeholder optionnel"
  }}
/>
```

### Textarea
```tsx
<Input
  label="Message"
  textArea
  nativeTextAreaProps={{
    required: true,
    name: "message",
    rows: 5
  }}
/>
```

### Select
```tsx
<Select
  label="Sujet"
  nativeSelectProps={{ required: true, name: "subject" }}
>
  <option value="">Sélectionnez une option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

### Checkbox
```tsx
<Checkbox
  legend="Consentement"
  options={[
    {
      label: "J'accepte les conditions d'utilisation",
      nativeInputProps: { required: true, name: "consent" }
    }
  ]}
/>
```

### RadioButtons
```tsx
<RadioButtons
  legend="Préférence de contact"
  name="contactPreference"
  options={[
    { label: "Email", nativeInputProps: { value: "email" } },
    { label: "Téléphone", nativeInputProps: { value: "phone" } }
  ]}
/>
```

## Règles d'Accessibilité RGAA

- ✅ Tous les champs ont un `label` explicite
- ✅ `hintText` pour les instructions supplémentaires
- ✅ `aria-invalid` sur les champs en erreur
- ✅ Messages d'erreur liés via `stateRelatedMessage`
- ✅ Focus sur le premier champ en erreur après soumission
- ✅ `noValidate` sur le form pour validation JS custom
- ✅ Messages d'erreur explicites et actionables

## Arguments

| Argument | Description |
|----------|-------------|
| `NomFormulaire` | Nom du composant formulaire |
| `--fields` | Liste des champs séparés par virgules |
| `--with-validation` | Inclure la validation côté client |

$ARGUMENTS
