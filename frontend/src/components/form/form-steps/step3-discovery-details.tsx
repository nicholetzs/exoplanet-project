import type React from "react";

import { Camera, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ValidatedInput } from "../validated-input";
import { ValidatedSelect } from "../validated-select";
import type { FormData } from "@/hooks/use-form-validation";

interface Step3DiscoveryDetailsProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleBlur: (name: string) => void;
  errors: Record<string, string>;
  touchedFields: Record<string, boolean>;
  getFieldClasses: (name: string, baseClasses: string) => string;
  isFieldValid: (name: string, value: string) => boolean;
}

const discoveryMethodOptions = [
  { value: "Transit", label: "Transit" },
  { value: "Radial Velocity", label: "Radial Velocity" },
  { value: "Direct Imaging", label: "Direct Imaging" },
  { value: "Gravitational Microlensing", label: "Gravitational Microlensing" },
  { value: "Astrometry", label: "Astrometry" },
];

export const Step3DiscoveryDetails = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleBlur,
  errors,
  touchedFields,
  getFieldClasses,
  isFieldValid,
}: Step3DiscoveryDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidatedSelect
          id="discoveryMethod"
          name="discoveryMethod"
          label="Discovery Method"
          value={formData.discoveryMethod}
          onChange={(value) => handleSelectChange("discoveryMethod", value)}
          placeholder="Select method"
          options={discoveryMethodOptions}
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
        />

        <ValidatedInput
          id="discoveryDate"
          name="discoveryDate"
          label="Discovery Date"
          value={formData.discoveryDate}
          onChange={handleInputChange}
          onBlur={() => handleBlur("discoveryDate")}
          type="date"
          errors={errors}
          touchedFields={touchedFields}
          getFieldClasses={getFieldClasses}
          isFieldValid={isFieldValid}
        />
      </div>

      <ValidatedInput
        id="imageUrl"
        name="imageUrl"
        label="Image URL"
        value={formData.imageUrl}
        onChange={handleInputChange}
        onBlur={() => handleBlur("imageUrl")}
        placeholder="https://example.com/planet-image.jpg"
        type="url"
        icon={Camera}
        errors={errors}
        touchedFields={touchedFields}
        getFieldClasses={getFieldClasses}
        isFieldValid={isFieldValid}
      />

      {/* Preview da imagem se URL fornecida e válida */}
      {formData.imageUrl && !errors.imageUrl && (
        <div className="space-y-2">
          <Label className="text-cyan-400 font-medium">Image Preview</Label>
          <div className="relative overflow-hidden rounded-lg border border-slate-600">
            <img
              src={formData.imageUrl || "/placeholder.svg"}
              alt="Planet preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                if (
                  target.nextSibling &&
                  target.nextSibling instanceof HTMLElement
                ) {
                  target.nextSibling.style.display = "flex";
                }
              }}
            />
            <div
              className="w-full h-48 flex items-center justify-center bg-slate-800/50 text-gray-400"
              style={{ display: "none" }}
            >
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p>Failed to load image</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
