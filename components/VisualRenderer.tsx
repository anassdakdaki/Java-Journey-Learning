
import React from 'react';
import { JvmDiagram, ClassVsObjectDiagram, ArrayDiagram, ArrayListDiagram, HashMapDiagram, InheritanceDiagram } from './visuals/VisualAids';

interface VisualRendererProps {
  visual: string;
}

const VisualRenderer: React.FC<VisualRendererProps> = ({ visual }) => {
  const renderVisual = () => {
    switch (visual) {
      case 'jvm':
        return <JvmDiagram />;
      case 'classVsObject':
        return <ClassVsObjectDiagram />;
      case 'array':
        return <ArrayDiagram />;
      case 'arrayList':
        return <ArrayListDiagram />;
      case 'hashMap':
        return <HashMapDiagram />;
      case 'inheritance':
        return <InheritanceDiagram />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-base-300/50 dark:bg-base-300-dark/30 rounded-lg shadow-inner">
      {renderVisual()}
    </div>
  );
};

export default VisualRenderer;
