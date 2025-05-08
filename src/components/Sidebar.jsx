import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; // ícone de hamburguer

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Diretores", path: "/diretores" },
    { name: "Turmas", path: "/turmas" },
    { name: "Alunos", path: "/alunos" },
  ];

  return (
    <>
      {/* Botão Hamburguer */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-white bg-red-600 p-2 rounded-md"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-red-600 text-white p-4 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 z-40`}
      >
        <h1 className="text-2xl font-bold mb-10 text-center">Painel Militar</h1>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded hover:bg-red-700 ${
                location.pathname === item.path ? "bg-red-700" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
