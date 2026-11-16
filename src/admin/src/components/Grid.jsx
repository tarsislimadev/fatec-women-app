const Grid = ({ columns = 'auto', gap = '2', children, className = '' }) => {
  const columnClasses = {
    '1': 'grid-2',
    '2': 'grid-2',
    '3': 'grid-3',
    auto: 'grid-auto',
  };
  
  const gapClasses = {
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;