"use client";
import DataTable from "../(tables)/data-table/advanced/index";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Kanban, 
  Users, 
  TrendingUp, 
  Target,
  Plus,
  Filter,
  Download,
  Share2
} from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* Header con título y acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administración de Leads</h1>
          <p className="text-gray-600 mt-1">
            Gestiona y analiza todos los leads inmobiliarios de SomosLuxGroup
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Link href="/es/leads/kanban">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <Kanban className="h-4 w-4 mr-2" />
              Ver Kanban
            </Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Cards de resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Leads</p>
                <p className="text-2xl font-bold text-blue-900">25</p>
                <p className="text-xs text-blue-700">+12% vs mes anterior</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Conversiones</p>
                <p className="text-2xl font-bold text-green-900">8</p>
                <p className="text-xs text-green-700">32% tasa de conversión</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">En Seguimiento</p>
                <p className="text-2xl font-bold text-yellow-900">12</p>
                <p className="text-xs text-yellow-700">48% del total</p>
              </div>
              <Target className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Alta Prioridad</p>
                <p className="text-2xl font-bold text-purple-900">5</p>
                <p className="text-xs text-purple-700">Requieren atención</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla principal */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-gray-50">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Lista de Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable />
        </CardContent>
      </Card>
    </div>
  );
} 