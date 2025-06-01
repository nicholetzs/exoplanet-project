import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { FieldError } from "./field-error";
import type { LucideIcon } from "lucide-react";

interface ValidatedInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  getFieldClasses: (name: string, baseClasses: string) => string;
  isFieldValid: (name: string, value: string) => boolean;
}

export const ValidatedInput = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  step,
  required = false,
  icon: Icon,
  iconColor = "text-gray-400",
  className = "",
  errors,
  touchedFields,
  getFieldClasses,
  isFieldValid,
}: ValidatedInputProps) => {
  const baseClasses = Icon
    ? "pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
    : "bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white";

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-cyan-400 font-medium">
        {label} {required && "*"}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-3 w-4 h-4 ${iconColor}`} />
        )}
        <Input
          id={id}
          name={name}
          type={type}
          step={step}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={getFieldClasses(name, baseClasses)}
          placeholder={placeholder}
        />
        {isFieldValid(name, value) && (
          <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
        )}
      </div>
      <FieldError name={name} errors={errors} touchedFields={touchedFields} />
    </div>
  );
};
