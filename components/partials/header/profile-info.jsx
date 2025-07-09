"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Settings, 
  Bell, 
  BarChart3, 
  Users, 
  Building, 
  Phone, 
  Mail, 
  MessageSquare, 
  LogOut, 
  Shield, 
  Calendar,
  Target,
  TrendingUp,
  HelpCircle,
  FileText
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProfileInfo = () => {
  const { data: session } = useSession();
  
  // Datos simulados del usuario del CRM
  const userData = {
    name: session?.user?.name ?? "María González",
    email: session?.user?.email ?? "maria.gonzalez@somosluxgroup.com",
    role: "Agente Inmobiliario Senior",
    avatar: session?.user?.image ?? "/api/placeholder/40/40",
    department: "Ventas Residenciales",
    stats: {
      leads: 45,
      conversions: 12,
      sales: 8
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="profile-trigger">
          <div className="profile-avatar">
            <div className="w-10 h-10 rounded-full avatar-gradient flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="profile-status-indicator"></div>
          </div>
          <div className="hidden md:block text-left profile-trigger-text">
            <div className="text-sm font-medium text-foreground">{userData.name}</div>
            <div className="text-xs text-muted-foreground">{userData.role}</div>
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="profile-dropdown profile-dropdown-content profile-dropdown-enter" align="end">
        {/* Header del perfil */}
        <DropdownMenuLabel className="p-4 profile-separator">
          <div className="flex items-center gap-3">
            <div className="profile-avatar">
              <div className="w-12 h-12 rounded-full avatar-gradient flex items-center justify-center text-primary-foreground font-semibold text-lg">
                {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className="profile-status-indicator"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">{userData.name}</div>
              <div className="text-xs text-muted-foreground">{userData.role}</div>
              <div className="text-xs text-muted-foreground">{userData.department}</div>
            </div>
          </div>
        </DropdownMenuLabel>

        {/* Estadísticas rápidas */}
        <div className="profile-stats-grid">
          <div className="profile-stats-item">
            <div className="profile-stats-number">{userData.stats.leads}</div>
            <div className="profile-stats-label">Leads Activos</div>
          </div>
          <div className="profile-stats-item">
            <div className="profile-stats-number stats-highlight">{userData.stats.conversions}</div>
            <div className="profile-stats-label">Conversiones</div>
          </div>
          <div className="profile-stats-item">
            <div className="profile-stats-number stats-primary">{userData.stats.sales}</div>
            <div className="profile-stats-label">Ventas</div>
          </div>
        </div>

        {/* Menú principal */}
        <DropdownMenuGroup className="p-2">
          <Link href="/es/user-profile">
            <DropdownMenuItem className="profile-menu-item">
              <User className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Mi Perfil</div>
                <div className="profile-menu-item-description">Gestionar información personal</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/leads">
            <DropdownMenuItem className="profile-menu-item">
              <Target className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Mis Leads</div>
                <div className="profile-menu-item-description">Ver y gestionar leads asignados</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/leads/kanban">
            <DropdownMenuItem className="profile-menu-item">
              <BarChart3 className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Kanban de Leads</div>
                <div className="profile-menu-item-description">Gestión visual de leads</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/proyectos">
            <DropdownMenuItem className="profile-menu-item">
              <Building className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Proyectos</div>
                <div className="profile-menu-item-description">Ver proyectos inmobiliarios</div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="profile-separator" />

        {/* Herramientas y configuración */}
        <DropdownMenuGroup className="p-2">
          <Link href="/es/calendario">
            <DropdownMenuItem className="profile-menu-item">
              <Calendar className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Calendario</div>
                <div className="profile-menu-item-description">Agendar citas y seguimientos</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/reportes">
            <DropdownMenuItem className="profile-menu-item">
              <TrendingUp className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Reportes</div>
                <div className="profile-menu-item-description">Análisis y métricas</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/configuracion">
            <DropdownMenuItem className="profile-menu-item">
              <Settings className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Configuración</div>
                <div className="profile-menu-item-description">Preferencias del sistema</div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="profile-separator" />

        {/* Comunicación y soporte */}
        <DropdownMenuGroup className="p-2">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="profile-menu-item">
              <MessageSquare className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Comunicación</div>
                <div className="profile-menu-item-description">Canales de contacto</div>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="profile-submenu">
                <DropdownMenuItem className="profile-submenu-item">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="profile-submenu-item">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="profile-submenu-item">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">SMS</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <Link href="/es/ayuda">
            <DropdownMenuItem className="profile-menu-item">
              <HelpCircle className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Ayuda y Soporte</div>
                <div className="profile-menu-item-description">Documentación y asistencia</div>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/es/documentos">
            <DropdownMenuItem className="profile-menu-item">
              <FileText className="profile-menu-item-icon" />
              <div className="profile-menu-item-content">
                <div className="profile-menu-item-title">Documentos</div>
                <div className="profile-menu-item-description">Plantillas y recursos</div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="profile-separator" />

        {/* Cerrar sesión */}
        <div className="p-2">
          <DropdownMenuItem
            onSelect={() => signOut()}
            className="profile-logout-item"
          >
            <LogOut className="w-4 h-4" />
            <div>
              <div className="text-sm font-medium">Cerrar Sesión</div>
              <div className="text-xs text-muted-foreground">Salir del sistema</div>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfo;
