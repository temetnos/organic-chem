import { Challenge } from '../types/molecule';

export const challenges: Challenge[] = [
  {
    id: 'water',
    name: 'Su',
    description: 'H₂O molekülü',
    formula: 'H₂O',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'O', x: 100, y: 100 },
        { id: '2', element: 'H', x: 75, y: 75 },
        { id: '3', element: 'H', x: 125, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 }
      ]
    },
    solution: {
      atoms: [
        { id: '1', element: 'O', x: 100, y: 100 },
        { id: '2', element: 'H', x: 75, y: 75 },
        { id: '3', element: 'H', x: 125, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 }
      ]
    }
  },
  {
    id: 'methane',
    name: 'Metan',
    description: 'CH₄ molekülü',
    formula: 'CH₄',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'H', x: 75, y: 75 },
        { id: '3', element: 'H', x: 125, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 },
        { id: '5', element: 'H', x: 125, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 }
      ]
    }
  },
  {
    id: 'ammonia',
    name: 'ammonia',
    description: 'molecules.ammonia.description',
    formula: 'NH₃',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'N', x: 100, y: 100 },
        { id: '2', element: 'H', x: 75, y: 75 },
        { id: '3', element: 'H', x: 125, y: 75 },
        { id: '4', element: 'H', x: 100, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 }
      ]
    }
  },
  {
    id: 'carbonDioxide',
    name: 'Karbondioksit',
    description: 'CO₂ molekülü',
    formula: 'CO₂',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'O', x: 50, y: 100 },
        { id: '3', element: 'O', x: 150, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '1', to: '3', order: 2 }
      ]
    }
  },
  {
    id: 'methanol',
    name: 'Metanol',
    description: 'CH₃OH molekülü',
    formula: 'CH₃OH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'O', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 },
        { id: '5', element: 'H', x: 125, y: 75 },
        { id: '6', element: 'H', x: 175, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 }
      ]
    }
  },
  {
    id: 'ethane',
    name: 'Etan',
    description: 'C₂H₆ molekülü',
    formula: 'C₂H₆',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 },
        { id: '5', element: 'H', x: 125, y: 75 },
        { id: '6', element: 'H', x: 175, y: 75 },
        { id: '7', element: 'H', x: 175, y: 125 },
        { id: '8', element: 'H', x: 125, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 }
      ]
    }
  },
  {
    id: 'ethanol',
    name: 'Etanol',
    description: 'C₂H₅OH molekülü',
    formula: 'C₂H₅OH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'O', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 75 },
        { id: '5', element: 'H', x: 75, y: 125 },
        { id: '6', element: 'H', x: 125, y: 75 },
        { id: '7', element: 'H', x: 150, y: 125 },
        { id: '8', element: 'H', x: 175, y: 75 },
        { id: '9', element: 'H', x: 225, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 }
      ]
    }
  },
  {
    id: 'formaldehyde',
    name: 'Formaldehit',
    description: 'En basit aldehit molekülü',
    formula: 'CH₂O',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'O', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 }
      ]
    }
  },
  {
    id: 'acetaldehyde',
    name: 'Asetaldehit',
    description: 'En basit aldehit türevi',
    formula: 'CH₃CHO',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'O', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 75 },
        { id: '5', element: 'H', x: 75, y: 125 },
        { id: '6', element: 'H', x: 125, y: 75 },
        { id: '7', element: 'H', x: 150, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 2 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 }
      ]
    }
  },
  {
    id: 'propane',
    name: 'Propan',
    description: 'Üç karbonlu alkan',
    formula: 'C₃H₈',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 75 },
        { id: '5', element: 'H', x: 75, y: 125 },
        { id: '6', element: 'H', x: 125, y: 75 },
        { id: '7', element: 'H', x: 175, y: 75 },
        { id: '8', element: 'H', x: 225, y: 75 },
        { id: '9', element: 'H', x: 225, y: 125 },
        { id: '10', element: 'H', x: 150, y: 125 },
        { id: '11', element: 'H', x: 125, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '2', to: '10', order: 1 },
        { id: '10', from: '3', to: '11', order: 1 }
      ]
    }
  },
  {
    id: 'dimethylether',
    name: 'Dimetil Eter',
    description: 'En basit eter bileşiği',
    formula: 'CH₃OCH₃',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'O', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 75 },
        { id: '5', element: 'H', x: 75, y: 125 },
        { id: '6', element: 'H', x: 125, y: 75 },
        { id: '7', element: 'H', x: 225, y: 75 },
        { id: '8', element: 'H', x: 225, y: 125 },
        { id: '9', element: 'H', x: 175, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '3', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 }
      ]
    }
  },
  {
    id: 'methylamine',
    name: 'Metilamin',
    description: 'En basit birincil amin',
    formula: 'CH₃NH₂',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'N', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 },
        { id: '5', element: 'H', x: 125, y: 75 },
        { id: '6', element: 'H', x: 175, y: 75 },
        { id: '7', element: 'H', x: 175, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 }
      ]
    }
  },
  {
    id: 'ethene',
    name: 'Eten',
    description: 'En basit alken',
    formula: 'C₂H₄',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 75 },
        { id: '4', element: 'H', x: 75, y: 125 },
        { id: '5', element: 'H', x: 175, y: 75 },
        { id: '6', element: 'H', x: 175, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '2', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 }
      ]
    }
  },
  {
    id: 'ethyne',
    name: 'Etin',
    description: 'En basit alkin',
    formula: 'C₂H₂',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 100 },
        { id: '4', element: 'H', x: 175, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 3 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '2', to: '4', order: 1 }
      ]
    }
  },
  {
    id: 'propanol',
    name: 'Propanol',
    description: 'Üç karbonlu alkol',
    formula: 'C₃H₇OH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'O', x: 250, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 125, y: 75 },
        { id: '8', element: 'H', x: 175, y: 75 },
        { id: '9', element: 'H', x: 225, y: 75 },
        { id: '10', element: 'H', x: 150, y: 125 },
        { id: '11', element: 'H', x: 200, y: 125 },
        { id: '12', element: 'H', x: 275, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '2', to: '10', order: 1 },
        { id: '10', from: '3', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 }
      ]
    }
  },
  {
    id: 'dimethylamine',
    name: 'Dimetilamin',
    description: 'İki metil grubu içeren amin',
    formula: '(CH₃)₂NH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'N', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 75 },
        { id: '5', element: 'H', x: 75, y: 125 },
        { id: '6', element: 'H', x: 125, y: 75 },
        { id: '7', element: 'H', x: 225, y: 75 },
        { id: '8', element: 'H', x: 225, y: 125 },
        { id: '9', element: 'H', x: 175, y: 75 },
        { id: '10', element: 'H', x: 150, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '3', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '2', to: '10', order: 1 }
      ]
    }
  },
  {
    id: 'acetone',
    name: 'Aseton',
    description: 'En basit keton',
    formula: 'CH₃COCH₃',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'O', x: 150, y: 150 },
        { id: '4', element: 'C', x: 200, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 125, y: 75 },
        { id: '8', element: 'H', x: 225, y: 75 },
        { id: '9', element: 'H', x: 225, y: 125 },
        { id: '10', element: 'H', x: 175, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 2 },
        { id: '3', from: '2', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '4', to: '8', order: 1 },
        { id: '8', from: '4', to: '9', order: 1 },
        { id: '9', from: '4', to: '10', order: 1 }
      ]
    }
  },
  {
    id: 'ethylmethylether',
    name: 'Etil Metil Eter',
    description: 'Asimetrik eter bileşiği',
    formula: 'CH₃OCH₂CH₃',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'O', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 125, y: 75 },
        { id: '8', element: 'H', x: 200, y: 75 },
        { id: '9', element: 'H', x: 200, y: 125 },
        { id: '10', element: 'H', x: 275, y: 75 },
        { id: '11', element: 'H', x: 275, y: 100 },
        { id: '12', element: 'H', x: 275, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '4', to: '10', order: 1 },
        { id: '10', from: '4', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 }
      ]
    }
  },
  {
    id: 'propylamine',
    name: 'Propilamin',
    description: 'Üç karbonlu amin',
    formula: 'C₃H₇NH₂',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'N', x: 250, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 125, y: 75 },
        { id: '8', element: 'H', x: 175, y: 75 },
        { id: '9', element: 'H', x: 225, y: 75 },
        { id: '10', element: 'H', x: 150, y: 125 },
        { id: '11', element: 'H', x: 200, y: 125 },
        { id: '12', element: 'H', x: 275, y: 75 },
        { id: '13', element: 'H', x: 275, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '2', to: '10', order: 1 },
        { id: '10', from: '3', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 },
        { id: '12', from: '4', to: '13', order: 1 }
      ]
    }
  },
  {
    id: 'butane',
    name: 'Bütan',
    description: 'Dört karbonlu alkan',
    formula: 'C₄H₁₀',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 150, y: 75 },
        { id: '8', element: 'H', x: 150, y: 125 },
        { id: '9', element: 'H', x: 200, y: 75 },
        { id: '10', element: 'H', x: 200, y: 125 },
        { id: '11', element: 'H', x: 275, y: 75 },
        { id: '12', element: 'H', x: 275, y: 100 },
        { id: '13', element: 'H', x: 275, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '3', to: '10', order: 1 },
        { id: '10', from: '4', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 },
        { id: '12', from: '4', to: '13', order: 1 }
      ]
    }
  },
  {
    id: 'isobutane',
    name: 'İzobütan',
    description: 'Dallanmış dört karbonlu alkan',
    formula: '(CH₃)₃CH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 150, y: 100 },
        { id: '2', element: 'C', x: 100, y: 75 },
        { id: '3', element: 'C', x: 200, y: 75 },
        { id: '4', element: 'C', x: 150, y: 150 },
        { id: '5', element: 'H', x: 75, y: 50 },
        { id: '6', element: 'H', x: 75, y: 100 },
        { id: '7', element: 'H', x: 125, y: 50 },
        { id: '8', element: 'H', x: 225, y: 50 },
        { id: '9', element: 'H', x: 225, y: 100 },
        { id: '10', element: 'H', x: 175, y: 50 },
        { id: '11', element: 'H', x: 125, y: 175 },
        { id: '12', element: 'H', x: 175, y: 175 },
        { id: '13', element: 'H', x: 150, y: 75 },
        { id: '14', element: 'H', x: 150, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '2', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '3', to: '10', order: 1 },
        { id: '10', from: '4', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 },
        { id: '12', from: '1', to: '13', order: 1 },
        { id: '13', from: '4', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'ethylamine',
    name: 'Etilamin',
    description: 'İki karbonlu birincil amin',
    formula: 'CH₃CH₂NH₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'N', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 87 },
        { id: '5', element: 'H', x: 75, y: 113 },
        { id: '6', element: 'H', x: 100, y: 125 },
        { id: '7', element: 'H', x: 150, y: 87 },
        { id: '8', element: 'H', x: 150, y: 113 },
        { id: '9', element: 'H', x: 225, y: 87 },
        { id: '10', element: 'H', x: 225, y: 113 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '3', to: '10', order: 1 }
      ]
    }
  },
  {
    id: 'diethylEther',
    name: 'Dietil eter',
    description: 'Simetrik bir eter bileşiği',
    formula: 'C₂H₅OC₂H₅',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'O', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'C', x: 300, y: 100 },
        { id: '6', element: 'H', x: 75, y: 75 },
        { id: '7', element: 'H', x: 75, y: 125 },
        { id: '8', element: 'H', x: 150, y: 75 },
        { id: '9', element: 'H', x: 150, y: 125 },
        { id: '10', element: 'H', x: 250, y: 75 },
        { id: '11', element: 'H', x: 250, y: 125 },
        { id: '12', element: 'H', x: 325, y: 75 },
        { id: '13', element: 'H', x: 325, y: 100 },
        { id: '14', element: 'H', x: 325, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '2', to: '9', order: 1 },
        { id: '9', from: '4', to: '10', order: 1 },
        { id: '10', from: '4', to: '11', order: 1 },
        { id: '11', from: '5', to: '12', order: 1 },
        { id: '12', from: '5', to: '13', order: 1 },
        { id: '13', from: '5', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'butanol',
    name: 'Bütanol',
    description: 'Dört karbonlu alkol',
    formula: 'C₄H₉OH',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'O', x: 300, y: 100 },
        { id: '6', element: 'H', x: 75, y: 75 },
        { id: '7', element: 'H', x: 75, y: 125 },
        { id: '8', element: 'H', x: 150, y: 75 },
        { id: '9', element: 'H', x: 150, y: 125 },
        { id: '10', element: 'H', x: 200, y: 75 },
        { id: '11', element: 'H', x: 200, y: 125 },
        { id: '12', element: 'H', x: 250, y: 75 },
        { id: '13', element: 'H', x: 250, y: 125 },
        { id: '14', element: 'H', x: 325, y: 100 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '2', to: '9', order: 1 },
        { id: '9', from: '3', to: '10', order: 1 },
        { id: '10', from: '3', to: '11', order: 1 },
        { id: '11', from: '4', to: '12', order: 1 },
        { id: '12', from: '4', to: '13', order: 1 },
        { id: '13', from: '5', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'propanal',
    name: 'Propanal',
    description: 'Üç karbonlu aldehit',
    formula: 'C₂H₅CHO',
    difficulty: 'easy',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'O', x: 250, y: 100 },
        { id: '5', element: 'H', x: 75, y: 75 },
        { id: '6', element: 'H', x: 75, y: 125 },
        { id: '7', element: 'H', x: 150, y: 75 },
        { id: '8', element: 'H', x: 150, y: 125 },
        { id: '9', element: 'H', x: 200, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '2', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 }
      ]
    }
  },
  {
    id: 'benzene',
    name: 'Benzen',
    description: 'En temel aromatik bileşik',
    formula: 'C₆H₆',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'H', x: 150, y: 62 },
        { id: '8', element: 'H', x: 225, y: 87 },
        { id: '9', element: 'H', x: 225, y: 163 },
        { id: '10', element: 'H', x: 150, y: 188 },
        { id: '11', element: 'H', x: 75, y: 163 },
        { id: '12', element: 'H', x: 75, y: 87 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '2', to: '7', order: 1 },
        { id: '8', from: '3', to: '8', order: 1 },
        { id: '9', from: '4', to: '9', order: 1 },
        { id: '10', from: '5', to: '10', order: 1 },
        { id: '11', from: '6', to: '11', order: 1 },
        { id: '12', from: '1', to: '12', order: 1 }
      ]
    }
  },
  {
    id: 'cyclohexane',
    name: 'Siklohekzan',
    description: 'En kararlı halkalı alkan',
    formula: 'C₆H₁₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'H', x: 75, y: 87 },
        { id: '8', element: 'H', x: 125, y: 75 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 87 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 175, y: 75 },
        { id: '13', element: 'H', x: 175, y: 175 },
        { id: '14', element: 'H', x: 150, y: 188 },
        { id: '15', element: 'H', x: 125, y: 175 },
        { id: '16', element: 'H', x: 75, y: 163 },
        { id: '17', element: 'H', x: 75, y: 125 },
        { id: '18', element: 'H', x: 225, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 1 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '1', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '4', to: '18', order: 1 },
        { id: '14', from: '5', to: '13', order: 1 },
        { id: '15', from: '5', to: '14', order: 1 },
        { id: '16', from: '6', to: '15', order: 1 },
        { id: '17', from: '6', to: '16', order: 1 },
        { id: '18', from: '3', to: '17', order: 1 }
      ]
    }
  },
  {
    id: 'phenol',
    name: 'Fenol',
    description: 'Aromatik alkol',
    formula: 'C₆H₅OH',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'O', x: 75, y: 87 },
        { id: '8', element: 'H', x: 50, y: 87 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 87 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 150, y: 188 },
        { id: '13', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '3', to: '10', order: 1 },
        { id: '11', from: '4', to: '11', order: 1 },
        { id: '12', from: '5', to: '12', order: 1 },
        { id: '13', from: '6', to: '13', order: 1 }
      ]
    }
  },
  {
    id: 'aniline',
    name: 'Anilin',
    description: 'Aromatik amin',
    formula: 'C₆H₅NH₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'N', x: 75, y: 87 },
        { id: '8', element: 'H', x: 50, y: 75 },
        { id: '9', element: 'H', x: 50, y: 100 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 150, y: 188 },
        { id: '14', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '5', to: '13', order: 1 },
        { id: '14', from: '6', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'ethylAcetate',
    name: 'Etil asetat',
    description: 'Yaygın bir ester',
    formula: 'CH₃COOC₂H₅',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'O', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'C', x: 300, y: 100 },
        { id: '6', element: 'O', x: 150, y: 150 },
        { id: '7', element: 'H', x: 75, y: 75 },
        { id: '8', element: 'H', x: 75, y: 125 },
        { id: '9', element: 'H', x: 75, y: 100 },
        { id: '10', element: 'H', x: 200, y: 75 },
        { id: '11', element: 'H', x: 200, y: 125 },
        { id: '12', element: 'H', x: 325, y: 75 },
        { id: '13', element: 'H', x: 325, y: 100 },
        { id: '14', element: 'H', x: 325, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 2 },
        { id: '6', from: '1', to: '7', order: 1 },
        { id: '7', from: '1', to: '8', order: 1 },
        { id: '8', from: '1', to: '9', order: 1 },
        { id: '9', from: '4', to: '10', order: 1 },
        { id: '10', from: '4', to: '11', order: 1 },
        { id: '11', from: '5', to: '12', order: 1 },
        { id: '12', from: '5', to: '13', order: 1 },
        { id: '13', from: '5', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'pyridine',
    name: 'Piridin',
    description: 'Azot içeren aromatik halka',
    formula: 'C₅H₅N',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'N', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'H', x: 150, y: 62 },
        { id: '8', element: 'H', x: 225, y: 87 },
        { id: '9', element: 'H', x: 225, y: 163 },
        { id: '10', element: 'H', x: 150, y: 188 },
        { id: '11', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '2', to: '7', order: 1 },
        { id: '8', from: '3', to: '8', order: 1 },
        { id: '9', from: '4', to: '9', order: 1 },
        { id: '10', from: '5', to: '10', order: 1 },
        { id: '11', from: '6', to: '11', order: 1 }
      ]
    }
  },
  {
    id: 'furan',
    name: 'Furan',
    description: 'Oksijen içeren beş üyeli aromatik halka',
    formula: 'C₄H₄O',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'O', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 175, y: 150 },
        { id: '5', element: 'C', x: 125, y: 150 },
        { id: '6', element: 'H', x: 150, y: 62 },
        { id: '7', element: 'H', x: 225, y: 87 },
        { id: '8', element: 'H', x: 175, y: 175 },
        { id: '9', element: 'H', x: 100, y: 175 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 2 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 2 },
        { id: '5', from: '5', to: '1', order: 1 },
        { id: '6', from: '2', to: '6', order: 1 },
        { id: '7', from: '3', to: '7', order: 1 },
        { id: '8', from: '4', to: '8', order: 1 },
        { id: '9', from: '5', to: '9', order: 1 }
      ]
    }
  },
  {
    id: 'cyclohexanol',
    name: 'Siklohekzanol',
    description: 'Halkalı alkol',
    formula: 'C₆H₁₁OH',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'O', x: 75, y: 87 },
        { id: '8', element: 'H', x: 50, y: 87 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 175, y: 75 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 175, y: 175 },
        { id: '14', element: 'H', x: 150, y: 188 },
        { id: '15', element: 'H', x: 125, y: 175 },
        { id: '16', element: 'H', x: 75, y: 163 },
        { id: '17', element: 'H', x: 225, y: 125 },
        { id: '18', element: 'H', x: 125, y: 75 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 1 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '4', to: '17', order: 1 },
        { id: '14', from: '5', to: '13', order: 1 },
        { id: '15', from: '5', to: '14', order: 1 },
        { id: '16', from: '6', to: '15', order: 1 },
        { id: '17', from: '6', to: '16', order: 1 },
        { id: '18', from: '1', to: '18', order: 1 }
      ]
    }
  },
  {
    id: 'acetylacetone',
    name: 'Asetilaseton',
    description: 'Keto-enol tautomerisi gösteren diketon',
    formula: 'CH₃COCH₂COCH₃',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 250, y: 100 },
        { id: '5', element: 'C', x: 300, y: 100 },
        { id: '6', element: 'O', x: 150, y: 150 },
        { id: '7', element: 'O', x: 250, y: 150 },
        { id: '8', element: 'H', x: 75, y: 75 },
        { id: '9', element: 'H', x: 75, y: 125 },
        { id: '10', element: 'H', x: 75, y: 100 },
        { id: '11', element: 'H', x: 200, y: 75 },
        { id: '12', element: 'H', x: 200, y: 125 },
        { id: '13', element: 'H', x: 325, y: 75 },
        { id: '14', element: 'H', x: 325, y: 100 },
        { id: '15', element: 'H', x: 325, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 2 },
        { id: '6', from: '4', to: '7', order: 2 },
        { id: '7', from: '1', to: '8', order: 1 },
        { id: '8', from: '1', to: '9', order: 1 },
        { id: '9', from: '1', to: '10', order: 1 },
        { id: '10', from: '3', to: '11', order: 1 },
        { id: '11', from: '3', to: '12', order: 1 },
        { id: '12', from: '5', to: '13', order: 1 },
        { id: '13', from: '5', to: '14', order: 1 },
        { id: '14', from: '5', to: '15', order: 1 }
      ]
    }
  },
  {
    id: 'benzoicAcid',
    name: 'Benzoik asit',
    description: 'Aromatik karboksilik asit',
    formula: 'C₆H₅COOH',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'O', x: 50, y: 75 },
        { id: '9', element: 'O', x: 50, y: 100 },
        { id: '10', element: 'H', x: 25, y: 75 },
        { id: '11', element: 'H', x: 150, y: 62 },
        { id: '12', element: 'H', x: 225, y: 87 },
        { id: '13', element: 'H', x: 225, y: 163 },
        { id: '14', element: 'H', x: 150, y: 188 },
        { id: '15', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '7', to: '9', order: 2 },
        { id: '10', from: '8', to: '10', order: 1 },
        { id: '11', from: '2', to: '11', order: 1 },
        { id: '12', from: '3', to: '12', order: 1 },
        { id: '13', from: '4', to: '13', order: 1 },
        { id: '14', from: '5', to: '14', order: 1 },
        { id: '15', from: '6', to: '15', order: 1 }
      ]
    }
  },
  {
    id: 'thiophene',
    name: 'Tiyofen',
    description: 'Kükürt içeren beş üyeli aromatik halka',
    formula: 'C₄H₄S',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'S', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 175, y: 150 },
        { id: '5', element: 'C', x: 125, y: 150 },
        { id: '6', element: 'H', x: 150, y: 62 },
        { id: '7', element: 'H', x: 225, y: 87 },
        { id: '8', element: 'H', x: 175, y: 175 },
        { id: '9', element: 'H', x: 100, y: 175 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 2 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 2 },
        { id: '5', from: '5', to: '1', order: 1 },
        { id: '6', from: '2', to: '6', order: 1 },
        { id: '7', from: '3', to: '7', order: 1 },
        { id: '8', from: '4', to: '8', order: 1 },
        { id: '9', from: '5', to: '9', order: 1 }
      ]
    }
  },
  {
    id: 'cyclohexene',
    name: 'Siklohekzen',
    description: 'Halkalı alken',
    formula: 'C₆H₁₀',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'H', x: 75, y: 87 },
        { id: '8', element: 'H', x: 150, y: 62 },
        { id: '9', element: 'H', x: 225, y: 87 },
        { id: '10', element: 'H', x: 225, y: 163 },
        { id: '11', element: 'H', x: 150, y: 188 },
        { id: '12', element: 'H', x: 75, y: 163 },
        { id: '13', element: 'H', x: 175, y: 75 },
        { id: '14', element: 'H', x: 225, y: 125 },
        { id: '15', element: 'H', x: 125, y: 175 },
        { id: '16', element: 'H', x: 75, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 1 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 1 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '2', to: '8', order: 1 },
        { id: '9', from: '3', to: '9', order: 1 },
        { id: '10', from: '4', to: '10', order: 1 },
        { id: '11', from: '5', to: '11', order: 1 },
        { id: '12', from: '6', to: '12', order: 1 },
        { id: '13', from: '3', to: '13', order: 1 },
        { id: '14', from: '4', to: '14', order: 1 },
        { id: '15', from: '5', to: '15', order: 1 },
        { id: '16', from: '6', to: '16', order: 1 }
      ]
    }
  },
  {
    id: 'pCresol',
    name: 'p-Krezol',
    description: 'Para pozisyonunda metil grubu içeren fenol',
    formula: 'CH₃C₆H₄OH',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'O', x: 75, y: 87 },
        { id: '8', element: 'C', x: 250, y: 100 },
        { id: '9', element: 'H', x: 50, y: 87 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 150, y: 188 },
        { id: '13', element: 'H', x: 75, y: 163 },
        { id: '14', element: 'H', x: 250, y: 75 },
        { id: '15', element: 'H', x: 275, y: 100 },
        { id: '16', element: 'H', x: 250, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '3', to: '8', order: 1 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '4', to: '11', order: 1 },
        { id: '12', from: '5', to: '12', order: 1 },
        { id: '13', from: '6', to: '13', order: 1 },
        { id: '14', from: '8', to: '14', order: 1 },
        { id: '15', from: '8', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 }
      ]
    }
  },
  {
    id: 'naphthalene',
    name: 'Naftalin',
    description: 'En basit çift halkalı aromatik bileşik',
    formula: 'C₁₀H₈',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 250, y: 87 },
        { id: '8', element: 'C', x: 300, y: 100 },
        { id: '9', element: 'C', x: 300, y: 150 },
        { id: '10', element: 'C', x: 250, y: 163 },
        { id: '11', element: 'H', x: 75, y: 87 },
        { id: '12', element: 'H', x: 150, y: 62 },
        { id: '13', element: 'H', x: 325, y: 87 },
        { id: '14', element: 'H', x: 325, y: 163 },
        { id: '15', element: 'H', x: 250, y: 188 },
        { id: '16', element: 'H', x: 150, y: 188 },
        { id: '17', element: 'H', x: 75, y: 163 },
        { id: '18', element: 'H', x: 250, y: 62 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '3', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 2 },
        { id: '9', from: '8', to: '9', order: 1 },
        { id: '10', from: '9', to: '10', order: 2 },
        { id: '11', from: '10', to: '4', order: 1 },
        { id: '12', from: '1', to: '11', order: 1 },
        { id: '13', from: '2', to: '12', order: 1 },
        { id: '14', from: '8', to: '13', order: 1 },
        { id: '15', from: '9', to: '14', order: 1 },
        { id: '16', from: '10', to: '15', order: 1 },
        { id: '17', from: '5', to: '16', order: 1 },
        { id: '18', from: '6', to: '17', order: 1 },
        { id: '19', from: '7', to: '18', order: 1 }
      ]
    }
  },
  {
    id: 'styrene',
    name: 'Stiren',
    description: 'Vinil grubu içeren benzen',
    formula: 'C₆H₅CH=CH₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'C', x: 50, y: 100 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 87 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 150, y: 188 },
        { id: '13', element: 'H', x: 75, y: 163 },
        { id: '14', element: 'H', x: 75, y: 62 },
        { id: '15', element: 'H', x: 25, y: 87 },
        { id: '16', element: 'H', x: 25, y: 113 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 2 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '3', to: '10', order: 1 },
        { id: '11', from: '4', to: '11', order: 1 },
        { id: '12', from: '5', to: '12', order: 1 },
        { id: '13', from: '6', to: '13', order: 1 },
        { id: '14', from: '7', to: '14', order: 1 },
        { id: '15', from: '8', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 }
      ]
    }
  },
  {
    id: 'mXylene',
    name: 'm-Ksilen',
    description: 'Meta pozisyonunda iki metil grubu içeren benzen',
    formula: 'C₆H₄(CH₃)₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'C', x: 225, y: 87 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 163 },
        { id: '11', element: 'H', x: 150, y: 188 },
        { id: '12', element: 'H', x: 75, y: 163 },
        { id: '13', element: 'H', x: 50, y: 75 },
        { id: '14', element: 'H', x: 50, y: 100 },
        { id: '15', element: 'H', x: 75, y: 62 },
        { id: '16', element: 'H', x: 250, y: 75 },
        { id: '17', element: 'H', x: 250, y: 100 },
        { id: '18', element: 'H', x: 225, y: 62 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '3', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '4', to: '10', order: 1 },
        { id: '11', from: '5', to: '11', order: 1 },
        { id: '12', from: '6', to: '12', order: 1 },
        { id: '13', from: '7', to: '13', order: 1 },
        { id: '14', from: '7', to: '14', order: 1 },
        { id: '15', from: '7', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 },
        { id: '17', from: '8', to: '17', order: 1 },
        { id: '18', from: '8', to: '18', order: 1 }
      ]
    }
  },
  {
    id: 'anisole',
    name: 'Anisol',
    description: 'Metoksi grubu içeren benzen',
    formula: 'C₆H₅OCH₃',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'O', x: 75, y: 87 },
        { id: '8', element: 'C', x: 50, y: 100 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 87 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 150, y: 188 },
        { id: '13', element: 'H', x: 75, y: 163 },
        { id: '14', element: 'H', x: 25, y: 87 },
        { id: '15', element: 'H', x: 25, y: 113 },
        { id: '16', element: 'H', x: 75, y: 113 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '3', to: '10', order: 1 },
        { id: '11', from: '4', to: '11', order: 1 },
        { id: '12', from: '5', to: '12', order: 1 },
        { id: '13', from: '6', to: '13', order: 1 },
        { id: '14', from: '8', to: '14', order: 1 },
        { id: '15', from: '8', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 }
      ]
    }
  },
  {
    id: 'ethylbenzene',
    name: 'Etilbenzen',
    description: 'Etil grubu içeren benzen',
    formula: 'C₆H₅CH₂CH₃',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'C', x: 50, y: 100 },
        { id: '9', element: 'H', x: 150, y: 62 },
        { id: '10', element: 'H', x: 225, y: 87 },
        { id: '11', element: 'H', x: 225, y: 163 },
        { id: '12', element: 'H', x: 150, y: 188 },
        { id: '13', element: 'H', x: 75, y: 163 },
        { id: '14', element: 'H', x: 75, y: 62 },
        { id: '15', element: 'H', x: 50, y: 75 },
        { id: '16', element: 'H', x: 25, y: 87 },
        { id: '17', element: 'H', x: 25, y: 113 },
        { id: '18', element: 'H', x: 50, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '2', to: '9', order: 1 },
        { id: '10', from: '3', to: '10', order: 1 },
        { id: '11', from: '4', to: '11', order: 1 },
        { id: '12', from: '5', to: '12', order: 1 },
        { id: '13', from: '6', to: '13', order: 1 },
        { id: '14', from: '7', to: '14', order: 1 },
        { id: '15', from: '7', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 },
        { id: '17', from: '8', to: '17', order: 1 },
        { id: '18', from: '8', to: '18', order: 1 }
      ]
    }
  },
  {
    id: 'isopropylbenzene',
    name: 'İzopropilbenzen',
    description: 'İzopropil grubu içeren benzen',
    formula: 'C₆H₅CH(CH₃)₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'C', x: 50, y: 75 },
        { id: '9', element: 'C', x: 50, y: 100 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 150, y: 188 },
        { id: '14', element: 'H', x: 75, y: 163 },
        { id: '15', element: 'H', x: 75, y: 62 },
        { id: '16', element: 'H', x: 25, y: 62 },
        { id: '17', element: 'H', x: 25, y: 87 },
        { id: '18', element: 'H', x: 75, y: 113 },
        { id: '19', element: 'H', x: 25, y: 113 },
        { id: '20', element: 'H', x: 25, y: 87 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 1 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '5', to: '13', order: 1 },
        { id: '14', from: '6', to: '14', order: 1 },
        { id: '15', from: '7', to: '15', order: 1 },
        { id: '16', from: '8', to: '16', order: 1 },
        { id: '17', from: '8', to: '17', order: 1 },
        { id: '18', from: '8', to: '18', order: 1 },
        { id: '19', from: '9', to: '19', order: 1 },
        { id: '20', from: '9', to: '20', order: 1 }
      ]
    }
  },
  {
    id: 'nitrobenzene',
    name: 'Nitrobenzen',
    description: 'Nitro grubu içeren benzen',
    formula: 'C₆H₅NO₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'N', x: 75, y: 87 },
        { id: '8', element: 'O', x: 50, y: 75 },
        { id: '9', element: 'O', x: 50, y: 100 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 150, y: 188 },
        { id: '14', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 2 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '5', to: '13', order: 1 },
        { id: '14', from: '6', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'acetophenone',
    name: 'Asetofenon',
    description: 'Asetil grubu içeren benzen',
    formula: 'C₆H₅COCH₃',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'O', x: 50, y: 75 },
        { id: '9', element: 'C', x: 50, y: 100 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 150, y: 188 },
        { id: '14', element: 'H', x: 75, y: 163 },
        { id: '15', element: 'H', x: 25, y: 87 },
        { id: '16', element: 'H', x: 25, y: 113 },
        { id: '17', element: 'H', x: 75, y: 113 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 2 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '5', to: '13', order: 1 },
        { id: '14', from: '6', to: '14', order: 1 },
        { id: '15', from: '9', to: '15', order: 1 },
        { id: '16', from: '9', to: '16', order: 1 },
        { id: '17', from: '9', to: '17', order: 1 }
      ]
    }
  },
  {
    id: 'benzaldehyde',
    name: 'Benzaldehit',
    description: 'Aldehit grubu içeren benzen',
    formula: 'C₆H₅CHO',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'C', x: 150, y: 87 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'C', x: 200, y: 150 },
        { id: '5', element: 'C', x: 150, y: 163 },
        { id: '6', element: 'C', x: 100, y: 150 },
        { id: '7', element: 'C', x: 75, y: 87 },
        { id: '8', element: 'O', x: 50, y: 75 },
        { id: '9', element: 'H', x: 50, y: 100 },
        { id: '10', element: 'H', x: 150, y: 62 },
        { id: '11', element: 'H', x: 225, y: 87 },
        { id: '12', element: 'H', x: 225, y: 163 },
        { id: '13', element: 'H', x: 150, y: 188 },
        { id: '14', element: 'H', x: 75, y: 163 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '7', to: '8', order: 2 },
        { id: '9', from: '7', to: '9', order: 1 },
        { id: '10', from: '2', to: '10', order: 1 },
        { id: '11', from: '3', to: '11', order: 1 },
        { id: '12', from: '4', to: '12', order: 1 },
        { id: '13', from: '5', to: '13', order: 1 },
        { id: '14', from: '6', to: '14', order: 1 }
      ]
    }
  },
  {
    id: 'methylamine',
    name: 'Metilamin',
    description: 'En basit birincil amin',
    formula: 'CH₃NH₂',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'N', x: 150, y: 100 },
        { id: '3', element: 'H', x: 75, y: 87 },
        { id: '4', element: 'H', x: 75, y: 113 },
        { id: '5', element: 'H', x: 100, y: 125 },
        { id: '6', element: 'H', x: 175, y: 87 },
        { id: '7', element: 'H', x: 175, y: 113 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '2', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 }
      ]
    }
  },
  {
    id: 'dimethylamine',
    name: 'Dimetilamin',
    description: 'İkincil amin örneği',
    formula: '(CH₃)₂NH',
    difficulty: 'medium',
    targetStructure: {
      atoms: [
        { id: '1', element: 'C', x: 100, y: 100 },
        { id: '2', element: 'N', x: 150, y: 100 },
        { id: '3', element: 'C', x: 200, y: 100 },
        { id: '4', element: 'H', x: 75, y: 87 },
        { id: '5', element: 'H', x: 75, y: 113 },
        { id: '6', element: 'H', x: 100, y: 125 },
        { id: '7', element: 'H', x: 150, y: 75 },
        { id: '8', element: 'H', x: 225, y: 87 },
        { id: '9', element: 'H', x: 225, y: 113 },
        { id: '10', element: 'H', x: 200, y: 125 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 },
        { id: '4', from: '1', to: '5', order: 1 },
        { id: '5', from: '1', to: '6', order: 1 },
        { id: '6', from: '2', to: '7', order: 1 },
        { id: '7', from: '3', to: '8', order: 1 },
        { id: '8', from: '3', to: '9', order: 1 },
        { id: '9', from: '3', to: '10', order: 1 }
      ]
    }
  }
] as const;