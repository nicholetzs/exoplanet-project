import type React from "react";

import { Globe, Star } from "lucide-react";
import { ValidatedInput } from "../validated-input";
import { ValidatedSelect } from "../validated-select";
import type { FormData } from "@/hooks/use-form-validation";

interface Step1BasicInfoProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  getFieldClasses: (name: string, baseClasses: string) => string;
  isFieldValid: (name: string, value: string) => boolean;
}

const classificationOptions = [
  { value: "Gasoso", label: "Gas Giant" },
  { value: "Terrestre", label: "Terrestrial" },
  { value: "Subneptuniano", label: "Sub-Neptune" },
  { value: "Super-Terra", label: "Super-Earth" },
];

export const Step1BasicInfo = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors,
  touchedFields,
  getFieldClasses,
  isFieldValid,
}: Step1BasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidatedInput
          id="name"
          name="name"
          label="Planet Name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={() => handleBlur("name")}
          placeholder="e.g., Kepler-452b"
          required
          icon={Globe}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />

        <ValidatedInput
          id="nomenclature"
          name="nomenclature"
          label="Nomenclature"
          value={formData.nomenclature}
          onChange={handleInputChange}
          onBlur={() => handleBlur("nomenclature")}
          placeholder="e.g., KOI-7016.01"
          required
          icon={Star}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />
      </div>

      <ValidatedSelect
        id="classification"
        name="classification"
        label="Classification"
        value={formData.classification}
        onChange={(value) => handleSelectChange("classification", value)}
        placeholder="Select planet type"
        required
        options={classificationOptions}
        errors={errors}
        touchedFields={touchedFields}
        getFieldClasses={getFieldClasses}
      />

      <ValidatedInput
        id="hostStar"
        name="hostStar"
        label="Host Star"
        value={formData.hostStar}
        onChange={handleInputChange}
        onBlur={() => handleBlur("hostStar")}
        placeholder="e.g., Kepler-452"
        icon={Star}
        iconColor="text-yellow-400"
        errors={errors}
        touchedFields={touchedFields}
        getFieldClasses={getFieldClasses}
        isFieldValid={isFieldValid}
      />
    </div>
  );
};
