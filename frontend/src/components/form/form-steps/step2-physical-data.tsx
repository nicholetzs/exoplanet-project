import type React from "react";

import { Ruler, Dumbbell, Clock, Thermometer } from "lucide-react";
import { ValidatedInput } from "../validated-input";
import type { FormData } from "@/hooks/use-form-validation";

interface Step2PhysicalDataProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (name: string) => void;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  getFieldClasses: (name: string, baseClasses: string) => string;
  isFieldValid: (name: string, value: string) => boolean;
}

export const Step2PhysicalData = ({
  formData,
  handleInputChange,
  handleBlur,
  errors,
  touchedFields,
  getFieldClasses,
  isFieldValid,
}: Step2PhysicalDataProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidatedInput
          id="distanceLY"
          name="distanceLY"
          label="Distance (Light Years)"
          value={formData.distanceLY}
          onChange={handleInputChange}
          onBlur={() => handleBlur("distanceLY")}
          placeholder="e.g., 1402"
          type="number"
          step="0.01"
          icon={Ruler}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />

        <ValidatedInput
          id="massJupiter"
          name="massJupiter"
          label="Mass (Jupiter Units)"
          value={formData.massJupiter}
          onChange={handleInputChange}
          onBlur={() => handleBlur("massJupiter")}
          placeholder="e.g., 1.63"
          type="number"
          step="0.001"
          icon={Dumbbell}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidatedInput
          id="orbitalPeriod"
          name="orbitalPeriod"
          label="Orbital Period (Days)"
          value={formData.orbitalPeriod}
          onChange={handleInputChange}
          onBlur={() => handleBlur("orbitalPeriod")}
          placeholder="e.g., 384.8"
          type="number"
          step="0.01"
          icon={Clock}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />

        <ValidatedInput
          id="temperature"
          name="temperature"
          label="Temperature (Kelvin)"
          value={formData.temperature}
          onChange={handleInputChange}
          onBlur={() => handleBlur("temperature")}
          placeholder="e.g., 265"
          type="number"
          step="0.1"
          icon={Thermometer}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />
      </div>
    </div>
  );
};
