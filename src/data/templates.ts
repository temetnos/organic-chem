import { MoleculeStructure } from '../types/molecule';

export interface TemplateStructure {
  id: string;
  name: string;
  description: string;
  structure: MoleculeStructure;
}

export const templates: TemplateStructure[] = [
  {
    id: 'hydroxyl',
    name: 'Hidroksil',
    description: '-OH grubu',
    structure: {
      atoms: [
        { id: '1', element: 'O', x: 0, y: 0 },
        { id: '2', element: 'H', x: 50, y: 0 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 }
      ]
    }
  },
  {
    id: 'benzene',
    name: 'Benzen',
    description: 'Benzen halkası',
    structure: {
      atoms: [
        { id: '1', element: 'C', x: 0, y: 0 },
        { id: '2', element: 'C', x: 50, y: -29 },
        { id: '3', element: 'C', x: 100, y: 0 },
        { id: '4', element: 'C', x: 100, y: 58 },
        { id: '5', element: 'C', x: 50, y: 87 },
        { id: '6', element: 'C', x: 0, y: 58 },
        { id: '7', element: 'H', x: -35, y: -20 },
        { id: '8', element: 'H', x: 50, y: -64 },
        { id: '9', element: 'H', x: 135, y: -20 },
        { id: '10', element: 'H', x: 135, y: 78 },
        { id: '11', element: 'H', x: 50, y: 122 },
        { id: '12', element: 'H', x: -35, y: 78 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 2 },
        { id: '2', from: '2', to: '3', order: 1 },
        { id: '3', from: '3', to: '4', order: 2 },
        { id: '4', from: '4', to: '5', order: 1 },
        { id: '5', from: '5', to: '6', order: 2 },
        { id: '6', from: '6', to: '1', order: 1 },
        { id: '7', from: '1', to: '7', order: 1 },
        { id: '8', from: '2', to: '8', order: 1 },
        { id: '9', from: '3', to: '9', order: 1 },
        { id: '10', from: '4', to: '10', order: 1 },
        { id: '11', from: '5', to: '11', order: 1 },
        { id: '12', from: '6', to: '12', order: 1 }
      ]
    }
  },
  {
    id: 'amino',
    name: 'Amino',
    description: '-NH₂ grubu',
    structure: {
      atoms: [
        { id: '1', element: 'N', x: 0, y: 0 },
        { id: '2', element: 'H', x: 50, y: -29 },
        { id: '3', element: 'H', x: 50, y: 29 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 }
      ]
    }
  },
  {
    id: 'methyl',
    name: 'Metil',
    description: '-CH₃ grubu',
    structure: {
      atoms: [
        { id: '1', element: 'C', x: 0, y: 0 },
        { id: '2', element: 'H', x: 50, y: -29 },
        { id: '3', element: 'H', x: 50, y: 29 },
        { id: '4', element: 'H', x: -50, y: 0 }
      ],
      bonds: [
        { id: '1', from: '1', to: '2', order: 1 },
        { id: '2', from: '1', to: '3', order: 1 },
        { id: '3', from: '1', to: '4', order: 1 }
      ]
    }
  }
];
