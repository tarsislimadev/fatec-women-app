const Form = ({ title, subtitle, children, className = '', onSubmit }) => {
  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      {title && <h2 className="form-title">{title}</h2>}
      {subtitle && <p className="form-subtitle">{subtitle}</p>}
      <div className="form-fields">
        {children}
      </div>
    </form>
  );
};

const FormField = ({ label, error, children, className = '' }) => {
  return (
    <div className={`form-field ${className}`}>
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

const FormInput = ({ className = '', ...props }) => {
  return (
    <input className={`form-input ${className}`} {...props} />
  );
};

Form.Field = FormField;
Form.Input = FormInput;

export default Form;