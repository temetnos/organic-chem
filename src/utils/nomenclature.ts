import { Atom, Bond } from '../types/molecule';

// ===== SABİTLER =====
// Zincir uzunluğu önekleri (alkanlar için)
const CHAIN_PREFIXES: { [key: number]: string } = {
  1: 'met',
  2: 'et',
  3: 'prop',
  4: 'but',
  5: 'pent',
  6: 'hekz',
  7: 'hept',
  8: 'okt',
  9: 'non',
  10: 'dek'
};

// Fonksiyonel grup öncelikleri (düşük sayı = yüksek öncelik)
const FUNCTIONAL_GROUP_PRIORITIES = {
  'carboxylic acid': 1,
  'ester': 2,
  'amide': 3,
  'nitrile': 4,
  'aldehyde': 5,
  'ketone': 6,
  'alcohol': 7,
  'amine': 8,
  'alkene': 9,
  'alkyne': 10,
  'alkane': 11
};

// ===== TİP TANIMLAMALARI =====
/** 
 * Atom zincirini temsil eden arayüz 
 * @future Kullanılacak
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AtomChain {
  id: string;
  element: string;
  position: number;
}

/** Fonksiyonel grup bilgisini tutan arayüz */
interface FunctionalGroup {
  type: string;
  position: number;
}

/** Çoklu bağ bilgisini tutan arayüz */
interface MultipleBond {
  position: number;
  order: number;
}

// ===== YARDIMCI FONKSİYONLAR =====

/**
 * Moleküldeki her bir atom türünün sayısını sayar
 */
const countAtoms = (atoms: Atom[]): Record<string, number> => 
  atoms.reduce<Record<string, number>>((counts, atom) => ({
    ...counts,
    [atom.element]: (counts[atom.element] || 0) + 1
  }), {});

/**
 * İki atom arasındaki bağ derecesini döndürür (bağ yoksa 0)
 */
const getBondOrder = (bonds: Bond[], fromId: string, toId: string): number => 
  bonds.find(b => 
    (b.from === fromId && b.to === toId) || 
    (b.to === fromId && b.from === toId)
  )?.order || 0;

/**
 * Belirtilen atoma bağlı tüm atom ID'lerini döndürür
 */
const getNeighbors = (bonds: Bond[], atomId: string): string[] => 
  bonds.reduce<string[]>((neighbors, bond) => {
    if (bond.from === atomId) neighbors.push(bond.to);
    if (bond.to === atomId) neighbors.push(bond.from);
    return neighbors;
  }, []);

/**
 * Verilen uzunluktaki karbon zinciri için temel ismi döndürür (örn. 1 için 'metan')
 */
const getBaseName = (length: number): string => 
  `${CHAIN_PREFIXES[length] || ''}an`;

/**
 * Halkalı yapı için önek döndürür (örn. 6 için 'siklohekz')
 */
const getCyclicPrefix = (length: number): string =>
  `siklo${CHAIN_PREFIXES[length] || ''}`;

/**
 * DFS kullanarak moleküler yapının çevrimsel olup olmadığını kontrol eder
 */
const isCyclicStructure = (atoms: Atom[], bonds: Bond[]): boolean => {
  if (atoms.length < 3) return false;
  
  const visited = new Set<string>();
  
  const hasCycle = (atomId: string, parentId: string | null, visited: Set<string>): boolean => {
    visited.add(atomId);
    
    for (const neighborId of getNeighbors(bonds, atomId)) {
      if (neighborId === parentId) continue;
      if (visited.has(neighborId) || hasCycle(neighborId, atomId, visited)) {
        return true;
      }
    }
    
    return false;
  };
  
  for (const atom of atoms) {
    if (!visited.has(atom.id) && hasCycle(atom.id, null, new Set())) {
      return true;
    }
  }
  
  return false;
};

/**
 * Molekülün benzen halkası olup olmadığını kontrol eder (C6H6, çift bağlarla)
 */
