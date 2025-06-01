import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

interface Planet {
  id: string;
  name: string;
  nomenclature: string;
  classification: string;
  hostStar?: string;
  distanceLY?: number;
  massJupiter?: number;
  temperature?: number;
  orbitalPeriod?: number;
  discoveryMethod?: string;
  images?: { url: string }[];
}

function PlanetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState<Planet>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanet();
  }, [id]);

  const fetchPlanet = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/exoplanets/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setPlanet(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao carregar planeta:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar este exoplaneta?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/exoplanets/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao deletar planeta:", error);
        alert("Erro ao deletar exoplaneta");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Exoplaneta não encontrado</h2>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Voltar
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{planet.name}</h1>
            <p className="text-gray-400">{planet.nomenclature}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
        >
          🗑️ Deletar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {planet.images && planet.images[0] ? (
            <img
              src={planet.images[0].url}
              alt={planet.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-8xl">🪐</div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Informações</h2>

            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Classificação:</span>
                <span className="ml-2 font-semibold text-blue-400">
                  {planet.classification}
                </span>
              </div>

              {planet.hostStar && (
                <div>
                  <span className="text-gray-400">Estrela Hospedeira:</span>
                  <span className="ml-2">{planet.hostStar}</span>
                </div>
              )}

              {planet.distanceLY && (
                <div>
                  <span className="text-gray-400">Distância:</span>
                  <span className="ml-2">{planet.distanceLY} anos-luz</span>
                </div>
              )}

              {planet.massJupiter && (
                <div>
                  <span className="text-gray-400">Massa:</span>
                  <span className="ml-2">{planet.massJupiter}x Júpiter</span>
                </div>
              )}

              {planet.temperature && (
                <div>
                  <span className="text-gray-400">Temperatura:</span>
                  <span className="ml-2">{planet.temperature}K</span>
                </div>
              )}

              {planet.orbitalPeriod && (
                <div>
                  <span className="text-gray-400">Período Orbital:</span>
                  <span className="ml-2">{planet.orbitalPeriod} dias</span>
                </div>
              )}

              {planet.discoveryMethod && (
                <div>
                  <span className="text-gray-400">Método de Descoberta:</span>
                  <span className="ml-2">{planet.discoveryMethod}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetDetail;
