const Card = ({ title, children, footer, className = '', headerActions }) => {
  return (
    <div className={`card ${className}`}>
      {(title || headerActions) && (
        <div className="card-header">
          {title && <h2 className="card-title">{title}</h2>}
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;