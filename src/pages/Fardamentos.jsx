
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getFardamentos, createFardamento, updateFardamento, deleteFardamento } from '../services/fardamentoService';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Fardamentos = () => {
  const [fardamentos, setFardamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFardamento, setCurrentFardamento] = useState(null);
  const [formData, setFormData] = useState({
    tipo: '',
    tamanho: '',
    quantidade: '',
    preco: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'tamanho', header: 'Tamanho' },
    { key: 'quantidade', header: 'Quantidade' },
    { key: 'preco', header: 'Preço' }
  ];

  useEffect(() => {
    fetchFardamentos();
  }, []);

  const fetchFardamentos = async () => {
    try {
      setLoading(true);
      const data = await getFardamentos();
      setFardamentos(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar fardamentos:', error);
      toast.error('Erro ao carregar fardamentos');
      setLoading(false);
    }
  };

  const handleCreateFardamento = async () => {
    try {
      await createFardamento(formData);
      fetchFardamentos();
      setModalOpen(false);
      resetForm();
      toast.success('Fardamento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar fardamento:', error);
      toast.error('Erro ao criar fardamento');
    }
  };

  const handleUpdateFardamento = async () => {
    try {
      await updateFardamento(currentFardamento.id, formData);
      fetchFardamentos();
      setModalOpen(false);
      resetForm();
      toast.success('Fardamento atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar fardamento:', error);
      toast.error('Erro ao atualizar fardamento');
    }
  };

  const handleDeleteFardamento = async (fardamento) => {
    if (window.confirm(`Tem certeza que deseja excluir o fardamento ${fardamento.tipo} tamanho ${fardamento.tamanho}?`)) {
      try {
        await deleteFardamento(fardamento.id);
        fetchFardamentos();
        toast.success('Fardamento excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir fardamento:', error);
        toast.error('Erro ao excluir fardamento');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentFardamento(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (fardamento) => {
    setCurrentFardamento(fardamento);
    setFormData({
      tipo: fardamento.tipo || '',
      tamanho: fardamento.tamanho || '',
      quantidade: fardamento.quantidade || '',
      preco: fardamento.preco || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      tipo: '',
      tamanho: '',
      quantidade: '',
      preco: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFardamento) {
      handleUpdateFardamento();
    } else {
      handleCreateFardamento();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Fardamentos</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Novo Fardamento
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={fardamentos} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteFardamento}
          title="Fardamentos"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentFardamento ? 'Editar Fardamento' : 'Novo Fardamento'}
      >
        <form onSubmit={handleSubmit}>
          <FormField
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Tamanho"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Quantidade"
            name="quantidade"
            type="number"
            value={formData.quantidade}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Preço"
            name="preco"
            type="number"
            value={formData.preco}
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
              {currentFardamento ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Fardamentos;