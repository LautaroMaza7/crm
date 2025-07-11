"use client";
import React from "react";
import { Plus, Users, UserCheck, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

// Componente para leads arrastrables
const DraggableLead = ({ task, getPriorityColor, getStatusColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={task.avatar} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {task.name?.charAt(0) || 'L'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{task.email}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
            {task.status}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {task.source}
          </Badge>
          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Hace {task.createdAt ? '2h' : '1h'}</span>
          <span className="font-medium text-green-600">{task.phone}</span>
        </div>
      </div>
    </div>
  );
};

// Componente para vendedores con área de drop
const VendorCard = ({ board, tasks, getStatusColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
  } = useSortable({ 
    id: board.id, 
    data: { type: "Board", board },
    accepts: ["Task"]
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const assignedTasks = tasks.filter(task => task.boardId === board.id);

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`border border-border shadow-sm hover:shadow-md transition-shadow ${
        isOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      <CardHeader className="border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={board.avatar} />
              <AvatarFallback className="bg-purple-100 text-purple-600">
                {board.title?.charAt(0) || 'V'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {board.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {assignedTasks.length} leads asignados
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            {assignedTasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <SortableContext items={assignedTasks.map(task => task.id)}>
            {assignedTasks.map((task) => (
              <div
                key={task.id}
                className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      {task.name?.charAt(0) || 'L'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {task.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {task.email}
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </SortableContext>
          
          {assignedTasks.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              <UserCheck className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Arrastra leads aquí
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TaskBoard = ({ boards: initialBoards, tasks: initialTasks, subTasks, comments }) => {
  // Datos ficticios de vendedores
  const mockBoards = [
    {
      id: "vendor-1",
      title: "María González",
      avatar: "/avatars/maria.jpg",
      email: "maria.gonzalez@somoslux.com",
      phone: "+52 55 1234 5678",
      status: "Activo",
      leadsAssigned: 3
    },
    {
      id: "vendor-2", 
      title: "Carlos Rodríguez",
      avatar: "/avatars/carlos.jpg",
      email: "carlos.rodriguez@somoslux.com",
      phone: "+52 55 2345 6789",
      status: "Activo",
      leadsAssigned: 1
    },
    {
      id: "vendor-3",
      title: "Ana Martínez",
      avatar: "/avatars/ana.jpg", 
      email: "ana.martinez@somoslux.com",
      phone: "+52 55 3456 7890",
      status: "Activo",
      leadsAssigned: 2
    },
    {
      id: "vendor-4",
      title: "Luis Fernández",
      avatar: "/avatars/luis.jpg",
      email: "luis.fernandez@somoslux.com", 
      phone: "+52 55 4567 8901",
      status: "Activo",
      leadsAssigned: 0
    }
  ];

  // Datos ficticios de leads pendientes
  const mockTasks = [
    {
      id: "lead-1",
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "+52 55 1111 2222",
      avatar: "/avatars/roberto.jpg",
      status: "Nuevo",
      source: "Facebook",
      priority: "Alta",
      description: "Interesado en departamentos en Polanco, presupuesto $2.5M - $3.5M",
      createdAt: "2024-01-15T10:30:00Z",
      boardId: null
    },
    {
      id: "lead-2",
      name: "Patricia López",
      email: "patricia.lopez@email.com", 
      phone: "+52 55 2222 3333",
      avatar: "/avatars/patricia.jpg",
      status: "Caliente",
      source: "Instagram",
      priority: "Urgente",
      description: "Busca casa en Lomas de Chapultepec, 3-4 recámaras, jardín",
      createdAt: "2024-01-15T09:15:00Z",
      boardId: null
    },
    {
      id: "lead-3",
      name: "Fernando Herrera",
      email: "fernando.herrera@email.com",
      phone: "+52 55 3333 4444", 
      avatar: "/avatars/fernando.jpg",
      status: "Nuevo",
      source: "Website",
      priority: "Media",
      description: "Interesado en inversión inmobiliaria, busca departamentos para rentar",
      createdAt: "2024-01-15T08:45:00Z",
      boardId: null
    },
    {
      id: "lead-4",
      name: "Carmen Vega",
      email: "carmen.vega@email.com",
      phone: "+52 55 4444 5555",
      avatar: "/avatars/carmen.jpg", 
      status: "Caliente",
      source: "Referido",
      priority: "Alta",
      description: "Familia buscando casa en Coyoacán, 4 recámaras, presupuesto $4M",
      createdAt: "2024-01-15T07:30:00Z",
      boardId: null
    },
    {
      id: "lead-5",
      name: "Miguel Torres",
      email: "miguel.torres@email.com",
      phone: "+52 55 5555 6666",
      avatar: "/avatars/miguel.jpg",
      status: "Nuevo", 
      source: "Google Ads",
      priority: "Media",
      description: "Ejecutivo buscando departamento en Santa Fe, 2 recámaras, moderno",
      createdAt: "2024-01-15T06:20:00Z",
      boardId: null
    },
    {
      id: "lead-6",
      name: "Sofia Mendoza",
      email: "sofia.mendoza@email.com",
      phone: "+52 55 6666 7777",
      avatar: "/avatars/sofia.jpg",
      status: "Caliente",
      source: "Facebook",
      priority: "Urgente", 
      description: "Urgente: necesita casa en 2 semanas, Condesa, 3 recámaras",
      createdAt: "2024-01-15T05:10:00Z",
      boardId: null
    },
    {
      id: "lead-7",
      name: "Diego Ruiz",
      email: "diego.ruiz@email.com",
      phone: "+52 55 7777 8888",
      avatar: "/avatars/diego.jpg",
      status: "Nuevo",
      source: "Instagram",
      priority: "Media",
      description: "Interesado en propiedades de lujo en Las Lomas",
      createdAt: "2024-01-15T04:30:00Z",
      boardId: null
    },
    {
      id: "lead-8",
      name: "Valeria Castro",
      email: "valeria.castro@email.com",
      phone: "+52 55 8888 9999",
      avatar: "/avatars/valeria.jpg",
      status: "Caliente",
      source: "Website",
      priority: "Alta",
      description: "Busca departamento en Roma Norte, 2 recámaras, con terraza",
      createdAt: "2024-01-15T03:45:00Z",
      boardId: null
    }
  ];

  // Usa los vendedores de prueba
  const boards = mockBoards;
  const [tasks, setTasks] = useState(initialTasks?.length > 0 ? initialTasks : mockTasks);
  const [activeTask, setActiveTask] = useState(null);

  // Separar leads sin asignar y vendedores
  const unassignedLeads = tasks.filter(task => !task.boardId);
  const assignedLeads = tasks.filter(task => task.boardId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    if (active.data.current?.type === "Task" && over.data.current?.type === "Board") {
      const activeTaskId = active.id;
      const overBoardId = over.id;
      const task = tasks.find((t) => t.id === activeTaskId);
      
      if (!task) return;
      if (task.boardId === overBoardId) return;

      // Actualizar boardId del lead
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTaskId ? { ...t, boardId: overBoardId } : t
        )
      );
      
      const assignedVendor = boards.find(b => b.id === overBoardId);
      toast.success(`Lead asignado a ${assignedVendor?.title || 'vendedor'}`);
    }
    
    setActiveTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Alta':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Media':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Caliente':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Nuevo':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Botón para resetear leads de prueba */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setTasks(mockTasks)}>
          Resetear Leads de Prueba
        </Button>
      </div>
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Leads</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{tasks.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Sin Asignar</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{unassignedLeads.length}</p>
              </div>
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Asignados</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{assignedLeads.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Vendedores</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{boards.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {/* Leads sin asignar */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="border-b border-border bg-muted/50">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Leads Sin Asignar
              <Badge variant="secondary" className="ml-2">{unassignedLeads.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <SortableContext items={unassignedLeads.map(task => task.id)}>
                {unassignedLeads.map((task) => (
                  <DraggableLead 
                    key={task.id} 
                    task={task} 
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </SortableContext>
            </div>
            
            {unassignedLeads.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No hay leads sin asignar
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Todos los leads han sido asignados a vendedores
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vendedores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {boards.map((board) => (
            <VendorCard 
              key={board.id} 
              board={board} 
              tasks={tasks}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>

        <DragOverlay adjustScale={false}>
          {activeTask && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-lg opacity-90">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activeTask.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {activeTask.name?.charAt(0) || 'L'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{activeTask.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activeTask.email}</p>
                </div>
                <Badge variant="outline" className={`text-xs ${getStatusColor(activeTask.status)}`}>
                  {activeTask.status}
                </Badge>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
