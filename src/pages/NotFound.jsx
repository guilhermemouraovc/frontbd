
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-vermelho">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Página Não Encontrada</h2>
        <p className="text-gray-600 mt-2">
          A página que você está procurando não existe ou foi removida.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Voltar para o Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
