import React from 'react';
import MpasiDetailTemplate from './MpasiDetailTemplate';

interface MpasiDetailScreen0911Props {
  onBack: () => void;
}

const MpasiDetailScreen0911: React.FC<MpasiDetailScreen0911Props> = ({ onBack }) => {
  return (
    <MpasiDetailTemplate
      onBack={onBack}
      ageRange="9-11 Bulan"
      cardTitle="Kebutuhan MP-ASI"
      cardSubtitle="Usia 09 - 11 Bulan"
    />
  );
};

export default MpasiDetailScreen0911;