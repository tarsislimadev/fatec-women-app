const EmptyState = ({ icon: Icon, title, text, className = '' }) => {
  return (
    <div className={`empty-state ${className}`}>
      {Icon && <Icon className="empty-state-icon" size={48} />}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{text}</p>
    </div>
  );
};

export default EmptyState;