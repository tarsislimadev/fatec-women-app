const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    link: 'btn btn-link',
    danger: 'btn btn-danger',
  };
  
  const sizes = {
    sm: '',
    md: '',
    lg: '',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;