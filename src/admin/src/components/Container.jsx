const Container = ({ children, className = '', centered = false }) => {
  return (
    <div className={`container ${centered ? 'centered' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Container;