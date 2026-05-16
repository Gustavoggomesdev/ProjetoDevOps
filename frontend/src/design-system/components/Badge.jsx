import React from 'react';

const Badge = ({ variant = 'neutral', className = '', children, ...props }) => {
  return (
    <span className={`ds-badge ds-badge--${variant} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
};

export default Badge;
