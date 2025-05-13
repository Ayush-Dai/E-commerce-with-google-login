import { useState } from "react";
import {
  BarChart3,
  Home,
  Users,
  ShoppingCart,
  Package,
  Settings,
  HelpCircle,
  X
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarItem({ icon: Icon, text, active, onClick }) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={onClick}
    >
      <Icon className="mr-2 h-5 w-5" />
      {text}
    </Button>
  );
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 get current route

  return (
    <div
      className={`absolute left-0 z-50 w-64 h-[90vh] bg-white dark:bg-gray-800 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-lg font-semibold">AdminPanel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <nav className="p-4 space-y-1 cursor-pointer">
        <SidebarItem
          icon={Home}
          text="Dashboard"
          active={location.pathname === "/admin"}
          onClick={() => navigate("/admin")}
        />
        <SidebarItem
          icon={Users}
          text="Users"
          active={location.pathname === "/admin/manageUsers"}
          onClick={() => navigate("/admin/manageUsers")}
        />
        <SidebarItem
          icon={ShoppingCart}
          text="Orders"
          active={location.pathname === "/admin/manageProducts"}
          onClick={() => navigate("/admin/manageProducts")}
        />
        <SidebarItem
          icon={Package}
          text="Products"
          active={location.pathname === "/admin/manageOrders"}
          onClick={() => navigate("/admin/manageOrders")}
        />
        <SidebarItem icon={Settings} text="Settings" active={false} />
        <SidebarItem icon={HelpCircle} text="Help" active={false} />
      </nav>
    </div>
  );
}
