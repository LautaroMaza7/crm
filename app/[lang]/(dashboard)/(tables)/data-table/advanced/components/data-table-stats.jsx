"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Target,
  Calendar,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTableStats({ data, filteredData }) {
  const totalLeads = data.length;
  const filteredLeads = filteredData.length;
  
  // Calcular estadísticas
  const stats = {
    nuevos: data.filter(lead => lead.estado === "nuevo").length,
    enSeguimiento: data.filter(lead => lead.estado === "en seguimiento").length,
    contactados: data.filter(lead => lead.estado === "contactado").length,
    altaPrioridad: data.filter(lead => lead.prioridad === "alta").length,
    mediaPrioridad: data.filter(lead => lead.prioridad === "media").length,
    bajaPrioridad: data.filter(lead => lead.prioridad === "baja").length,
  };

  const proyectos = [...new Set(data.map(lead => lead.proyecto))];
  const proyectosStats = proyectos.map(proyecto => ({
    nombre: proyecto,
    count: data.filter(lead => lead.proyecto === proyecto).length
  }));

  return (
    <div className="space-y-4">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Leads</p>
                <p className="text-2xl font-bold text-blue-900">{totalLeads}</p>
                {filteredLeads !== totalLeads && (
                  <p className="text-xs text-blue-700">
                    {filteredLeads} filtrados
                  </p>
                )}
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">En Seguimiento</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.enSeguimiento}</p>
                <p className="text-xs text-yellow-700">
                  {((stats.enSeguimiento / totalLeads) * 100).toFixed(1)}% del total
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Contactados</p>
                <p className="text-2xl font-bold text-green-900">{stats.contactados}</p>
                <p className="text-xs text-green-700">
                  {((stats.contactados / totalLeads) * 100).toFixed(1)}% del total
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Alta Prioridad</p>
                <p className="text-2xl font-bold text-red-900">{stats.altaPrioridad}</p>
                <p className="text-xs text-red-700">
                  Requieren atención inmediata
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas por proyecto */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Leads por Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proyectosStats.map((proyecto) => (
              <div key={proyecto.nombre} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{proyecto.nombre}</p>
                    <p className="text-sm text-gray-600">{proyecto.count} leads</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {((proyecto.count / totalLeads) * 100).toFixed(1)}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribución de estados */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Distribución de Estados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Nuevos</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{stats.nuevos}</p>
                <p className="text-sm text-gray-600">
                  {((stats.nuevos / totalLeads) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-900">En Seguimiento</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{stats.enSeguimiento}</p>
                <p className="text-sm text-gray-600">
                  {((stats.enSeguimiento / totalLeads) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Contactados</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{stats.contactados}</p>
                <p className="text-sm text-gray-600">
                  {((stats.contactados / totalLeads) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 