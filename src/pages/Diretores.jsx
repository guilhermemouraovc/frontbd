import { useState, useEffect } from 'react';
import { getDiretores, createDiretor, updateDiretor, deleteDiretor } from '../services/diretoresService';
import { toast } from 'sonner';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { Plus } from 'lucide-react';

const Diretores = () => {
  const [diretores, setDiretores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDiretor, setCurrentDiretor] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cargoMilitar: '',
    telefone: ''
  });

  const columns = [
    { key: 'idDiretor', header: 'ID', width: '50px' },
    { key: 'nome', header: 'Nome', width: 'auto' },
    { key: 'cargoMilitar', header: 'Cargo Militar', width: 'auto' },
    { key: 'telefone', header: 'Telefone', width: '150px' }
  ];

  useEffect(() => {
    loadDiretores();
  }, []);

  const loadDiretores = async () => {
    setLoading(true);
    try {
      const data = await getDiretores();
      setDiretores(data);
    } catch (error) {
      console.error('Erro ao carregar diretores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (diretor = null) => {
    if (diretor) {
      setCurrentDiretor(diretor);
      setFormData({
        nome: diretor.nome || '',
        cargoMilitar: diretor.cargoMilitar || '',
        telefone: diretor.telefone || ''
      });
    } else {
      setCurrentDiretor(null);
      setFormData({
        nome: '',
        cargoMilitar: '',
        telefone: ''
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentDiretor(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentDiretor) {
        await updateDiretor(currentDiretor.idDiretor, formData);
        toast.success('Diretor atualizado com sucesso!');
      } else {
        await createDiretor(formData);
        toast.success('Diretor criado com sucesso!');
      }

      handleCloseModal();
      loadDiretores();
    } catch (error) {
      console.error('Erro ao salvar diretor:', error);
    }
  };

  const handleDelete = async (diretor) => {
    if (window.confirm(`Tem certeza que deseja excluir o diretor ${diretor.nome}?`)) {
      try {
        await deleteDiretor(diretor.idDiretor);
        toast.success('Diretor excluído com sucesso!');
        loadDiretores();
      } catch (error) {
        console.error('Erro ao excluir diretor:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-enter">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Gestão de Diretores</h1>
        <Button
          onClick={() => handleOpenModal()}
          icon={<Plus className="h-4 w-4" />}
        >
          Novo Diretor
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <DataTable
          data={diretores}
          columns={columns}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          title="Lista de Diretores"
        />
      )}

      <ModalForm
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={currentDiretor ? 'Editar Diretor' : 'Novo Diretor'}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermelho/20 focus:border-vermelho"
                required
              />
            </div>

            <div>
              <label htmlFor="cargoMilitar" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo Militar
              </label>
              <input
                type="text"
                id="cargoMilitar"
                name="cargoMilitar"
                value={formData.cargoMilitar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermelho/20 focus:border-vermelho"
                required
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vermelho/20 focus:border-vermelho"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {currentDiretor ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default Diretores;
