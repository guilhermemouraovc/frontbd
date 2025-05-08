import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getNotas, createNota, updateNota, deleteNota } from '../services/notaservice';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Notas = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNota, setCurrentNota] = useState(null);
  const [formData, setFormData] = useState({
    idNota: '',
    valor: ''
  });

  const columns = [
    { key: 'idNota', header: 'ID' },
    { key: 'valor', header: 'Valor' }
  ];

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      setLoading(true);
      const data = await getNotas();
      setNotas(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      toast.error('Erro ao carregar notas');
      setLoading(false);
    }
  };

  const handleCreateNota = async () => {
    try {
      await createNota(formData);
      fetchNotas();
      setModalOpen(false);
      resetForm();
      toast.success('Nota criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      toast.error('Erro ao criar nota');
    }
  };

  const handleUpdateNota = async () => {
    try {
      await updateNota(currentNota.idNota, formData);
      fetchNotas();
      setModalOpen(false);
      resetForm();
      toast.success('Nota atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      toast.error('Erro ao atualizar nota');
    }
  };

  const handleDeleteNota = async (nota) => {
    if (window.confirm(`Tem certeza que deseja excluir esta nota?`)) {
      try {
        await deleteNota(nota.idNota);
        fetchNotas();
        toast.success('Nota excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir nota:', error);
        toast.error('Erro ao excluir nota');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentNota(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (nota) => {
    setCurrentNota(nota);
    setFormData({
      idNota: nota.idNota || '',
      valor: nota.valor || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      idNota: '',
      valor: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNota) {
      handleUpdateNota();
    } else {
      handleCreateNota();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Notas</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Nova Nota
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={notas} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteNota}
          title="Notas"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentNota ? "Editar Nota" : "Nova Nota"}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="ID da Nota"
            name="idNota"
            type="number"
            value={formData.idNota}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Valor"
            name="valor"
            type="number"
            value={formData.valor}
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
              {currentNota ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Notas;
