import React from 'react';
import { useAuth } from '../context/AuthContext';

const MockBanner = () => {
  const { isMockMode } = useAuth();
  if (!isMockMode) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#92400e',
      color: '#fef3c7',
      fontSize: '13px',
      padding: '8px 16px',
      textAlign: 'center',
      borderTop: '1px solid #b45309',
    }}>
      ⚠️ Modo mock ativo — dados locais, sem backend. Para desativar, remova <code style={{background:'rgba(0,0,0,0.2)', padding:'1px 6px', borderRadius:'4px'}}>REACT_APP_MOCK_AUTH=true</code> do <code style={{background:'rgba(0,0,0,0.2)', padding:'1px 6px', borderRadius:'4px'}}>.env</code>
    </div>
  );
};

export default MockBanner;
