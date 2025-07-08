import { data as leads } from "../../(tables)/data-table/advanced/data/index";
import TaskBoard from "@/components/task-board";

const vendedores = [
  { id: "vendedor1", nombre: "Vendedor 1" },
  { id: "vendedor2", nombre: "Vendedor 2" },
  { id: "vendedor3", nombre: "Vendedor 3" },
];

const KanbanLeads = async () => {
  // Agrupar leads por vendedor asignado (simulado con lead.vendedor)
  const boards = vendedores.map((v) => ({ id: v.id, name: v.nombre }));
  const tasks = leads.map((lead) => ({
    ...lead,
    boardId: lead.vendedor || vendedores[0].id, // Asignar por defecto si no tiene
    title: lead.nombre,
    description: lead.mensaje,
  }));
  const subTasks = [];
  const comments = [];
  return (
    <>
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Kanban de Asignación de Leads a Vendedores
        </div>
      </div>
      <TaskBoard
        boards={boards}
        tasks={tasks}
        subTasks={subTasks}
        comments={comments}
      />
    </>
  );
};

export default KanbanLeads; 