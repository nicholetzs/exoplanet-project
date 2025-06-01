import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError } from "./field-error";

interface SelectOption {
  value: string;
  label: string;
}

interface ValidatedSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[];
  className?: string;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  getFieldClasses: (name: string, baseClasses: string) => string;
}

export const ValidatedSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  options,
  className = "",
  errors,
  touchedFields,
  getFieldClasses,
}: ValidatedSelectProps) => {
  const baseClasses =
    "bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white";

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-cyan-400 font-medium">
        {label} {required && "*"}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={getFieldClasses(name, baseClasses)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError name={name} errors={errors} touchedFields={touchedFields} />
    </div>
  );
};
