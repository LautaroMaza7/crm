"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] font-mono text-sm text-muted-foreground">
        {row.getValue("id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">{row.getValue("nombre")}</span>
        <span className="text-xs text-muted-foreground">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contacto" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.getValue("telefono")}</span>
        <span className="text-xs text-muted-foreground">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "mensaje",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensaje" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <p className="text-sm text-foreground line-clamp-2">
          {row.getValue("mensaje")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const estado = row.getValue("estado");
      const estadoColors = {
        nuevo: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
        "en seguimiento": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50",
        contactado: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
      };
      
      return (
        <Badge 
          className={cn(
            "font-medium",
            estadoColors[estado] || "bg-muted text-muted-foreground"
          )}
        >
          {estado}
        </Badge>
      );
    },
  },
  {
    accessorKey: "prioridad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridad" />
    ),
    cell: ({ row }) => {
      const prioridad = row.getValue("prioridad");
      const prioridadColors = {
        alta: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50",
        media: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50",
        baja: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
      };
      
      return (
        <Badge 
          className={cn(
            "font-medium",
            prioridadColors[prioridad] || "bg-muted text-muted-foreground"
          )}
        >
          {prioridad}
        </Badge>
      );
    },
  },
  {
    accessorKey: "proyecto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proyecto" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.getValue("proyecto")}</span>
        <span className="text-xs text-muted-foreground">{row.getValue("origen")}</span>
      </div>
    ),
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const fecha = row.getValue("fecha");
      try {
        const date = new Date(fecha);
        return (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {format(date, "dd/MM/yyyy", { locale: es })}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(date, "EEEE", { locale: es })}
            </span>
          </div>
        );
      } catch {
        return <span className="text-muted-foreground">{fecha}</span>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
