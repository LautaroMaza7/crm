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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  // Colores para estados con soporte dark/light
  const estadoColors = {
    nuevo: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
    "en seguimiento": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50",
    contactado: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
  };

  // Colores para prioridades con soporte dark/light
  const prioridadColors = {
    alta: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50",
    media: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50",
    baja: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
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
    setIsCalendarOpen(false);
    table.resetColumnFilters();
    table.setGlobalFilter("");
  };

  // Handler para filtro de fecha
  const handleDateFilter = (range) => {
    if (range?.from) {
      setDateRange(range);
      // Aquí podrías implementar el filtro de fecha en la tabla
      // Por ejemplo, filtrar por fecha de creación
      console.log("Filtro de fecha aplicado:", range);
    }
  };

  // Handler para cerrar el calendario
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  // Función para formatear el texto del botón de fecha
  const getDateButtonText = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy", { locale: es })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: es })}`;
    } else if (dateRange.from) {
      return format(dateRange.from, "dd/MM/yyyy", { locale: es });
    }
    return "Seleccionar fechas";
  };

  // Función para limpiar el filtro de fecha
  const clearDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
    setIsCalendarOpen(false);
  };

  // Función para aplicar el filtro de fecha
  const applyDateFilter = () => {
    setIsCalendarOpen(false);
    // Aquí podrías implementar la lógica de filtrado real
    if (dateRange.from) {
      console.log("Aplicando filtro de fecha:", dateRange);
    }
  };

  return (
    <div className="space-y-4">
      {/* Búsqueda global y acciones principales */}
      <Card className="border border-border bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Búsqueda global */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en todos los campos..."
                value={globalFilter}
                onChange={(event) => handleGlobalFilter(event.target.value)}
                className="pl-10 h-10 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                disabled={!isFilteredState}
                className="h-10 px-4 border-border hover:bg-accent text-foreground"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
              <Button
                variant="default"
                onClick={handleAddLead}
                className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
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
      <Card className="border border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros Avanzados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primera fila de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre</label>
              <Input
                placeholder="Filtrar por nombre..."
                value={table.getColumn("nombre")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("nombre")?.setFilterValue(event.target.value)
                }
                className="h-9 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* Filtro por email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                placeholder="Filtrar por email..."
                value={table.getColumn("email")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="h-9 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {/* Filtro por proyecto */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Proyecto</label>
              <Select
                value={table.getColumn("proyecto")?.getFilterValue() ?? ""}
                onValueChange={(value) =>
                  table.getColumn("proyecto")?.setFilterValue(value)
                }
              >
                <SelectTrigger className="h-9 border-border bg-background text-foreground focus:border-primary">
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
              <label className="text-sm font-medium text-foreground">Fecha</label>
              <div className="flex gap-2">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 flex-1 justify-start text-left font-normal border-border bg-background text-foreground relative",
                        !dateRange.from && "text-muted-foreground",
                        dateRange.from && "filter-button-active"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {getDateButtonText()}
                      {dateRange.from && (
                        <div className="filter-indicator"></div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 calendar-popover" align="start">
                    <div className="calendar-filter">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={handleDateFilter}
                        numberOfMonths={2}
                        locale={es}
                        onDayClick={() => {
                          // Cerrar el calendario después de seleccionar un rango completo
                          if (dateRange.from && dateRange.to) {
                            setTimeout(() => setIsCalendarOpen(false), 100);
                          }
                        }}
                      />
                    </div>
                    {/* Botones de acción para el calendario */}
                    <div className="calendar-actions">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearDateFilter}
                        className="text-xs"
                      >
                        Limpiar
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={applyDateFilter}
                        className="text-xs"
                      >
                        Aplicar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                {dateRange.from && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDateFilter}
                    className="clear-filter-button"
                    title="Limpiar filtro de fecha"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Segunda fila de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtro por estado */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Estado</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.getColumn("estado")?.setFilterValue("")}
                  className={cn(
                    "h-8 text-xs border-border",
                    !table.getColumn("estado")?.getFilterValue() 
                      ? "bg-primary/10 border-primary/30 text-primary" 
                      : "hover:bg-accent"
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
                      "h-8 text-xs border-border",
                      table.getColumn("estado")?.getFilterValue() === estado
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    <Badge 
                      className={cn(
                        "mr-1 text-xs",
                        estadoColors[estado] || "bg-muted text-muted-foreground"
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
              <label className="text-sm font-medium text-foreground">Prioridad</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.getColumn("prioridad")?.setFilterValue("")}
                  className={cn(
                    "h-8 text-xs border-border",
                    !table.getColumn("prioridad")?.getFilterValue() 
                      ? "bg-primary/10 border-primary/30 text-primary" 
                      : "hover:bg-accent"
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
                      "h-8 text-xs border-border",
                      table.getColumn("prioridad")?.getFilterValue() === prioridad
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "hover:bg-accent"
                    )}
                  >
                    <Badge 
                      className={cn(
                        "mr-1 text-xs",
                        prioridadColors[prioridad] || "bg-muted text-muted-foreground"
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
