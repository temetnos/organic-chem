import { Atom, Bond } from '../types/molecule';

export const MAX_BONDS = {
  'H': 1,   // Hydrogen
  'B': 3,   // Boron
  'C': 4,   // Carbon
  'N': 3,   // Nitrogen
  'O': 2,   // Oxygen
  'F': 1,   // Fluorine
  'Na': 1,  // Sodium
  'Mg': 2,  // Magnesium
  'P': 5,   // Phosphorus
  'S': 6,   // Sulfur
  'Cl': 1,  // Chlorine
  'K': 1,   // Potassium
  'Ca': 2,  // Calcium
  'Fe': 6,  // Iron
  'Co': 6,  // Cobalt
  'Cu': 2,  // Copper
  'Zn': 2,  // Zinc
  'Br': 1,  // Bromine
  'I': 1,   // Iodine
  'Si': 4,  // Silicon
  'Se': 2   // Selenium
} as const;

// Doğru molekül yapıları
type MoleculeStructure = {
  [element: string]: {
    count: number;
    bonds: Array<{
      element: string;
      count: number;
      bondOrder: number;
    }>;
  };
};

const MOLECULE_STRUCTURES: { [name: string]: MoleculeStructure } = {
  'su': {
    'O': {
      count: 1,
      bonds: [
        { element: 'H', count: 2, bondOrder: 1 }
      ]
    },
    'H': {
      count: 2,
      bonds: [
        { element: 'O', count: 1, bondOrder: 1 }
      ]
    }
  },
  'amonyak': {
    'N': {
      count: 1,
      bonds: [
        { element: 'H', count: 3, bondOrder: 1 }
      ]
    },
    'H': {
      count: 3,
      bonds: [
        { element: 'N', count: 1, bondOrder: 1 }
      ]
    }
  },
  'metan': {
    'C': {
      count: 1,
      bonds: [
        { element: 'H', count: 4, bondOrder: 1 }
      ]
    },
    'H': {
      count: 4,
      bonds: [
        { element: 'C', count: 1, bondOrder: 1 }
      ]
    }
  }
};

// Molekülün doğru yapıda olup olmadığını kontrol eder
export const validateMoleculeStructure = (atoms: Atom[], bonds: Bond[]): { isValid: boolean; message: string } => {
  // Atom sayılarını say
  const atomCounts: { [element: string]: number } = {};
  atoms.forEach(atom => {
    atomCounts[atom.element] = (atomCounts[atom.element] || 0) + 1;
  });

  // Bağları say
  const bondCounts: { [element: string]: { [bondedElement: string]: number } } = {};
  
  // Başlangıçta tüm atomlar için boş bir obje oluştur
  atoms.forEach(atom => {
    if (!bondCounts[atom.element]) {
      bondCounts[atom.element] = {};
    }
  });

  // Bağları say
  bonds.forEach(bond => {
    const atom1 = atoms.find(a => a.id === bond.from);
    const atom2 = atoms.find(a => a.id === bond.to);
    
    if (atom1 && atom2) {
      if (!bondCounts[atom1.element][atom2.element]) {
        bondCounts[atom1.element][atom2.element] = 0;
      }
      if (!bondCounts[atom2.element][atom1.element]) {
        bondCounts[atom2.element][atom1.element] = 0;
      }
      
      bondCounts[atom1.element][atom2.element] += bond.order;
      bondCounts[atom2.element][atom1.element] += bond.order;
    }
  });

  // Molekül yapısını kontrol et
  for (const [moleculeName, structure] of Object.entries(MOLECULE_STRUCTURES)) {
    let match = true;
    
    // Atom sayılarını kontrol et
    for (const [element, data] of Object.entries(structure)) {
      if (atomCounts[element] !== data.count) {
        match = false;
        break;
      }
    }
    
    if (!match) continue;
    
    // Bağ yapılarını kontrol et
    for (const [element, data] of Object.entries(structure)) {
      for (const bond of data.bonds) {
        const bondedElement = bond.element;
        const expectedCount = bond.count;
        const actualCount = bondCounts[element]?.[bondedElement] || 0;
        
        if (actualCount !== expectedCount) {
          match = false;
          break;
        }
      }
      if (!match) break;
    }
    
    if (match) {
      return { isValid: true, message: `Doğru! Bu bir ${moleculeName} molekülüdür.` };
    }
  }
  
  return { 
    isValid: false, 
    message: 'Bu molekül bilinen bir yapıya uymuyor.' 
  };
};

