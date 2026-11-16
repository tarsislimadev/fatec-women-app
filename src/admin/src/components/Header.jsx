const Header = ({ title, actions, children }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        {actions}
        {children}
      </div>
    </header>
  );
};

export default Header;