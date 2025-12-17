import Badge from "@codegouvfr/react-dsfr/Badge";

interface ScoreTagProps {
  score: number;
}

export function ScoreTag({ score }: ScoreTagProps) {
  const severity = score >= 80 ? "success" : score >= 50 ? "warning" : "error";

  return (
    <Badge severity={severity} small>
      {score}%
    </Badge>
  );
}
