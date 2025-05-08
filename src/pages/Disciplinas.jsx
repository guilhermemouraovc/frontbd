
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getDisciplinas, createDisciplina, updateDisciplina, deleteDisciplina } from '../services/disciplinaservice';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDisciplina, setCurrentDisciplina] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: '',
    descricao: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'nome', header: 'Nome' },
    { key: 'cargaHoraria', header: 'Carga Horária' },
    { key: 'descricao', header: 'Descrição' }
  ];

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    try {
      setLoading(true);
      const data = await getDisciplinas();
      setDisciplinas(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      toast.error('Erro ao carregar disciplinas');
      setLoading(false);
    }
  };

  const handleCreateDisciplina = async () => {
    try {
      await createDisciplina(formData);
      fetchDisciplinas();
      setModalOpen(false);
      resetForm();
      toast.success('Disciplina criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
      toast.error('Erro ao criar disciplina');
    }
  };

  const handleUpdateDisciplina = async () => {
    try {
      await updateDisciplina(currentDisciplina.id, formData);
      fetchDisciplinas();
      setModalOpen(false);
      resetForm();
      toast.success('Disciplina atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      toast.error('Erro ao atualizar disciplina');
    }
  };

  const handleDeleteDisciplina = async (disciplina) => {
    if (window.confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome}?`)) {
      try {
        await deleteDisciplina(disciplina.id);
        fetchDisciplinas();
        toast.success('Disciplina excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir disciplina:', error);
        toast.error('Erro ao excluir disciplina');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentDisciplina(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (disciplina) => {
    setCurrentDisciplina(disciplina);
    setFormData({
      nome: disciplina.nome || '',
      cargaHoraria: disciplina.cargaHoraria || '',
      descricao: disciplina.descricao || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cargaHoraria: '',
      descricao: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentDisciplina) {
      handleUpdateDisciplina();
    } else {
      handleCreateDisciplina();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Disciplinas</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Nova Disciplina
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={disciplinas} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteDisciplina}
          title="Disciplinas"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentDisciplina ? 'Editar Disciplina' : 'Nova Disciplina'}
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
            label="Carga Horária"
            name="cargaHoraria"
            type="number"
            value={formData.cargaHoraria}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Descrição"
            name="descricao"
            type="textarea"
            value={formData.descricao}
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
              {currentDisciplina ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Disciplinas;