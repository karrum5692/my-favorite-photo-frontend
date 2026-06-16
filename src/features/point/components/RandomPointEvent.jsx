'use client';

import React, { useState } from 'react';
import RandomPointModal from './RandomPointModal';
import RandomPointFloatingButton from './RandomPointFloatingButton';
import { useRandomPoint } from '../hooks/useRandomPoint';

export default function RandomPointEvent() {
  const { canClaim, remainMs, loading, claim, sync } = useRandomPoint();
  const [modalOpen, setModalOpen] = useState(false);
  const [openKey, setOpenKey] = useState(0);

  const open = () => {
    setOpenKey((k) => k + 1);
    setModalOpen(true);
    sync();
  };

  return (
    <>
      {!modalOpen && (
        <RandomPointFloatingButton
          canClaim={canClaim}
          remainMs={remainMs}
          onClick={open}
        />
      )}

      <RandomPointModal
        key={openKey}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        canClaim={canClaim}
        remainMs={remainMs}
        loading={loading}
        onClaim={claim}
      />
    </>
  );
}
