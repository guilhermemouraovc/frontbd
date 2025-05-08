
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getTurmas, createTurma, updateTurma, deleteTurma } from '../services/turmaService';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Turmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTurma, setCurrentTurma] = useState(null);
  const [formData, setFormData] = useState({
    idTurma: '',
    anoEscolar: ''
  });
  

  const columns = [
    { key: 'id_turma', header: 'ID', width: '70px' },
    { key: 'anoLetivo', header: 'Ano Letivo' },
  ];

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      setLoading(true);
      const data = await getTurmas();
      setTurmas(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      toast.error('Erro ao carregar turmas');
      setLoading(false);
    }
  };

  const handleCreateTurma = async () => {
    try {
      await createTurma(formData);
      fetchTurmas();
      setModalOpen(false);
      resetForm();
      toast.success('Turma criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      toast.error('Erro ao criar turma');
    }
  };

  const handleUpdateTurma = async () => {
    try {
      await updateTurma(currentTurma.id, formData);
      fetchTurmas();
      setModalOpen(false);
      resetForm();
      toast.success('Turma atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
      toast.error('Erro ao atualizar turma');
    }
  };

  const handleDeleteTurma = async (turma) => {
    if (window.confirm(`Tem certeza que deseja excluir a turma ${turma.nome}?`)) {
      try {
        await deleteTurma(turma.id);
        fetchTurmas();
        toast.success('Turma excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir turma:', error);
        toast.error('Erro ao excluir turma');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentTurma(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (turma) => {
    setCurrentTurma(turma);
    setFormData({
      nome: turma.nome || '',
      serie: turma.serie || '',
      turno: turma.turno || '',
      anoLetivo: turma.anoLetivo || '',
      capacidadeMaxima: turma.capacidadeMaxima || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      serie: '',
      turno: '',
      anoLetivo: '',
      capacidadeMaxima: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTurma) {
      handleUpdateTurma();
    } else {
      handleCreateTurma();
    }
  };

  const turnoOptions = [
    { value: 'MANHA', label: 'Manhã' },
    { value: 'TARDE', label: 'Tarde' },
    { value: 'NOITE', label: 'Noite' },
    { value: 'INTEGRAL', label: 'Integral' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Turmas</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Nova Turma
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={turmas} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteTurma}
          title="Turmas"
        />
      )}

<ModalForm
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Nova Turma"
>
  <form onSubmit={handleSubmit}>
    <FormField
      label="ID da Turma"
      name="idTurma"
      type="number"
      value={formData.idTurma}
      onChange={handleInputChange}
      required
    />
    <FormField
      label="Ano Escolar"
      name="anoEscolar"
      value={formData.anoEscolar}
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
        Criar
      </Button>
    </div>
  </form>
</ModalForm>

    </div>
  );
};

export default Turmas;