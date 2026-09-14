// components/layout/UpgradeModal.jsx
import React from 'react';
import ProUpgradeModal from '../ui/ProUpgradeModal';

export default function UpgradeModal({ isOpen, onClose }) {
  return (
    <ProUpgradeModal
      isOpen={isOpen}
      initialStep="pitch"
      onClose={onClose}
    />
  );
}
