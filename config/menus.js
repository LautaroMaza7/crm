import {
  DashBoard,
  Users,
  Building,
  Graph,
  Settings,
} from "@/components/svg";

export const menusConfig = {
  mainNav: [
    {
      title: "Inicio",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Leads",
      icon: Users,
      href: "/leads",
    },
    {
      title: "Vendedores",
      icon: Building,
      href: "/vendedores",
    },
    {
      title: "Métricas",
      icon: Graph,
      href: "/metricas",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/configuracion",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Inicio",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Leads",
        icon: Users,
        href: "/leads",
      },
      {
        title: "Vendedores",
        icon: Building,
        href: "/vendedores",
      },
      {
        title: "Métricas",
        icon: Graph,
        href: "/metricas",
      },
      {
        title: "Configuración",
        icon: Settings,
        href: "/configuracion",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "Menú Principal",
      },
      {
        title: "Inicio",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Leads",
        icon: Users,
        href: "/leads",
      },
      {
        title: "Vendedores",
        icon: Building,
        href: "/vendedores",
      },
      {
        title: "Métricas",
        icon: Graph,
        href: "/metricas",
      },
      {
        title: "Configuración",
        icon: Settings,
        href: "/configuracion",
      },
    ],
  },
};
