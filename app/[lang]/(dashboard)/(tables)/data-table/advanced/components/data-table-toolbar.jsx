"use client";
import { X, Plus, Search, Filter, Calendar, Users, Target, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function DataTableToolbar({ table }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const isFilteredState = table.getState().columnFilters.length > 0 || globalFilter || dateRange.from || dateRange.to;

  // Estados únicos para filtros
  const estados = useMemo(() => {
    const uniqueEstados = [...new Set(table.options.data.map(item => item.estado))];
    return uniqueEstados;
  }, [table.options.data]);

  const prioridades = useMemo(() => {
    const uniquePrioridades = [...new Set(table.options.data.map(item => item.prioridad))];
    return uniquePrioridades;
  }, [table.options.data]);

  const proyectos = useMemo(() => {
    const uniqueProyectos = [...new Set(table.options.data.map(item => item.proyecto))];
    return uniqueProyectos;
  }, [table.options.data]);

  // Colores para estados
  const estadoColors = {
    nuevo: "bg-blue-100 text-blue-800 border-blue-200",
    "en seguimiento": "bg-yellow-100 text-yellow-800 border-yellow-200",
    contactado: "bg-green-100 text-green-800 border-green-200",
  };

  // Colores para prioridades
  const prioridadColors = {
    alta: "bg-red-100 text-red-800 border-red-200",
    media: "bg-orange-100 text-orange-800 border-orange-200",
    baja: "bg-gray-100 text-gray-800 border-gray-200",
  };

  // Handler para crear un nuevo lead temporal
  const handleAddLead = () => {
    const id = `LEAD-TEMP-${Math.floor(Math.random() * 100000)}`;
    const newLead = {
      id,
      nombre: "Nuevo Lead",
      email: "",
      telefono: "",
      mensaje: "",
      estado: "nuevo",
      origen: "Meta",
      prioridad: "media",
      fecha: new Date().toISOString().slice(0, 10),
      proyecto: "",
    };
    
    table.options.data.unshift(newLead);
    table.setOptions({
      ...table.options,
      data: [...table.options.data],
    });
  };

  // Handler para búsqueda global
  const handleGlobalFilter = (value) => {
    setGlobalFilter(value);
    table.setGlobalFilter(value);
  };

  // Handler para limpiar todos los filtros
  const handleClearFilters = () => {
    setGlobalFilter("");
    setDateRange({ from: undefined, to: undefined });
    table.resetColumnFilters();
    table.setGlobalFilter("");
  };

  // Handler para filtro de fecha
  const handleDateFilter = (from, to) => {
    setDateRange({ from, to });
    // Aquí podrías implementar el filtro de fecha en la tabla
  };

  return (
    <div className="space-y-4">
      {/* Búsqueda global y acciones principales */}
      <Card className="border-0 bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Búsqueda global */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en todos los campos..."
                value={globalFilter}
                onChange={(event) => handleGlobalFilter(event.target.value)}
                className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                disabled={!isFilteredState}
                className="h-10 px-4 border-gray-300 hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
              <Button
                variant="default"
                onClick={handleAddLead}
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Lead
              </Button>
              <DataTableViewOptions table={table} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros avanzados */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filtros Avanzados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primera fila de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <Input
                placeholder="Filtrar por nombre..."
                value={table.getColumn("nombre")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("nombre")?.setFilterValue(event.target.value)
                }
                className="h-9 border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Filtro por email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                placeholder="Filtrar por email..."
                value={table.getColumn("email")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="h-9 border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Filtro por proyecto */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Proyecto</label>
              <Select
                value={table.getColumn("proyecto")?.getFilterValue() ?? ""}
                onValueChange={(value) =>
                  table.getColumn("proyecto")?.setFilterValue(value)
                }
              >
                <SelectTrigger className="h-9 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Todos los proyectos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los proyectos</SelectItem>
                  {proyectos.map((proyecto) => (
                    <SelectItem key={proyecto} value={proyecto}>
                      {proyecto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por fecha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-9 w-full justify-start text-left font-normal border-gray-300",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy", { locale: es })
                      )
                    ) : (
                      <span>Seleccionar fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={handleDateFilter}
                    numberOfMonths={2}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Segunda fila de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtro por estado */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.getColumn("estado")?.setFilterValue("")}
                  className={cn(
                    "h-8 text-xs",
                    !table.getColumn("estado")?.getFilterValue() 
                      ? "bg-blue-50 border-blue-200 text-blue-700" 
                      : "border-gray-300"
                  )}
                >
                  Todos
                </Button>
                {estados.map((estado) => (
                  <Button
                    key={estado}
                    variant="outline"
                    size="sm"
                    onClick={() => table.getColumn("estado")?.setFilterValue(estado)}
                    className={cn(
                      "h-8 text-xs",
                      table.getColumn("estado")?.getFilterValue() === estado
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "border-gray-300"
                    )}
                  >
                    <Badge 
                      className={cn(
                        "mr-1 text-xs",
                        estadoColors[estado] || "bg-gray-100 text-gray-800"
                      )}
                    >
                      {estado}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Filtro por prioridad */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Prioridad</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.getColumn("prioridad")?.setFilterValue("")}
                  className={cn(
                    "h-8 text-xs",
                    !table.getColumn("prioridad")?.getFilterValue() 
                      ? "bg-blue-50 border-blue-200 text-blue-700" 
                      : "border-gray-300"
                  )}
                >
                  Todas
                </Button>
                {prioridades.map((prioridad) => (
                  <Button
                    key={prioridad}
                    variant="outline"
                    size="sm"
                    onClick={() => table.getColumn("prioridad")?.setFilterValue(prioridad)}
                    className={cn(
                      "h-8 text-xs",
                      table.getColumn("prioridad")?.getFilterValue() === prioridad
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "border-gray-300"
                    )}
                  >
                    <Badge 
                      className={cn(
                        "mr-1 text-xs",
                        prioridadColors[prioridad] || "bg-gray-100 text-gray-800"
                      )}
                    >
                      {prioridad}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
