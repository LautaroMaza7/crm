"use client";
import { X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Handler para crear un nuevo lead temporal
  const handleAddLead = () => {
    const id = `LEAD-TEMP-${Math.floor(Math.random() * 100000)}`;
    table.options.data.unshift({
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
    });
    table.setOptions({
      ...table.options,
      data: [...table.options.data],
    });
  };

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Filtrar por nombre..."
        value={table.getColumn("nombre")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("nombre")?.setFilterValue(event.target.value)
        }
        className="h-8 min-w-[180px] max-w-xs"
      />
      <Input
        placeholder="Filtrar por email..."
        value={table.getColumn("email")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="h-8 min-w-[180px] max-w-xs"
      />
      <Input
        placeholder="Filtrar por estado..."
        value={table.getColumn("estado")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("estado")?.setFilterValue(event.target.value)
        }
        className="h-8 min-w-[140px] max-w-xs"
      />
      <Input
        placeholder="Filtrar por prioridad..."
        value={table.getColumn("prioridad")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("prioridad")?.setFilterValue(event.target.value)
        }
        className="h-8 min-w-[140px] max-w-xs"
      />
      <Input
        placeholder="Filtrar por proyecto..."
        value={table.getColumn("proyecto")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("proyecto")?.setFilterValue(event.target.value)
        }
        className="h-8 min-w-[140px] max-w-xs"
      />
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Limpiar
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )}
      <Button
        variant="default"
        onClick={handleAddLead}
        className="h-8 px-2 lg:px-3"
      >
        <Plus className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
        Nuevo Lead
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
