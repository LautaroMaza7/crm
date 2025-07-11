"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Cup, Eye, Increase, Session } from "@/components/svg";

const ReportsArea = () => {
  const reports = [
    {
      id: 1,
      name: "Consultas Recibidas",
      count: "6,132",
      rate: "150",
      isUp: true,
      icon: <Session className="h-4 w-4" />, // Puedes cambiar el icono si lo deseas
      color: "primary",
    },
    {
      id: 2,
      name: "Vistas de Propiedades",
      count: "11,236",
      rate: "202",
      isUp: false,
      icon: <Eye className="h-4 w-4" />, // Puedes cambiar el icono si lo deseas
      color: "info",
    },
    {
      id: 3,
      name: "Duración Promedio de Interés",
      count: "46s",
      rate: "22",
      isUp: true,
      icon: <Increase className="h-4 w-4" />, // Puedes cambiar el icono si lo deseas
      color: "warning",
    },
    {
      id: 4,
      name: "Tasa de Rebote",
      count: "46s",
      rate: "30",
      isUp: false,
      icon: <Cup className="h-4 w-4" />, // Puedes cambiar el icono si lo deseas
      color: "destructive",
    },
  ];
  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index}`} >
          <CardHeader className="flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0">
            <span className="text-sm font-medium text-default-900 flex-1">{item.name}</span>
            <span className={cn("flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full", {
              "bg-primary/10 text-primary": item.color === "primary",
              "bg-info/10 text-info": item.color === "info",
              "bg-warning/10 text-warning": item.color === "warning",
              "bg-destructive/10 text-destructive": item.color === "destructive",
            })}>{item.icon}</span>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <div className="text-2xl font-semibold text-default-900 mb-2.5">{item.count}</div>
            <div className="flex items-center font-semibold gap-1">
              {
                item.isUp ? <>
                  <span className="text-success">{item.rate}%</span>
                  <Icon icon="heroicons:arrow-trending-up-16-solid" className="text-success text-xl" />
                </>
                  :
                  <>
                    <span className="text-destructive">{item.rate}</span>
                    <Icon icon="heroicons:arrow-trending-down-16-solid" className="text-destructive text-xl" />
                  </>
              }
            </div>
            <div className="mt-1 text-xs text-default-600">vs Últimos 30 Días</div>
          </CardContent>
        </Card>
      ))}
    </>

  );
};

export default ReportsArea;