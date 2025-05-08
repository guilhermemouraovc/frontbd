
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
    alunoId: '',
    disciplinaId: '',
    valor: '',
    bimestre: '',
    dataLancamento: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'alunoId', header: 'Aluno ID' },
    { key: 'disciplinaId', header: 'Disciplina ID' },
    { key: 'valor', header: 'Valor' },
    { key: 'bimestre', header: 'Bimestre' },
    { key: 'dataLancamento', header: 'Data de Lançamento' }
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
      await updateNota(currentNota.id, formData);
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
        await deleteNota(nota.id);
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
      alunoId: nota.alunoId || '',
      disciplinaId: nota.disciplinaId || '',
      valor: nota.valor || '',
      bimestre: nota.bimestre || '',
      dataLancamento: nota.dataLancamento ? nota.dataLancamento.split('T')[0] : ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      alunoId: '',
      disciplinaId: '',
      valor: '',
      bimestre: '',
      dataLancamento: ''
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
        title={currentNota ? 'Editar Nota' : 'Nova Nota'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Aluno ID"
            name="alunoId"
            type="number"
            value={formData.alunoId}
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
            label="Valor"
            name="valor"
            type="number"
            value={formData.valor}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Bimestre"
            name="bimestre"
            type="number"
            value={formData.bimestre}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Data de Lançamento"
            name="dataLancamento"
            type="date"
            value={formData.dataLancamento}
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
              {currentNota ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Notas;