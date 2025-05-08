
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Book, BookOpen, Notebook, FileText, User, Users as UserGroup, Table, Award } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Diretores', path: '/diretores', icon: <Users className="w-5 h-5" /> },
    { name: 'Alunos', path: '/alunos', icon: <User className="w-5 h-5" /> },
    { name: 'Professores', path: '/professores', icon: <Users className="w-5 h-5" /> },
    { name: 'Turmas', path: '/turmas', icon: <Table className="w-5 h-5" /> },
    { name: 'Disciplinas', path: '/disciplinas', icon: <Book className="w-5 h-5" /> },
    { name: 'Notas', path: '/notas', icon: <FileText className="w-5 h-5" /> },
    { name: 'Responsáveis', path: '/responsaveis', icon: <UserGroup className="w-5 h-5" /> },
    { name: 'Fardamentos', path: '/fardamentos', icon: <Award className="w-5 h-5" /> },
    { name: 'Clubes', path: '/clubes', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Leciona', path: '/leciona', icon: <Notebook className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white header-shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-bold text-vermelho text-2xl">GE</h1>
              <span className="text-xs font-medium text-gray-500">Portal de Gestão</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-vermelho text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 px-4 animate-enter max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-3 rounded-md text-sm font-medium my-1 ${
                location.pathname === item.path
                  ? 'bg-vermelho text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;