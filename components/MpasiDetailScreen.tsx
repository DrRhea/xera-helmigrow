import React from 'react';
import MpasiDetailTemplate from './MpasiDetailTemplate';

interface MpasiDetailScreenProps {
  onBack: () => void;
}

const MpasiDetailScreen: React.FC<MpasiDetailScreenProps> = ({ onBack }) => {
  return (
    <MpasiDetailTemplate
      onBack={onBack}
      ageRange="6-8 Bulan"
      cardTitle="Kebutuhan MP-ASI"
      cardSubtitle="Usia 06 - 08 Bulan"
    />
  );
};


export default MpasiDetailScreen;
