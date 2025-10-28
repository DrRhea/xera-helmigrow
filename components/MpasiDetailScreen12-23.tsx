import React from 'react';
import MpasiDetailTemplate from './MpasiDetailTemplate';

interface MpasiDetailScreen1223Props {
  onBack: () => void;
}

const MpasiDetailScreen1223: React.FC<MpasiDetailScreen1223Props> = ({ onBack }) => {
  return (
    <MpasiDetailTemplate
      onBack={onBack}
      ageRange="12-23 Bulan"
      cardTitle="Kebutuhan MP-ASI"
      cardSubtitle="Usia 12 - 23 Bulan"
    />
  );
};

export default MpasiDetailScreen1223;