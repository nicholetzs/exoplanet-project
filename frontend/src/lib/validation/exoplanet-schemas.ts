import { z } from "zod";

// Schema para Step 1 - Informações Básicas
export const step1Schema = z.object({
  name: z
    .string()
    .min(1, "Planet name is required")
    .min(2, "Planet name must be at least 2 characters")
    .max(100, "Planet name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_.]+$/, "Planet name contains invalid characters"),

  nomenclature: z
    .string()
    .min(1, "Nomenclature is required")
    .min(3, "Nomenclature must be at least 3 characters")
    .max(50, "Nomenclature must be less than 50 characters"),

  classification: z.enum(
    ["Gasoso", "Terrestre", "Subneptuniano", "Super-Terra"],
    {
      errorMap: () => ({ message: "Please select a valid classification" }),
    }
  ),

  hostStar: z
    .string()
    .max(100, "Host star name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

// Schema para Step 2 - Propriedades Físicas
export const step2Schema = z.object({
  distanceLY: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      const num = Number.parseFloat(val);
      return !Number.isNaN(num) && num > 0 && num <= 100000;
    }, "Distance must be a positive number less than 100,000 light years"),

  massJupiter: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      const num = Number.parseFloat(val);
      return !Number.isNaN(num) && num > 0 && num <= 1000;
    }, "Mass must be a positive number less than 1,000 Jupiter masses"),

  orbitalPeriod: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      const num = Number.parseFloat(val);
      return !Number.isNaN(num) && num > 0 && num <= 1000000;
    }, "Orbital period must be a positive number less than 1,000,000 days"),

  temperature: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true;
      const num = Number.parseFloat(val);
      return !Number.isNaN(num) && num >= 0 && num <= 10000;
    }, "Temperature must be between 0 and 10,000 Kelvin"),
});

// ✅✅✅ SCHEMA PARA STEP 3 - CORRIGIDO ✅✅✅
export const step3Schema = z.object({
  // TORNADO OBRIGATÓRIO: Removido .optional() e .or(), adicionado .min(1)
  discoveryMethod: z.string().min(1, "O método de descoberta é obrigatório."),

  // TORNADO OBRIGATÓRIO: Removido .optional() e a checagem de valor vazio dentro do .refine()
  discoveryDate: z
    .string()
    .min(1, "A data de descoberta é obrigatória.") // Garante que não é uma string vazia
    .refine((val) => {
      // Agora o refine só roda se já houver um valor, não precisamos mais do 'if (!val)'
      const date = new Date(val);
      const now = new Date();
      const minDate = new Date("1995-01-01");
      return (
        date instanceof Date &&
        !isNaN(date.valueOf()) &&
        date >= minDate &&
        date <= now
      );
    }, "A data deve ser válida e entre 1995 e hoje."),

  // MANTIDO OPCIONAL: A estrutura para um campo opcional com validação estava correta.
  imageUrl: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true; // Permite o campo ser vazio
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "Por favor, insira uma URL válida")
    .refine((val) => {
      if (!val || val === "") return true;
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      return imageExtensions.some((ext) => val.toLowerCase().includes(ext));
    }, "A URL deve apontar para um arquivo de imagem (jpg, png, etc.)"),
});

// Schema completo para validação final
export const completeExoplanetSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);

// Tipos TypeScript derivados dos schemas
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type CompleteExoplanetData = z.infer<typeof completeExoplanetSchema>;

// Função para obter schema por step
export const getSchemaByStep = (step: number) => {
  switch (step) {
    case 1:
      return step1Schema;
    case 2:
      return step2Schema;
    case 3:
      return step3Schema;
    default:
      return completeExoplanetSchema;
  }
};
