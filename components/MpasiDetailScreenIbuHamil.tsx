import React from 'react';
import MpasiDetailTemplate from './MpasiDetailTemplate';

interface MpasiDetailScreenIbuHamilProps {
  onBack: () => void;
}

const MpasiDetailScreenIbuHamil: React.FC<MpasiDetailScreenIbuHamilProps> = ({ onBack }) => {
  return (
    <MpasiDetailTemplate
      onBack={onBack}
      ageRange="Ibu Hamil"
      cardTitle="Kebutuhan Gizi"
      cardSubtitle="Ibu Hamil"
    />
  );
};

export default MpasiDetailScreenIbuHamil;