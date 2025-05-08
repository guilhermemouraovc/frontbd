const Header = () => {
    return (
      <header className="ml-64 h-16 bg-white shadow flex items-center px-6 justify-between fixed w-[calc(100%-16rem)]">
        <h2 className="text-xl font-semibold">Bem-vindo ao Painel Militar</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </header>
    );
  };
  
  export default Header;
  