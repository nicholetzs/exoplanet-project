import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  name: string;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
}

export const FieldError = ({
  name,
  errors,
  touchedFields,
}: FieldErrorProps) => {
  if (!errors[name] || !touchedFields[name]) return null;

  return (
    <div className="flex items-center gap-2 mt-1 text-red-400 text-sm">
      <AlertCircle className="w-4 h-4" />
      <span>{errors[name]}</span>
    </div>
  );
};
