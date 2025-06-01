"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  Eye,
  Star,
  Ruler,
  Globe,
  Zap,
  RefreshCw,
  AlertTriangle,
  Rocket,
  Users,
  Database,
  Menu,
  X,
} from "lucide-react";

interface Exoplanet {
  id: string | number;
  name: string;
  nomenclature?: string;
  classification?: string;
  images?: { url?: string }[]; // array de imagens com URLs opcionais
  hostStar?: string;
  distanceLY?: number;
}

function Home() {
  const [exoplanets, setExoplanets] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchExoplanets();
  }, []);

  const fetchExoplanets = async () => {
    try {
      console.log("Tentando carregar exoplanetas...");
      const response = await fetch("http://localhost:3001/api/exoplanets");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Exoplanetas carregados:", data);
      setExoplanets(data);
    } catch (error) {
      console.error("Erro ao carregar exoplanetas:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  // Navegação Superior
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
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

          {/* Menu Desktop */}
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

          {/* Menu Mobile */}
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

        {/* Menu Mobile Expandido */}
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

  // Hero Section com Layout de Duas Colunas
  const HeroSection = () => (
    <section className="pt-24 pb-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Coluna Esquerda - Texto e Botões */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-cyan-500/30">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-cyan-400 font-medium">
                  SISTEMA ONLINE
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  EXPLORE THE
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  UNIVERSE
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg leading-relaxed">
                and feel the sensation of discovering worlds beyond our solar
                system
              </p>

              <p className="text-gray-400 max-w-md leading-relaxed">
                Join a collaborative community of astronomers, researchers, and
                space enthusiasts documenting exoplanets from telescopes around
                the world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0 shadow-lg shadow-cyan-500/25 text-lg px-8 py-6"
              >
                <Link to="/add">
                  <Plus className="w-5 h-5 mr-2" />
                  Start Discovery
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 text-lg px-8 py-6"
              >
                <Eye className="w-5 h-5 mr-2" />
                Explore Archive
              </Button>
            </div>
          </div>

          {/* Coluna Direita - Visual do Foguete */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Foguete Principal */}
              <div className="rocket-container">
                <Rocket className="w-32 h-32 md:w-48 md:h-48 text-red-500 rocket-icon" />

                {/* Efeitos de Propulsão */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-16 bg-gradient-to-t from-orange-500 via-red-500 to-yellow-400 rounded-full opacity-80 animate-pulse rocket-flame"></div>
                  <div className="w-6 h-12 bg-gradient-to-t from-blue-400 via-cyan-400 to-white rounded-full opacity-60 animate-pulse rocket-flame-inner"></div>
                </div>

                {/* Partículas */}
                <div className="absolute inset-0 particles">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping particle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Círculos de Órbita */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-96 md:h-96 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
                <div className="absolute w-48 h-48 md:w-72 md:h-72 border border-blue-500/20 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Componente de Loading Melhorado
  const FuturisticLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="nebula"></div>
      </div>

      <Navigation />
      <HeroSection />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 text-cyan-400 text-lg">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="font-medium">
              Scanning deep space for exoplanets...
            </span>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm"
            >
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-lg bg-slate-700/50" />
                <Skeleton className="h-6 w-3/4 bg-slate-700/50" />
                <Skeleton className="h-4 w-1/2 bg-slate-700/50" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-700/50" />
                  <Skeleton className="h-4 w-2/3 bg-slate-700/50" />
                  <Skeleton className="h-10 w-full bg-slate-700/50 mt-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Componente de Erro Melhorado
  const FuturisticError = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="nebula"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Connection Lost
            </h2>
            <p className="text-gray-400">
              Unable to establish link with the archive
            </p>
          </div>

          <Alert className="bg-red-900/20 border-red-500/50 backdrop-blur-sm mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              <strong>System Error:</strong> {error}
            </AlertDescription>
          </Alert>

          <p className="text-gray-400 mb-6">
            Verify that the backend service is running on port 3001
          </p>

          <Button
            onClick={fetchExoplanets}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-0"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    </div>
  );

  if (loading) return <FuturisticLoader />;
  if (error) return <FuturisticError />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      {/* Efeitos de fundo melhorados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="nebula"></div>
      </div>

      <Navigation />
      <HeroSection />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Seção de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50">
            <div className="text-3xl font-bold text-cyan-400">
              {exoplanets.length}
            </div>
            <div className="text-sm text-gray-400">Exoplanets</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50">
            <div className="text-3xl font-bold text-blue-400">∞</div>
            <div className="text-sm text-gray-400">Possibilities</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50">
            <div className="text-3xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-gray-400">Monitoring</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50">
            <div className="text-3xl font-bold text-green-400">Live</div>
            <div className="text-sm text-gray-400">Data Feed</div>
          </div>
        </div>

        {/* Estado Vazio Melhorado */}
        {exoplanets.length === 0 ? (
          <Card className="max-w-4xl mx-auto bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="text-center py-20">
              <div className="relative mb-8">
                <div className="text-8xl mb-6 animate-pulse">🪐</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-cyan-500/30 rounded-full animate-spin"></div>
                </div>
              </div>
              <CardTitle className="text-3xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                The Archive Awaits Your Discovery
              </CardTitle>
              <CardDescription className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Be the first to contribute to this collaborative universe. Every
                exoplanet you add becomes a beacon of knowledge for astronomers
                worldwide.
              </CardDescription>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <Link to="/add">
                  <Plus className="w-5 h-5 mr-2" />
                  Begin Your Journey
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Grid de Exoplanetas Melhorado */
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Discovered Worlds
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Each planet represents a unique discovery in our ever-expanding
                understanding of the cosmos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exoplanets.map((planet) => (
                <Card
                  key={planet.id}
                  className="group bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/50 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      {planet.images && planet.images[0] ? (
                        <img
                          src={planet.images[0].url || "/placeholder.svg"}
                          alt={planet.name}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement; // Aqui está o cast
                            target.style.display = "none";
                            if (
                              target.nextSibling &&
                              target.nextSibling instanceof HTMLElement
                            ) {
                              target.nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative"
                        style={{
                          display:
                            planet.images && planet.images[0] ? "none" : "flex",
                        }}
                      >
                        <Globe className="w-16 h-16 text-cyan-400 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                      </div>

                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-cyan-600/80 text-white backdrop-blur-sm border-0 shadow-lg"
                        >
                          {planet.classification}
                        </Badge>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {planet.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {planet.nomenclature}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {planet.hostStar && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{planet.hostStar}</span>
                      </div>
                    )}

                    {planet.distanceLY && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Ruler className="w-4 h-4 text-cyan-400" />
                        <span>{planet.distanceLY} light-years</span>
                      </div>
                    )}

                    <Button
                      asChild
                      className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                      <Link to={`/planet/${planet.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Explore World
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-400">
                ExoArchive © 2024 - A Universe by Many Eyes
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400"
              >
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400"
              >
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400"
              >
                Discord
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS para efeitos melhorados */}
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

        .rocket-container {
          position: relative;
          animation: rocketFloat 4s ease-in-out infinite;
        }

        .rocket-icon {
          filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.5));
          animation: rocketGlow 2s ease-in-out infinite alternate;
        }

        .rocket-flame {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          animation: flameFlicker 0.1s ease-in-out infinite alternate;
        }

        .rocket-flame-inner {
          position: absolute;
          left: 50%;
          top: 2px;
          transform: translateX(-50%);
          animation: flameFlicker 0.15s ease-in-out infinite alternate;
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

        @keyframes rocketFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes rocketGlow {
          0% {
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.8));
          }
        }

        @keyframes flameFlicker {
          0% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
          }
          100% {
            transform: translateX(-50%) scaleY(1.2) scaleX(0.8);
          }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 15s linear infinite reverse;
        }

        .particle {
          animation: particleFloat 3s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
