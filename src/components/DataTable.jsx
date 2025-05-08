
import { useState } from 'react';
import { Search } from 'lucide-react';

const DataTable = ({ data, columns, onEdit, onDelete, searchable = true, title = "Dados" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter data based on search term
  const filteredData = searchable 
    ? data.filter((item) => 
        columns.some(
          (column) => 
            item[column.key] && 
            item[column.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  return (
    <div className="bg-white rounded-lg card-shadow overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {searchable && (
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vermelho/20 focus:border-vermelho"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className="py-3 px-4 text-sm font-semibold text-gray-600"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr 
                  key={item.id || index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td key={`${item.id}-${column.key}`} className="py-3 px-4 text-sm text-gray-700">
                      {item[column.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="py-6 px-4 text-center text-gray-500"
                >
                  {searchTerm ? "Nenhum resultado encontrado" : "Nenhum dado disponível"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
