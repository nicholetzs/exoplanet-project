import { useState } from "react";
import { z } from "zod";
import {
  getSchemaByStep,
  completeExoplanetSchema,
} from "@/lib/validation/exoplanet-schemas";

export interface FormData {
  name: string;
  nomenclature: string;
  classification: string;
  discoveryMethod: string;
  discoveryDate: string;
  distanceLY: string;
  massJupiter: string;
  hostStar: string;
  orbitalPeriod: string;
  temperature: string;
  imageUrl: string;
}

export const useFormValidation = (initialData: FormData) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // Validar campo específico
  const validateField = (name: string, value: string, currentStep: number) => {
    const schema = getSchemaByStep(currentStep);

    try {
      schema.parse({ ...initialData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path.includes(name));
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [name]: fieldError.message }));
          return false;
        }
      }
    }
    return true;
  };

  // Validar step atual
  const validateCurrentStep = (formData: FormData, currentStep: number) => {
    const schema = getSchemaByStep(currentStep);

    try {
      schema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
    }
    return false;
  };

  // Validação final completa
  const validateComplete = (formData: FormData) => {
    try {
      completeExoplanetSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
    }
    return false;
  };

  // Marcar campo como tocado
  const markFieldAsTouched = (name: string) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  // Limpar erros
  const clearErrors = () => {
    setErrors({});
  };

  // Verificar se campo tem erro
  const hasFieldError = (name: string) => {
    return !!(errors[name] && touchedFields[name]);
  };

  // Verificar se campo é válido
  const isFieldValid = (name: string, value: string) => {
    return !!(touchedFields[name] && !errors[name] && value);
  };

  // Obter classes CSS para campo
  const getFieldClasses = (name: string, baseClasses: string) => {
    const hasError = hasFieldError(name);
    const isValid = isFieldValid(name, initialData[name as keyof FormData]);

    if (hasError) {
      return `${baseClasses} border-red-500 focus:border-red-500 focus:ring-red-500/20`;
    }
    if (isValid) {
      return `${baseClasses} border-green-500 focus:border-green-500 focus:ring-green-500/20`;
    }
    return baseClasses;
  };

  return {
    errors,
    touchedFields,
    validateField,
    validateCurrentStep,
    validateComplete,
    markFieldAsTouched,
    clearErrors,
    hasFieldError,
    isFieldValid,
    getFieldClasses,
  };
};
