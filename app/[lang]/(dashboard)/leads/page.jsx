"use client";
import DataTable from "../(tables)/data-table/advanced/index";
import Link from "next/link";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-default-900">Administración de Leads</h1>
        <Link href="/es/leads/kanban" className="btn btn-primary">
          Ver Kanban de Asignación
        </Link>
      </div>
      <DataTable />
    </div>
  );
} 