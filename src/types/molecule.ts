export type Atom = {
  id: string;
  element: 'H' | 'C' | 'N' | 'O' | 'F' | 'Na' | 'Mg' | 'P' | 'S' | 'Cl' | 'K' | 'Ca' | 'Fe' | 'Co' | 'Cu' | 'Zn' | 'Br' | 'I' | 'B' | 'Si' | 'Se';
  x: number;
  y: number;
  z?: number;
};

export type Bond = {
  id: string;
  from: string;
  to: string;
  order: 1 | 2 | 3;
};

export type MoleculeStructure = {
  atoms: Atom[];
  bonds: Bond[];
};

export type Challenge = {
  id: string;
  name: string;
  formula: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  targetStructure: MoleculeStructure;
  solution?: MoleculeStructure;
};