
import React from 'react';

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
  onClick,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-vermelho text-white hover:bg-vermelho/90 focus:ring-vermelho/20',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-vermelho/20',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-vermelho/20',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={allClasses}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
