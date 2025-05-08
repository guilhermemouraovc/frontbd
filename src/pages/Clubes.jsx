
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getClubes, createClube, updateClube, deleteClube } from '../services/clubeService';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Clubes = () => {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentClube, setCurrentClube] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    professorResponsavelId: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'nome', header: 'Nome' },
    { key: 'descricao', header: 'Descrição' },
    { key: 'professorResponsavelId', header: 'Professor Responsável ID' }
  ];

  useEffect(() => {
    fetchClubes();
  }, []);

  const fetchClubes = async () => {
    try {
      setLoading(true);
      const data = await getClubes();
      setClubes(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar clubes:', error);
      toast.error('Erro ao carregar clubes');
      setLoading(false);
    }
  };

  const handleCreateClube = async () => {
    try {
      await createClube(formData);
      fetchClubes();
      setModalOpen(false);
      resetForm();
      toast.success('Clube criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar clube:', error);
      toast.error('Erro ao criar clube');
    }
  };

  const handleUpdateClube = async () => {
    try {
      await updateClube(currentClube.id, formData);
      fetchClubes();
      setModalOpen(false);
      resetForm();
      toast.success('Clube atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar clube:', error);
      toast.error('Erro ao atualizar clube');
    }
  };

  const handleDeleteClube = async (clube) => {
    if (window.confirm(`Tem certeza que deseja excluir o clube ${clube.nome}?`)) {
      try {
        await deleteClube(clube.id);
        fetchClubes();
        toast.success('Clube excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir clube:', error);
        toast.error('Erro ao excluir clube');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentClube(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (clube) => {
    setCurrentClube(clube);
    setFormData({
      nome: clube.nome || '',
      descricao: clube.descricao || '',
      professorResponsavelId: clube.professorResponsavelId || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      professorResponsavelId: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentClube) {
      handleUpdateClube();
    } else {
      handleCreateClube();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Clubes</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Novo Clube
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={clubes} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteClube}
          title="Clubes"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentClube ? 'Editar Clube' : 'Novo Clube'}
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
            label="Descrição"
            name="descricao"
            type="textarea"
            value={formData.descricao}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="ID do Professor Responsável"
            name="professorResponsavelId"
            type="number"
            value={formData.professorResponsavelId}
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
              {currentClube ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Clubes;