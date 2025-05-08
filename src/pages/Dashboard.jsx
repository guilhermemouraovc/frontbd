
import { useState, useEffect } from 'react';
import { getDiretores } from '../services/diretoresService';
import { getProfessores } from '../services/professorService';
import { getAlunos } from '../services/alunoService.js';
import { getTurmas } from '../services/turmaService.js';
import { getDisciplinas } from '../services/disciplinaservice.js';
import Spinner from '../components/Spinner';
import { Users, User, BookOpen, Table, Book, FileText, Award } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({
    diretores: [],
    professores: [],
    alunos: [],
    turmas: [],
    disciplinas: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [diretoresData, professoresData, alunosData, turmasData, disciplinasData] = await Promise.all([
          getDiretores().catch(() => []),
          getProfessores().catch(() => []),
          getAlunos().catch(() => []),
          getTurmas().catch(() => []),
          getDisciplinas().catch(() => [])
        ]);
        
        setData({
          diretores: diretoresData,
          professores: professoresData,
          alunos: alunosData,
          turmas: turmasData,
          disciplinas: disciplinasData
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      {/* Welcome Title */}
      <div className="flex justify-center items-center h-64 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-vermelho text-center">
          Bem vindo ao Colégio Militar
        </h1>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Painel de Controle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card for Diretores */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-vermelho">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Diretores</h3>
              <p className="text-3xl font-bold mt-2">{data.diretores.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total cadastrados</p>
            </div>
            <div className="bg-vermelho/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-vermelho" />
            </div>
          </div>
        </div>
        
        {/* Card for Professores */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Professores</h3>
              <p className="text-3xl font-bold mt-2">{data.professores.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total cadastrados</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        {/* Card for Alunos */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Alunos</h3>
              <p className="text-3xl font-bold mt-2">{data.alunos.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total cadastrados</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-full">
              <User className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        {/* Card for Turmas */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Turmas</h3>
              <p className="text-3xl font-bold mt-2">{data.turmas.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total cadastradas</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-full">
              <Table className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
        
        {/* Card for Disciplinas */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Disciplinas</h3>
              <p className="text-3xl font-bold mt-2">{data.disciplinas.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total cadastradas</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-full">
              <Book className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
        
        {/* Card for Sistema */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Sistema</h3>
              <p className="text-3xl font-bold mt-2">9</p>
              <p className="text-sm text-gray-500 mt-1">Módulos ativos</p>
            </div>
            <div className="bg-teal-500/10 p-3 rounded-full">
              <Award className="h-6 w-6 text-teal-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sistema de Gestão Escolar</h2>
        <p className="text-gray-600">
          Bem-vindo ao painel de controle do sistema de gestão escolar. Use a navegação acima para acessar os diferentes módulos do sistema.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-medium text-blue-800">Dica</h3>
          <p className="text-blue-700 text-sm mt-1">
            Utilize este painel para gerenciar diretores, professores, alunos, turmas, disciplinas e outros recursos da instituição. Todos os dados são sincronizados automaticamente com o servidor backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;