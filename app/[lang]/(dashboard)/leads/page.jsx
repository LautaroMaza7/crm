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
          <h1 className="text-3xl font-bold text-foreground">Administración de Leads</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona y analiza todos los leads inmobiliarios de SomosLuxGroup
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="border-border hover:bg-accent">
            <Filter className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" className="border-border hover:bg-accent">
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" className="border-border hover:bg-accent">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Link href="/leads/kanban">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Kanban className="h-4 w-4 mr-2" />
              Ver Kanban
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
      </div>

      {/* Cards de resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Leads</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">25</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">+12% vs mes anterior</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Conversiones</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">8</p>
                <p className="text-xs text-green-700 dark:text-green-300">32% tasa de conversión</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">En Seguimiento</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">12</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">48% del total</p>
              </div>
              <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Alta Prioridad</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">5</p>
                <p className="text-xs text-purple-700 dark:text-purple-300">Requieren atención</p>
              </div>
              <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla principal */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
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