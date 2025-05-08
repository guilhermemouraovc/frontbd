
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getLeciona, createLeciona, updateLeciona, deleteLeciona } from '../services/lecionaService';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Leciona = () => {
  const [lecionaData, setLecionaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLeciona, setCurrentLeciona] = useState(null);
  const [formData, setFormData] = useState({
    professorId: '',
    disciplinaId: '',
    turmaId: '',
    anoLetivo: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'professorId', header: 'Professor ID' },
    { key: 'disciplinaId', header: 'Disciplina ID' },
    { key: 'turmaId', header: 'Turma ID' },
    { key: 'anoLetivo', header: 'Ano Letivo' }
  ];

  useEffect(() => {
    fetchLeciona();
  }, []);

  const fetchLeciona = async () => {
    try {
      setLoading(true);
      const data = await getLeciona();
      setLecionaData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados de leciona:', error);
      toast.error('Erro ao carregar dados de alocação de professores');
      setLoading(false);
    }
  };

  const handleCreateLeciona = async () => {
    try {
      await createLeciona(formData);
      fetchLeciona();
      setModalOpen(false);
      resetForm();
      toast.success('Alocação criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar alocação:', error);
      toast.error('Erro ao criar alocação');
    }
  };

  const handleUpdateLeciona = async () => {
    try {
      await updateLeciona(currentLeciona.id, formData);
      fetchLeciona();
      setModalOpen(false);
      resetForm();
      toast.success('Alocação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar alocação:', error);
      toast.error('Erro ao atualizar alocação');
    }
  };

  const handleDeleteLeciona = async (leciona) => {
    if (window.confirm(`Tem certeza que deseja excluir esta alocação?`)) {
      try {
        await deleteLeciona(leciona.id);
        fetchLeciona();
        toast.success('Alocação excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir alocação:', error);
        toast.error('Erro ao excluir alocação');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentLeciona(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (leciona) => {
    setCurrentLeciona(leciona);
    setFormData({
      professorId: leciona.professorId || '',
      disciplinaId: leciona.disciplinaId || '',
      turmaId: leciona.turmaId || '',
      anoLetivo: leciona.anoLetivo || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      professorId: '',
      disciplinaId: '',
      turmaId: '',
      anoLetivo: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentLeciona) {
      handleUpdateLeciona();
    } else {
      handleCreateLeciona();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Alocação de Professores</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Nova Alocação
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={lecionaData} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteLeciona}
          title="Alocações de Professores"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentLeciona ? 'Editar Alocação' : 'Nova Alocação'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Professor ID"
            name="professorId"
            type="number"
            value={formData.professorId}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Disciplina ID"
            name="disciplinaId"
            type="number"
            value={formData.disciplinaId}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Turma ID"
            name="turmaId"
            type="number"
            value={formData.turmaId}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Ano Letivo"
            name="anoLetivo"
            value={formData.anoLetivo}
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
              {currentLeciona ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Leciona;