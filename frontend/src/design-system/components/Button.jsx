import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`ds-btn ds-btn--${variant} ds-btn--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
