"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Globe,
  Star,
  Ruler,
  Thermometer,
  Clock,
  Camera,
  Sparkles,
  Rocket,
  Users,
  Database,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Antenna,
  Dumbbell,
} from "lucide-react";

function AddPlanet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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

      delete payload.imageUrl;

      const response = await fetch("http://localhost:3001/api/exoplanets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Mostrar sucesso por um momento antes de navegar
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

  // Navegação Superior (mesma do Home)
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Antenna className="w-8 h-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ExoArchive
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                A Universe by Many Eyes
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch <span className="ml-2 text-xs text-gray-500">[L]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Users className="w-4 h-4 mr-2" />
              Crew <span className="ml-2 text-xs text-gray-500">[C]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              <Database className="w-4 h-4 mr-2" />
              Archive <span className="ml-2 text-xs text-gray-500">[A]</span>
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              Community <span className="ml-2 text-xs text-gray-500">[M]</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Launch
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Users className="w-4 h-4 mr-2" />
                Crew
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                <Database className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-gray-300 hover:text-cyan-400"
              >
                Community
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

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

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-600 border-cyan-500 text-white"
                      : "bg-slate-800 border-slate-600 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-cyan-500/30 scale-110" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    isActive ? "text-cyan-400" : "text-gray-500"
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

  // Renderizar campos baseado no step atual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cyan-400 font-medium">
                  Planet Name *
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., Kepler-452b"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="nomenclature"
                  className="text-cyan-400 font-medium"
                >
                  Nomenclature *
                </Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="nomenclature"
                    name="nomenclature"
                    required
                    value={formData.nomenclature}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., KOI-7016.01"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="classification"
                className="text-cyan-400 font-medium"
              >
                Classification *
              </Label>
              <Select
                value={formData.classification}
                onValueChange={(value) =>
                  handleSelectChange("classification", value)
                }
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white">
                  <SelectValue placeholder="Select planet type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Gasoso">Gas Giant</SelectItem>
                  <SelectItem value="Terrestre">Terrestrial</SelectItem>
                  <SelectItem value="Subneptuniano">Sub-Neptune</SelectItem>
                  <SelectItem value="Super-Terra">Super-Earth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostStar" className="text-cyan-400 font-medium">
                Host Star
              </Label>
              <div className="relative">
                <Star className="absolute left-3 top-3 w-4 h-4 text-yellow-400" />
                <Input
                  id="hostStar"
                  name="hostStar"
                  value={formData.hostStar}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                  placeholder="e.g., Kepler-452"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="distanceLY"
                  className="text-cyan-400 font-medium"
                >
                  Distance (Light Years)
                </Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="distanceLY"
                    name="distanceLY"
                    type="number"
                    step="0.01"
                    value={formData.distanceLY}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., 1402"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="massJupiter"
                  className="text-cyan-400 font-medium"
                >
                  Mass (Jupiter Units)
                </Label>
                <div className="relative">
                  <Dumbbell className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="massJupiter"
                    name="massJupiter"
                    type="number"
                    step="0.001"
                    value={formData.massJupiter}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., 1.63"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="orbitalPeriod"
                  className="text-cyan-400 font-medium"
                >
                  Orbital Period (Days)
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="orbitalPeriod"
                    name="orbitalPeriod"
                    type="number"
                    step="0.01"
                    value={formData.orbitalPeriod}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., 384.8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="temperature"
                  className="text-cyan-400 font-medium"
                >
                  Temperature (Kelvin)
                </Label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="temperature"
                    name="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                    placeholder="e.g., 265"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="discoveryMethod"
                  className="text-cyan-400 font-medium"
                >
                  Discovery Method
                </Label>
                <Select
                  value={formData.discoveryMethod}
                  onValueChange={(value) =>
                    handleSelectChange("discoveryMethod", value)
                  }
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Transit">Transit</SelectItem>
                    <SelectItem value="Radial Velocity">
                      Radial Velocity
                    </SelectItem>
                    <SelectItem value="Direct Imaging">
                      Direct Imaging
                    </SelectItem>
                    <SelectItem value="Gravitational Microlensing">
                      Gravitational Microlensing
                    </SelectItem>
                    <SelectItem value="Astrometry">Astrometry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="discoveryDate"
                  className="text-cyan-400 font-medium"
                >
                  Discovery Date
                </Label>
                <Input
                  id="discoveryDate"
                  name="discoveryDate"
                  type="date"
                  value={formData.discoveryDate}
                  onChange={handleInputChange}
                  className="bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-cyan-400 font-medium">
                Image URL
              </Label>
              <div className="relative">
                <Camera className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-800/50 border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/20 text-white"
                  placeholder="https://example.com/planet-image.jpg"
                />
              </div>
            </div>

            {/* Preview da imagem se URL fornecida */}
            {formData.imageUrl && (
              <div className="space-y-2">
                <Label className="text-cyan-400 font-medium">
                  Image Preview
                </Label>
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

        <Navigation />

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

      <Navigation />

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
                        onClick={() => setCurrentStep(currentStep + 1)}
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