const isBenzeneRing = (atoms: Atom[], bonds: Bond[]): boolean => {
  const counts = countAtoms(atoms);
  if (counts['C'] !== 6 || counts['H'] !== 6) return false;
  
  const carbonAtoms = atoms.filter(a => a.element === 'C');
  if (carbonAtoms.length !== 6) return false;
  
  // Her karbonun tam olarak 2 başka karbona bağlı olduğunu kontrol et
  for (const carbon of carbonAtoms) {
    const neighbors = getNeighbors(bonds, carbon.id);
    const carbonNeighbors = neighbors.filter(id => 
      atoms.find(a => a.id === id)?.element === 'C'
    );
    
    if (carbonNeighbors.length !== 2) return false;
    
    // Tek ve çift bağların sıralı olduğunu kontrol et
    const bondOrders = carbonNeighbors.map(id => 
      getBondOrder(bonds, carbon.id, id)
    );
    
    if (!bondOrders.includes(1) || !bondOrders.includes(2)) return false;
  }
  
  return true;
};

/**
 * DFS kullanarak moleküldeki en uzun sürekli karbon zincirini bulur
 */
const findLongestCarbonChain = (atoms: Atom[], bonds: Bond[]): Atom[] => {
  const carbonAtoms = atoms.filter(a => a.element === 'C');
  if (carbonAtoms.length === 0) return [];
  
  let longestPath: Atom[] = [];
  
  const dfs = (current: Atom, visited: Set<string>, path: Atom[]) => {
    visited.add(current.id);
    const newPath = [...path, current];
    
    if (newPath.length > longestPath.length) {
      longestPath = newPath;
    }
    
    getNeighbors(bonds, current.id)
      .map(id => atoms.find(a => a.id === id))
      .filter((a): a is Atom => a !== undefined && a.element === 'C' && !visited.has(a.id))
      .forEach(neighbor => {
        dfs(neighbor, new Set(visited), newPath);
      });
  };
  
  // Her karbonu başlangıç noktası olarak dene
  carbonAtoms.forEach(atom => dfs(atom, new Set(), []));
  
  return longestPath;
};

/**
 * Moleküldeki fonksiyonel grupları tanımlar
 */
const findFunctionalGroups = (atoms: Atom[], bonds: Bond[]): FunctionalGroup[] => {
  const groups: FunctionalGroup[] = [];
  const atomMap = new Map(atoms.map(atom => [atom.id, atom]));
  
  // Her atomu fonksiyonel gruplar için kontrol et
  atoms.forEach((atom, index) => {
    // Hidroksil grubu (-OH) kontrolü
    if (atom.element === 'O') {
      const neighbors = getNeighbors(bonds, atom.id);
      if (neighbors.some(id => atomMap.get(id)?.element === 'H')) {
        groups.push({ type: 'alcohol', position: index + 1 });
      }
    }
    
    // Karbonil grubu (C=O) kontrolü
    if (atom.element === 'C') {
      const neighbors = getNeighbors(bonds, atom.id);
      if (neighbors.some(id => {
        const neighbor = atomMap.get(id);
        return neighbor?.element === 'O' && getBondOrder(bonds, atom.id, id) === 2;
      })) {
        groups.push({ type: 'ketone', position: index + 1 });
      }
      
      // Karboksilik asit (COOH) kontrolü
      if (hasCarboxylicAcid(atom, bonds, atomMap)) {
        groups.push({ type: 'carboxylic acid', position: index + 1 });
      }
    }
  });
  
  return groups;
};

/**
 * Karboksilik asit grubu kontrolü için yardımcı fonksiyon
 */
const hasCarboxylicAcid = (atom: Atom, bonds: Bond[], atomMap: Map<string, Atom>): boolean => {
  if (atom.element !== 'C') return false;
  
  const neighbors = getNeighbors(bonds, atom.id);
  const oxygenNeighbors = neighbors
    .map(id => ({
      id,
      element: atomMap.get(id)?.element,
      order: getBondOrder(bonds, atom.id, id)
    }))
    .filter(n => n.element === 'O');
  
  // Bir çift bağlı oksijen ve bir tek bağlı oksijen olmalı
  const hasDoubleBond = oxygenNeighbors.some(o => o.order === 2);
  const hasSingleBond = oxygenNeighbors.some(o => o.order === 1);
  
  return hasDoubleBond && hasSingleBond;
};

