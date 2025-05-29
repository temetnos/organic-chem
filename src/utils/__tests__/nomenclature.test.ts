import { getMoleculeName } from '../nomenclature';
import type { Atom, Bond } from '../../types/molecule';

function createAtom(id: string, element: Atom['element']): Atom {
  return {
    id,
    element,
    x: 0,
    y: 0,
    z: 0
  };
}

function createBond(from: string, to: string, order: Bond['order']): Bond {
  return {
    id: `${from}-${to}`,
    from,
    to,
    order
  };
}

// Helper to create test molecules more efficiently
function createMolecule(
  carbonCount: number,
  functionalGroups: Array<{
    type: 'O' | 'Cl' | 'Br' | 'I' | 'F' | 'N' | 'C',
    position: number,
    bondOrder?: 1 | 2 | 3,
    hydrogens?: number
  }> = []
): { atoms: Atom[], bonds: Bond[] } {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  let idCounter = 1;

  // Add carbon chain
  for (let i = 0; i < carbonCount; i++) {
    atoms.push(createAtom(`C${i+1}`, 'C'));
    if (i > 0) {
      bonds.push(createBond(`C${i}`, `C${i+1}`, 1));
    }
  }

  // Add functional groups
  functionalGroups.forEach(group => {
    const atomId = `${group.type}${idCounter++}`;
    atoms.push(createAtom(atomId, group.type));
    bonds.push(createBond(`C${group.position}`, atomId, group.bondOrder || 1));

    // Add hydrogens if specified
    if (group.hydrogens) {
      for (let i = 0; i < group.hydrogens; i++) {
        const hId = `H${idCounter++}`;
        atoms.push(createAtom(hId, 'H'));
        bonds.push(createBond(atomId, hId, 1));
      }
    }
  });

  // Add remaining hydrogens to carbons
  for (let i = 0; i < carbonCount; i++) {
    const carbonId = `C${i+1}`;
    const existingBonds = bonds.filter(b => b.from === carbonId || b.to === carbonId);
    const neededHydrogens = 4 - existingBonds.length;
    
    for (let j = 0; j < neededHydrogens; j++) {
      const hId = `H${idCounter++}`;
      atoms.push(createAtom(hId, 'H'));
      bonds.push(createBond(carbonId, hId, 1));
    }
  }

  return { atoms, bonds };
}

describe('Molecule Nomenclature - Simple Molecules', () => {
  test('Methanol (CH3OH)', () => {
    const { atoms, bonds } = createMolecule(1, [
      { type: 'O', position: 1, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('methanol');
  }, 10000);

  test('Methanal (HCHO)', () => {
    const { atoms, bonds } = createMolecule(1, [
      { type: 'O', position: 1, bondOrder: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('methanal');
  }, 10000);

  test('Methanoic acid (HCOOH)', () => {
    const { atoms, bonds } = createMolecule(1, [
      { type: 'O', position: 1, bondOrder: 2 },
      { type: 'O', position: 1, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('methanoic acid');
  }, 10000);

  test('Ethanol (CH3CH2OH)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'O', position: 2, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('ethanol');
  }, 10000);

  test('Ethanal (CH3CHO)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'O', position: 2, bondOrder: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('ethanal');
  }, 10000);

  test('Ethanoic acid (CH3COOH)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'O', position: 2, bondOrder: 2 },
      { type: 'O', position: 2, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('ethanoic acid');
  }, 10000);

  test('1,2-Ethanediol (HOCH2CH2OH)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'O', position: 1, hydrogens: 1 },
      { type: 'O', position: 2, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('1,2-ethanediol');
  }, 10000);
});

describe('Molecule Nomenclature - Complex Molecules', () => {
  test('2-Methylpropan-1-ol', () => {
    const { atoms, bonds } = createMolecule(3, [
      { type: 'O', position: 1, hydrogens: 1 },
      { type: 'C', position: 2 } // Branch
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-methylpropan-1-ol');
  }, 10000);

  test('2-Chlorobutane (CH3CHClCH2CH3)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'Cl', position: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-chlorobutane');
  }, 10000);

  test('2-Butanol (CH3CHOHCH2CH3)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'O', position: 2, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-butanol');
  }, 10000);

  test('2-Butanone (CH3COCH2CH3)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'O', position: 2, bondOrder: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-butanone');
  }, 10000);

  test('2-Butenal (CH3CH=CHCHO)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'O', position: 4, bondOrder: 2 },
      { type: 'C', position: 3, bondOrder: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-butenal');
  }, 10000);

  test('2-Chloro-3-butanol (CH3CHClCHOHCH3)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'Cl', position: 2 },
      { type: 'O', position: 3, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-chloro-3-butanol');
  }, 10000);
});

describe('Molecule Nomenclature - Multiple Bonds', () => {
  test('2-Butyne (CH3C≡CCH3)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'C', position: 2, bondOrder: 3 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-butyne');
  }, 10000);

  test('1,3-Butadiene (CH2=CHCH=CH2)', () => {
    const { atoms, bonds } = createMolecule(4, [
      { type: 'C', position: 1, bondOrder: 2 },
      { type: 'C', position: 3, bondOrder: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('1,3-butadiene');
  }, 10000);
});

describe('Molecule Nomenclature - Amines', () => {
  test('Methylamine (CH3NH2)', () => {
    const { atoms, bonds } = createMolecule(1, [
      { type: 'N', position: 1, hydrogens: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('methylamine');
  }, 10000);

  test('Dimethylamine ((CH3)2NH)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'N', position: 1, hydrogens: 1 },
      { type: 'C', position: 2 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('dimethylamine');
  }, 10000);

  test('Trimethylamine ((CH3)3N)', () => {
    const { atoms, bonds } = createMolecule(3, [
      { type: 'N', position: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('trimethylamine');
  }, 10000);
});

describe('Molecule Nomenclature - Cyclic Compounds', () => {
  test('Cyclohexanol', () => {
    const { atoms, bonds } = createMolecule(6, [
      { type: 'O', position: 1, hydrogens: 1 }
    ]);
    bonds.push(createBond('C6', 'C1', 1));
    expect(getMoleculeName(atoms, bonds)).toBe('cyclohexanol');
  }, 10000);

  test('Cyclohexanone', () => {
    const { atoms, bonds } = createMolecule(6, [
      { type: 'O', position: 1, bondOrder: 2 }
    ]);
    bonds.push(createBond('C6', 'C1', 1));
    expect(getMoleculeName(atoms, bonds)).toBe('cyclohexanone');
  }, 10000);
});

describe('Molecule Nomenclature - Amino Acids', () => {
  test('Glycine (NH2CH2COOH)', () => {
    const { atoms, bonds } = createMolecule(2, [
      { type: 'N', position: 1, hydrogens: 2 },
      { type: 'O', position: 2, bondOrder: 2 },
      { type: 'O', position: 2, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-aminoethanoic acid');
  }, 10000);

  test('Alanine (CH3CH(NH2)COOH)', () => {
    const { atoms, bonds } = createMolecule(3, [
      { type: 'N', position: 2, hydrogens: 2 },
      { type: 'O', position: 3, bondOrder: 2 },
      { type: 'O', position: 3, hydrogens: 1 }
    ]);
    expect(getMoleculeName(atoms, bonds)).toBe('2-aminopropanoic acid');
  }, 10000);
});
