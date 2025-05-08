
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getAlunos, createAluno, updateAluno, deleteAluno } from '../services/alunoService.js';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAluno, setCurrentAluno] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    dataNascimento: '',
    turmaId: '',
    responsavelId: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'nome', header: 'Nome' },
    { key: 'matricula', header: 'Matrícula' },
    { key: 'dataNascimento', header: 'Data de Nascimento' },
    { key: 'turmaId', header: 'Turma ID' },
    { key: 'responsavelId', header: 'Responsável ID' }
  ];

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await getAlunos();
      setAlunos(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      toast.error('Erro ao carregar alunos');
      setLoading(false);
    }
  };

  const handleCreateAluno = async () => {
    try {
      await createAluno(formData);
      fetchAlunos();
      setModalOpen(false);
      resetForm();
      toast.success('Aluno criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      toast.error('Erro ao criar aluno');
    }
  };

  const handleUpdateAluno = async () => {
    try {
      await updateAluno(currentAluno.id, formData);
      fetchAlunos();
      setModalOpen(false);
      resetForm();
      toast.success('Aluno atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      toast.error('Erro ao atualizar aluno');
    }
  };

  const handleDeleteAluno = async (aluno) => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      try {
        await deleteAluno(aluno.id);
        fetchAlunos();
        toast.success('Aluno excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        toast.error('Erro ao excluir aluno');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentAluno(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (aluno) => {
    setCurrentAluno(aluno);
    setFormData({
      nome: aluno.nome || '',
      matricula: aluno.matricula || '',
      dataNascimento: aluno.dataNascimento || '',
      turmaId: aluno.turmaId || '',
      responsavelId: aluno.responsavelId || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      matricula: '',
      dataNascimento: '',
      turmaId: '',
      responsavelId: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAluno) {
      handleUpdateAluno();
    } else {
      handleCreateAluno();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Alunos</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Novo Aluno
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={alunos} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteAluno}
          title="Alunos"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentAluno ? 'Editar Aluno' : 'Novo Aluno'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Matrícula"
            name="matricula"
            value={formData.matricula}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="ID da Turma"
            name="turmaId"
            type="number"
            value={formData.turmaId}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="ID do Responsável"
            name="responsavelId"
            type="number"
            value={formData.responsavelId}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {currentAluno ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Alunos;