/**
 * Zincirdeki çoklu bağları bulur
 * @future Kullanılacak
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findMultipleBonds = (chain: Atom[], bonds: Bond[]): MultipleBond[] => {
  const multipleBonds: MultipleBond[] = [];
  
  for (let i = 0; i < chain.length - 1; i++) {
    const current = chain[i];
    const next = chain[i + 1];
    const bondOrder = getBondOrder(bonds, current.id, next.id);
    
    if (bondOrder > 1) {
      multipleBonds.push({
        position: i + 1, // 1 tabanlı pozisyon
        order: bondOrder
      });
    }
  }
  
  return multipleBonds;
};

/**
 * Fonksiyonel gruplar arasından en yüksek öncelikli olanı döndürür
 */
const getHighestPriorityGroup = (groups: FunctionalGroup[]): FunctionalGroup | undefined => {
  if (!groups.length) return undefined;
  
  return groups.reduce((highest, current) => {
    const currentPriority = FUNCTIONAL_GROUP_PRIORITIES[current.type as keyof typeof FUNCTIONAL_GROUP_PRIORITIES] || 999;
    const highestPriority = highest ? 
      FUNCTIONAL_GROUP_PRIORITIES[highest.type as keyof typeof FUNCTIONAL_GROUP_PRIORITIES] || 999 : 999;
      
    return currentPriority < highestPriority ? current : highest;
  });
};

// Özel durum: Basit iki atomlu moleküller
const getDiatomicMoleculeName = (atoms: Atom[]): string | null => {
  if (atoms.length !== 2) return null;
  
  const elements = atoms.map(a => a.element).sort().join('');
  const diatomicNames: Record<string, string> = {
    'HH': 'Hidrojen',
    'OO': 'Oksijen',
    'NN': 'Azot',
    'ClCl': 'Klor',
    'FF': 'Flor',
    'BrBr': 'Brom',
    'II': 'İyot'
  };
  
  return diatomicNames[elements] || null;
};

// ===== ANA FONKSİYON =====

export const getMoleculeName = (atoms: Atom[], bonds: Bond[]): string => {
  try {
    // Boş molekül kontrolü
    if (atoms.length === 0) return 'Boş Molekül';
    
    // Tek atom kontrolü
    if (atoms.length === 1) {
      return atoms[0].element === 'H' ? 'Hidrojen' : `${atoms[0].element} atomu`;
    }
    
    // İki atomlu molekül kontrolü
    const diatomicName = getDiatomicMoleculeName(atoms);
    if (diatomicName) return diatomicName;
    
    // Benzen halkası kontrolü
    if (isBenzeneRing(atoms, bonds)) {
      return 'Benzen';
    }
    
    // Halkalı yapı kontrolü
    if (isCyclicStructure(atoms, bonds)) {
      const carbonCount = atoms.filter(a => a.element === 'C').length;
      return `${getCyclicPrefix(carbonCount)}an`;
    }
    
    // Fonksiyonel grupları ve ana zinciri bul
    const functionalGroups = findFunctionalGroups(atoms, bonds);
    const mainChain = findLongestCarbonChain(atoms, bonds);
    
    // Karbon zinciri yoksa basit elementel bileşim döndür
    if (mainChain.length === 0) {
      const counts = countAtoms(atoms);
      return Object.entries(counts)
        .map(([element, count]) => `${element}${count > 1 ? count : ''}`)
        .join('');
    }
    
    // Zincir uzunluğuna göre temel ismi al
    let baseName = getBaseName(mainChain.length);
    
    // En yüksek öncelikli fonksiyonel grubu bul
    const mainGroup = getHighestPriorityGroup(functionalGroups);
    
    // Fonksiyonel gruplara göre soneci değiştir
    if (mainGroup) {
      switch (mainGroup.type) {
        case 'alcohol':
          baseName = baseName.replace('an', 'anol');
          break;
        case 'carboxylic acid':
          baseName = baseName.replace('an', 'anoik asit');
          break;
        case 'ketone':
          baseName = baseName.replace('an', 'anon');
          break;
        case 'alkene':
          baseName = baseName.replace('an', 'en');
          break;
        case 'alkyne':
          baseName = baseName.replace('an', 'in');
          break;
      }
    }
    
    return baseName;
    
  } catch (error) {
    console.error('Molekül ismi oluşturulurken hata:', error);
    return 'Bilinmeyen Molekül';
  }
};