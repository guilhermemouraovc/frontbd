
import React from 'react';

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '', 
  required = false, 
  error = '',
  options = [],
  disabled = false,
}) => {
  const renderField = () => {
    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-vermelho focus:border-vermelho`}
          required={required}
          disabled={disabled}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-vermelho focus:border-vermelho`}
          required={required}
          disabled={disabled}
          rows={3}
        />
      );
    }
    
    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value || (type === 'number' ? '' : '')}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-vermelho focus:border-vermelho`}
        required={required}
        disabled={disabled}
        step={type === 'number' ? 'any' : undefined}
      />
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;