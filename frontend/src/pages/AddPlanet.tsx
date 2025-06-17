import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Save,
  Globe,
  Ruler,
  Antenna,
  Sparkles,
  Users,
  Database,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";

// Hooks e utilitários
import { useFormValidation, type FormData } from "@/hooks/use-form-validation";

// Componentes modulares
import { MainNavigation } from "@/components/navigation/main-navigation";
import { Step1BasicInfo } from "@/components/form/form-steps/step1-basic-info";
import { Step2PhysicalData } from "@/components/form/form-steps/step2-physical-data";
import { Step3DiscoveryDetails } from "@/components/form/form-steps/step3-discovery-details";

function AddPlanet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    nomenclature: "",
    classification: "",
    discoveryMethod: "",
    discoveryDate: "",
    distanceLY: "",
    massJupiter: "",
    hostStar: "",
    orbitalPeriod: "",
    temperature: "",
    imageUrl: "",
  });

  // Hook de validação
  const {
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
  } = useFormValidation(formData);

  // ✅ CORRIGIDO: A lógica de validação agora usa os dados mais recentes.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cria o novo estado ANTES de atualizar, para garantir que estamos validando os dados corretos
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    markFieldAsTouched(name);

    if (touchedFields[name]) {
      // Passa o objeto `updatedFormData` para a validação
      validateField(name, updatedFormData, currentStep);
    }
  };

  // ✅ CORRIGIDO: Mesma lógica aplicada aqui
  const handleSelectChange = (name: string, value: string) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    markFieldAsTouched(name);
    validateField(name, updatedFormData, currentStep);
  };

  // ✅ CORRIGIDO: Mesma lógica aplicada aqui também
  const handleBlur = (name: string) => {
    markFieldAsTouched(name);
    // No blur, o formData já foi atualizado pelo onChange, então podemos usá-lo diretamente
    validateField(name, formData, currentStep);
  };

  const handleNextStep = () => {
    if (validateCurrentStep(formData, currentStep)) {
      setCurrentStep(currentStep + 1);
      clearErrors();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação final completa
    if (!validateComplete(formData)) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        distanceLY: formData.distanceLY
          ? Number.parseFloat(formData.distanceLY)
          : null,
        massJupiter: formData.massJupiter
          ? Number.parseFloat(formData.massJupiter)
          : null,
        orbitalPeriod: formData.orbitalPeriod
          ? Number.parseFloat(formData.orbitalPeriod)
          : null,
        temperature: formData.temperature
          ? Number.parseFloat(formData.temperature)
          : null,
        images: formData.imageUrl ? [formData.imageUrl] : [],
      };

      // Remove imageUrl do payload pois será convertido para images
      const { imageUrl, ...finalPayload } = payload;

      const response = await fetch(
        "https://exoplanet-project.onrender.com/api/exoplanets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        }
      );

      if (response.ok) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar exoplaneta");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Indicador de Progresso
  const ProgressIndicator = () => {
    const steps = [
      { id: 1, name: "Basic Info", icon: Globe },
      { id: 2, name: "Physical Data", icon: Ruler },
      { id: 3, name: "Discovery", icon: Antenna },
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            const hasErrors =
              Object.keys(errors).length > 0 && currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    hasErrors
                      ? "bg-red-600 border-red-500 text-white"
                      : isActive
                      ? "bg-cyan-600 border-cyan-500 text-white"
                      : "bg-slate-800 border-slate-600 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-cyan-500/30 scale-110" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    hasErrors
                      ? "text-red-400"
                      : isActive
                      ? "text-cyan-400"
                      : "text-gray-500"
                  } hidden sm:block`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-cyan-500" : "bg-slate-600"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizar conteúdo do step atual
  const renderStepContent = () => {
    const commonProps = {
      formData,
      handleInputChange,
      handleSelectChange,
      handleBlur,
      errors,
      touchedFields,
      getFieldClasses,
      isFieldValid,
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...commonProps} />;
      case 2:
        return <Step2PhysicalData {...commonProps} />;
      case 3:
        return <Step3DiscoveryDetails {...commonProps} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="nebula"></div>
        </div>

        <MainNavigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-8">
            <CardContent className="text-center">
              <div className="relative mb-6">
                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Creating Exoplanet Entry
              </h2>
              <p className="text-gray-400">
                Adding your discovery to the archive...
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-cyan-400">
                <CheckCircle className="w-5 h-5" />
                <span>Data validated and transmitted</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="nebula"></div>
      </div>

      <MainNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              asChild
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Archive
              </Link>
            </Button>
          </div>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-ping" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Register New World
            </h1>
          </div>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Contribute to humanity's understanding of the cosmos by documenting
            your exoplanet discovery
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ProgressIndicator />

          {/* Erro de submissão */}
          {errors.submit && (
            <Alert className="mb-6 bg-red-900/20 border-red-500/50 backdrop-blur-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-400">
                <strong>Submission Error:</strong> {errors.submit}
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-white">
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Physical Properties"}
                {currentStep === 3 && "Discovery Details"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {currentStep === 1 &&
                  "Essential identification data for the exoplanet"}
                {currentStep === 2 &&
                  "Physical characteristics and measurements"}
                {currentStep === 3 && "Discovery method and observational data"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-slate-700/50">
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="border-slate-600 text-gray-300 hover:bg-slate-800/50 hover:border-slate-500"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="border-slate-600 text-gray-300 hover:bg-slate-800/50 hover:border-slate-500"
                    >
                      <Link to="/">Cancel</Link>
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0"
                      >
                        Next Step
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 border-0 shadow-lg shadow-green-500/25"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Add to Archive
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Informações adicionais */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/20 border-slate-700/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Antenna className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Peer Review</h3>
                <p className="text-sm text-gray-400">
                  All submissions undergo community validation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/20 border-slate-700/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Database className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Open Data</h3>
                <p className="text-sm text-gray-400">
                  Your discovery becomes part of the public archive
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/20 border-slate-700/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Attribution</h3>
                <p className="text-sm text-gray-400">
                  Full credit for your contribution to science
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CSS para efeitos (mesmo do Home) */}
      <style>{`
        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 178px 631px #fff, 1216px 263px #fff, 1379px 618px #fff,
            1421px 338px #fff, 1440px 859px #fff, 719px 1505px #fff,
            1696px 1552px #fff, 1996px 1750px #fff, 659px 1921px #fff,
            1338px 1340px #fff, 1122px 1345px #fff, 15px 1594px #fff,
            1085px 1553px #fff, 1267px 1843px #fff, 1692px 1773px #fff,
            1448px 1527px #fff, 1085px 2066px #fff, 1819px 1454px #fff,
            1867px 1824px #fff, 382px 1961px #fff, 518px 1843px #fff,
            1068px 1104px #fff, 1819px 1318px #fff, 401px 1205px #fff,
            1777px 1816px #fff, 524px 1399px #fff, 1179px 2156px #fff,
            1518px 1945px #fff, 516px 2169px #fff, 1888px 829px #fff;
          animation: animStar 50s linear infinite;
        }

        .twinkling {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 1851px 1351px #0ea5e9, 1651px 1351px #06b6d4,
            1851px 1851px #3b82f6, 1351px 1851px #8b5cf6, 1351px 1351px #06b6d4,
            851px 1351px #0ea5e9, 851px 851px #3b82f6, 1351px 851px #8b5cf6,
            1851px 851px #06b6d4, 851px 1851px #0ea5e9;
          animation: animStar 100s linear infinite;
        }

        .nebula {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              ellipse at 20% 50%,
              rgba(6, 182, 212, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 80% 20%,
              rgba(139, 92, 246, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 40% 80%,
              rgba(59, 130, 246, 0.1) 0%,
              transparent 50%
            );
          animation: nebulaDrift 60s ease-in-out infinite;
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        @keyframes nebulaDrift {
          0%,
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
          33% {
            transform: translateX(30px) translateY(-20px) scale(1.1);
          }
          66% {
            transform: translateX(-20px) translateY(30px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}

export default AddPlanet;
