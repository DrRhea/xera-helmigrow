import React from 'react';
import MpasiDetailTemplate from './MpasiDetailTemplate';

interface MpasiDetailScreen25Props {
  onBack: () => void;
}

const MpasiDetailScreen25: React.FC<MpasiDetailScreen25Props> = ({ onBack }) => {
  return (
    <MpasiDetailTemplate
      onBack={onBack}
      ageRange="2-5 Tahun"
      cardTitle="Kebutuhan Gizi"
      cardSubtitle="Usia 02 - 05 Tahun"
    />
  );
};

export default MpasiDetailScreen25;