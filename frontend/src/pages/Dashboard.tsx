import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Ruler, Thermometer, Star, Eye } from "lucide-react";

// Interface para os dados do exoplaneta
interface Exoplanet {
  id: string;
  name: string;
  nomenclature: string;
  classification: string;
  hostStar?: string;
  distanceLY?: number;
  temperature?: number;
  images?: { url: string }[];
}

// Componente Dashboard que exibe a lista de exoplanetas

function Dashboard({ exoplanets }: { exoplanets: Exoplanet[] }) {
  const getClassificationColor = (classification) => {
    const colors = {
      Gasoso: "bg-orange-500",
      Terrestre: "bg-green-500",
      Subneptuniano: "bg-blue-500",
      "Super-Terra": "bg-purple-500",
    };
    return colors[classification] || "bg-gray-500";
  };

  if (exoplanets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🪐</div>
        <h3 className="text-xl font-semibold mb-2">
          Nenhum exoplaneta encontrado
        </h3>
        <p className="text-gray-400">
          Adicione o primeiro exoplaneta à sua coleção!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {exoplanets.map((planet) => (
          <div
            key={planet.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-48 bg-gradient-to-br from-blue-900 to-purple-900">
              {planet.images && planet.images[0] ? (
                <img
                  src={planet.images[0].url}
                  alt={planet.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl">🪐</div>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getClassificationColor(
                    planet.classification
                  )}`}
                >
                  {planet.classification}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{planet.name}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {planet.nomenclature}
              </p>

              <div className="space-y-2 mb-4">
                {planet.hostStar && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{planet.hostStar}</span>
                  </div>
                )}

                {planet.distanceLY && (
                  <div className="flex items-center gap-2 text-sm">
                    <Ruler className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">
                      {planet.distanceLY} anos-luz
                    </span>
                  </div>
                )}

                {planet.temperature && (
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">{planet.temperature}K</span>
                  </div>
                )}
              </div>

              <Link
                to={`/planet/${planet.id}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