export const calculateBondOrder = (atom1: Atom, atom2: Atom): number => {
  // Hydrogen can only form single bonds
  if ((atom1.element === 'H' && atom2.element !== 'H') || 
      (atom2.element === 'H' && atom1.element !== 'H')) {
    return 1;
  }

  // C-O bağları tekli veya ikili olabilir
  if ((atom1.element === 'C' && atom2.element === 'O') ||
      (atom1.element === 'O' && atom2.element === 'C')) {
    return 1;
  }

  // C-C bağları tekli olmalı (şimdilik)
  if (atom1.element === 'C' && atom2.element === 'C') {
    return 1;
  }

  // N-H bağları tekli olmalı
  if ((atom1.element === 'N' && atom2.element === 'H') ||
      (atom1.element === 'H' && atom2.element === 'N')) {
    return 1;
  }

  // Diğer durumlar için varsayılan tekli bağ
  return 1;
};

export const isValidBond = (
  atom1: Atom,
  atom2: Atom,
  existingBonds: Bond[],
  proposedOrder: number = 1
): boolean => {
  try {
    console.log('isValidBond called with:', {
      atom1: { id: atom1.id, element: atom1.element },
      atom2: { id: atom2.id, element: atom2.element },
      proposedOrder,
      existingBondsCount: existingBonds.length
    });
    // Input validation
    if (!atom1 || !atom2 || !existingBonds) {
      console.error('Invalid input to isValidBond:', { atom1, atom2, existingBonds });
      return false;
    }

    // Check if atoms are the same
    if (atom1.id === atom2.id) {
      return false;
    }

    // Check if bond already exists between these atoms
    const existingBond = existingBonds.find(
      bond => (bond.from === atom1.id && bond.to === atom2.id) ||
             (bond.from === atom2.id && bond.to === atom1.id)
    );

    if (existingBond) {
      return false;
    }

    // Calculate current bond counts for each atom
    const currentBonds1 = existingBonds.reduce((sum, bond) => {
      return sum + ((bond.from === atom1.id || bond.to === atom1.id) ? bond.order : 0);
    }, 0);

    const currentBonds2 = existingBonds.reduce((sum, bond) => {
      return sum + ((bond.from === atom2.id || bond.to === atom2.id) ? bond.order : 0);
    }, 0);

    // Get max bonds for each atom type
    const maxBonds1 = (atom1.element in MAX_BONDS) ? MAX_BONDS[atom1.element as keyof typeof MAX_BONDS] : 0;
    const maxBonds2 = (atom2.element in MAX_BONDS) ? MAX_BONDS[atom2.element as keyof typeof MAX_BONDS] : 0;

    // Check if adding this bond would exceed max bonds for either atom
    if (currentBonds1 + proposedOrder > maxBonds1 ||
        currentBonds2 + proposedOrder > maxBonds2) {
      return false;
    }

    // Special case for hydrogen - can only form single bonds
    if ((atom1.element === 'H' || atom2.element === 'H') && proposedOrder !== 1) {
      return false;
    }

    // Special case for oxygen - can't form triple bonds
    if ((atom1.element === 'O' || atom2.element === 'O') && proposedOrder > 2) {
      return false;
    }

    // Special case for H-O bonds - should be single bonds only
    if ((atom1.element === 'H' && atom2.element === 'O') || 
        (atom1.element === 'O' && atom2.element === 'H')) {
      return proposedOrder === 1;
    }

    return true;
  } catch (error) {
    console.error('Bond validation error:', error, { 
      atom1: atom1?.element, 
      atom2: atom2?.element,
      proposedOrder,
      existingBonds: existingBonds?.length
    });
    return false;
  }
};

type AtomCount = Record<string, number>;

