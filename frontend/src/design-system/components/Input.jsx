import React from 'react';

const Input = ({
  leadingIcon = null,
  className = '',
  ...props
}) => {
  const hasLeadingIcon = Boolean(leadingIcon);

  return (
    <div className="ds-input-wrap">
      {hasLeadingIcon && <span className="ds-input-leading-icon">{leadingIcon}</span>}
      <input
        className={`ds-input ${hasLeadingIcon ? 'ds-input--with-leading-icon' : ''} ${className}`.trim()}
        {...props}
      />
    </div>
  );
};

export default Input;
