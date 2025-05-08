
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { getResponsaveis, createResponsavel, updateResponsavel, deleteResponsavel } from '../services/responsavelService';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import FormField from '../components/FormField';
import Button from '../components/Button';

const Responsaveis = () => {
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentResponsavel, setCurrentResponsavel] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cpf: ''
  });

  const columns = [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
    { key: 'telefone', header: 'Telefone' },
    { key: 'endereco', header: 'Endereço' },
    { key: 'cpf', header: 'CPF' }
  ];

  useEffect(() => {
    fetchResponsaveis();
  }, []);

  const fetchResponsaveis = async () => {
    try {
      setLoading(true);
      const data = await getResponsaveis();
      setResponsaveis(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar responsáveis:', error);
      toast.error('Erro ao carregar responsáveis');
      setLoading(false);
    }
  };

  const handleCreateResponsavel = async () => {
    try {
      await createResponsavel(formData);
      fetchResponsaveis();
      setModalOpen(false);
      resetForm();
      toast.success('Responsável criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar responsável:', error);
      toast.error('Erro ao criar responsável');
    }
  };

  const handleUpdateResponsavel = async () => {
    try {
      await updateResponsavel(currentResponsavel.id, formData);
      fetchResponsaveis();
      setModalOpen(false);
      resetForm();
      toast.success('Responsável atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar responsável:', error);
      toast.error('Erro ao atualizar responsável');
    }
  };

  const handleDeleteResponsavel = async (responsavel) => {
    if (window.confirm(`Tem certeza que deseja excluir o responsável ${responsavel.nome}?`)) {
      try {
        await deleteResponsavel(responsavel.id);
        fetchResponsaveis();
        toast.success('Responsável excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir responsável:', error);
        toast.error('Erro ao excluir responsável');
      }
    }
  };

  const openCreateModal = () => {
    setCurrentResponsavel(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (responsavel) => {
    setCurrentResponsavel(responsavel);
    setFormData({
      nome: responsavel.nome || '',
      email: responsavel.email || '',
      telefone: responsavel.telefone || '',
      endereco: responsavel.endereco || '',
      cpf: responsavel.cpf || ''
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      cpf: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentResponsavel) {
      handleUpdateResponsavel();
    } else {
      handleCreateResponsavel();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gestão de Responsáveis</h1>
        <Button 
          onClick={openCreateModal} 
          icon={<PlusCircle />}
          className="w-full md:w-auto"
        >
          Novo Responsável
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <DataTable 
          data={responsaveis} 
          columns={columns} 
          onEdit={openEditModal} 
          onDelete={handleDeleteResponsavel}
          title="Responsáveis"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentResponsavel ? 'Editar Responsável' : 'Novo Responsável'}
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="CPF"
            name="cpf"
            value={formData.cpf}
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
              {currentResponsavel ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Responsaveis;