const parseFormula = (formula: string): AtomCount => {
  const atomCounts: AtomCount = {};
  let currentElement = '';
  let currentCount = '';

  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];
    if (char >= 'A' && char <= 'Z') {
      if (currentElement) {
        const count = currentCount ? parseInt(currentCount) : 1;
        atomCounts[currentElement] = (atomCounts[currentElement] || 0) + count;
        currentCount = '';
      }
      currentElement = char;
    } else if (char >= 'a' && char <= 'z') {
      currentElement += char;
    } else if (char >= '0' && char <= '9' || char === '₀' || char === '₁' || char === '₂' || char === '₃' || char === '₄' || char === '₅' || char === '₆' || char === '₇' || char === '₈' || char === '₉') {
      const normalizedChar = char.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => {
        const subscriptToNumber: Record<string, string> = {
          '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
          '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
        };
        return subscriptToNumber[c] || c;
      });
      currentCount += normalizedChar;
    }
  }

  if (currentElement) {
    const count = currentCount ? parseInt(currentCount) : 1;
    atomCounts[currentElement] = (atomCounts[currentElement] || 0) + count;
  }

  return atomCounts;
};

const countAtoms = (atoms: Array<{ element: string }>): AtomCount => {
  return atoms.reduce((counts: AtomCount, atom) => {
    counts[atom.element] = (counts[atom.element] || 0) + 1;
    return counts;
  }, {});
};

const validateBondConnectivity = (
  atoms: Array<{ id: string; element: string }>,
  bonds: Array<{ from: string; to: string }>
): boolean => {
  if (atoms.length === 0) return false;
  if (atoms.length === 1) return bonds.length === 0;

  // Bağlantı grafiğini oluştur
  const graph: Record<string, Set<string>> = {};
  atoms.forEach(atom => {
    graph[atom.id] = new Set();
  });

  bonds.forEach(bond => {
    graph[bond.from].add(bond.to);
    graph[bond.to].add(bond.from);
  });

  // DFS ile bağlantıyı kontrol et
  const visited = new Set<string>();
  const startId = atoms[0].id;
  
  function dfs(id: string) {
    visited.add(id);
    for (const neighborId of graph[id]) {
      if (!visited.has(neighborId)) {
        dfs(neighborId);
      }
    }
  }

  dfs(startId);

  // Tüm atomlar ziyaret edildi mi?
  return visited.size === atoms.length;
};

export const validateMolecule = (
  formula: string,
  atoms: Array<{ id: string; element: string }>,
  bonds: Array<{ from: string; to: string; order: number }>
): boolean => {
  // 1. Atom sayılarını kontrol et
  const targetCounts = parseFormula(formula);
  const actualCounts = countAtoms(atoms);

  for (const element in targetCounts) {
    if (actualCounts[element] !== targetCounts[element]) {
      return false;
    }
  }

  // 2. Her atomun bağ sayısını kontrol et
  const atomBonds: Record<string, number> = {};
  atoms.forEach(atom => {
    atomBonds[atom.id] = 0;
    // Eğer atom MAX_BONDS'ta tanımlı değilse hata ver
    if (!(atom.element in MAX_BONDS)) {
      console.error(`Bilinmeyen element: ${atom.element}, bağ sayısı kontrol edilemiyor`);
      return false;
    }
  });

  // Her atomun bağlarını ve bağlantılarını kaydet
  const atomConnections: Record<string, Set<string>> = {};
  atoms.forEach(atom => {
    atomConnections[atom.id] = new Set();
  });

  bonds.forEach(bond => {
    atomBonds[bond.from] += bond.order;
    atomBonds[bond.to] += bond.order;
    atomConnections[bond.from].add(bond.to);
    atomConnections[bond.to].add(bond.from);
  });

  // Her atomun bağ sayısı maksimum değeri aşmamalı
  for (const atom of atoms) {
    const maxBonds = (atom.element in MAX_BONDS) ? MAX_BONDS[atom.element as keyof typeof MAX_BONDS] : 0;
    if (atomBonds[atom.id] > maxBonds) {
      return false;
    }
  }

  // 3. Molekülün bağlantılı olup olmadığını kontrol et
  const visited = new Set<string>();
  const startAtom = atoms[0]?.id;
  if (!startAtom) return false;

  function dfs(atomId: string) {
    visited.add(atomId);
    for (const connectedAtom of atomConnections[atomId]) {
      if (!visited.has(connectedAtom)) {
        dfs(connectedAtom);
      }
    }
  }

  dfs(startAtom);
  
  // Tüm atomlar ziyaret edildi mi?
  return visited.size === atoms.length;
};