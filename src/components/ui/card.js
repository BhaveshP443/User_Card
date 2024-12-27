const Card = ({ className, children, ...props }) => {
    return (
      <div className={`bg-white rounded-lg ${className}`} {...props}>
        {children}
      </div>
    );
  };
  
  export { Card };