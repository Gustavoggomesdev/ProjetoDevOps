import React from 'react';

/**
 * Componente reutilizável para estados de loading e erro.
 */
export const LoadingSpinner = ({ message = 'Carregando...' }) => (
  <div className="state-container">
    <div className="loading-spinner" />
    <p className="state-message">{message}</p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="state-container state-container--error">
    <span className="state-icon">⚠️</span>
    <p className="state-message">{message || 'Ocorreu um erro.'}</p>
    {onRetry && (
      <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={onRetry}>
        Tentar novamente
      </button>
    )}
  </div>
);

export const EmptyState = ({ message, icon = '📭' }) => (
  <div className="state-container">
    <span className="state-icon">{icon}</span>
    <p className="state-message">{message || 'Nenhum item encontrado.'}</p>
  </div>
);

export default LoadingSpinner;
