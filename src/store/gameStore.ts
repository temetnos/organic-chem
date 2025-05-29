import { create } from 'zustand';
import type { Atom, Bond, Challenge, MoleculeStructure } from '../types/molecule';
import { validateMolecule, MAX_BONDS } from '../utils/chemistryRules';
import { challenges } from '../data/challenges';

interface GameState {
  atoms: Atom[];
  bonds: Bond[];
  selectedTool: 'H' | 'B' | 'C' | 'N' | 'O' | 'F' | 'Na' | 'Mg' | 'P' | 'S' | 'Cl' | 'K' | 'Ca' | 'Fe' | 'Co' | 'Cu' | 'Zn' | 'Br' | 'I' | 'Si' | 'Se' | 'single-bond' | 'double-bond' | 'triple-bond' | 'move' | 'delete' | 'clear' | 'template' | null;
  selectedAtomId: string | null;
  selectedStructure: MoleculeStructure | null;
  currentChallenge: Challenge | null;
  currentChallengeIndex: number;
  score: number;
  timer: number;
  isComplete: boolean;
  isDragging: boolean;
  showFormula: boolean;
  gameStarted: boolean;
  language: 'en' | 'tr';
  gameFinished: boolean;
  wasAutoSolved: boolean; // Flag to track if the current challenge was auto-solved
  challenges: Challenge[];
  selectedDifficulty: 'random' | 'easy' | 'medium' | 'hard' | null;
  playedChallenges: Set<string>;
  moleculeStats: {
    [key: string]: {
      completed: boolean;
      score: number;
      usedShowFormula: boolean;
      skipped: boolean;
    };
  };
  addAtom: (element: Atom['element'], x: number, y: number) => string; // Returns the new atom's ID
  addBond: (fromId: string, toId: string, order?: 1 | 2 | 3) => void;
  addStructure: (structure: MoleculeStructure, x?: number, y?: number) => void;
  moveAtom: (id: string, x: number, y: number) => void;
  deleteAtom: (id: string) => void;
  setSelectedTool: (tool: GameState['selectedTool']) => void;
  setSelectedAtomId: (id: string | null) => void;
  setSelectedStructure: (structure: MoleculeStructure | null) => void;
  setChallenge: (challenge: Challenge) => void;
  nextChallenge: () => void;
  skipChallenge: () => void;
  updateScore: (points: number) => void;
  updateTimer: () => void;
  setIsDragging: (dragging: boolean) => void;
  toggleFormula: () => void;
  checkCompletion: () => void;
  resetLevel: () => void;
  startGame: (difficulty: 'random' | 'easy' | 'medium' | 'hard' | undefined) => void;
  setLanguage: (lang: 'en' | 'tr') => void;
  getTotalPossibleScore: () => number;
  getCompletionStats: () => {
    totalScore: number;
    completedChallenges: number;
    totalChallenges: number;
    skippedChallenges: number;
    showFormulaUsed: number;
  };
  clearCanvas: () => void;
  solveChallenge: () => void;
}

function calculateChallengeScore(difficulty: string): number {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 20;
    case 'hard':
      return 30;
    default:
      return 10;
  }
}

function filterChallengesByDifficulty(difficulty: 'random' | 'easy' | 'medium' | 'hard'): Challenge[] {
  if (difficulty === 'random') return [...challenges];
  return challenges.filter((challenge: Challenge) => challenge.difficulty === difficulty);
}

export const useGameStore = create<GameState>((set, get) => ({
  atoms: [],
  bonds: [],
  selectedTool: null,
  selectedAtomId: null,
  selectedStructure: null,
  currentChallenge: null,
  currentChallengeIndex: 0,
  score: 0,
  timer: 0,
  isComplete: false,
  isDragging: false,
  showFormula: false,
  gameStarted: false,
  language: 'en',
  gameFinished: false,
  wasAutoSolved: false,
  challenges: [...challenges],
  selectedDifficulty: null,
  playedChallenges: new Set<string>(),
  moleculeStats: {},

  addAtom: (element, x, y) => {
    const newAtom: Atom = {
      id: Math.random().toString(36).substr(2, 9),
      element,
      x,
      y
    };

    set(state => ({
      atoms: [...state.atoms, newAtom],
      selectedAtomId: null
    }));
    
    return newAtom.id; // Return the new atom's ID
  },

  addBond: (fromId, toId, order = 1) => {
    try {
      const state = get();
      const { atoms, bonds } = state;
      
      console.log('addBond called:', { fromId, toId, order, atoms, bonds });
      
      const atom1 = atoms.find(a => a.id === fromId);
      const atom2 = atoms.find(a => a.id === toId);
      
      if (!atom1 || !atom2) {
        console.error('Bağ oluşturulamadı: Atomlar bulunamadı', { fromId, toId, atom1, atom2 });
        return;
      }

      // Aynı atoma bağ oluşturmayı engelle
      if (fromId === toId) {
        console.error('Bir atom kendisiyle bağ oluşturamaz');
        return;
      }

      // Aynı atomlar arasında zaten bir bağ var mı kontrol et
      const existingBond = bonds.find(b => 
        (b.from === fromId && b.to === toId) || 
        (b.from === toId && b.to === fromId)
      );
      
      if (existingBond) {
        console.log('Bu atomlar zaten bağlı');
        return;
      }

      // Bağ doğrulamasını yap (bağ sırasını dikkate alarak)
      const calculateBondCount = (atomId: string) => {
        return bonds
          .filter(b => b.from === atomId || b.to === atomId)
          .reduce((sum, bond) => sum + bond.order, 0);
      };

      const currentBondCount1 = calculateBondCount(fromId) + order;
      const currentBondCount2 = calculateBondCount(toId) + order;
      
      const maxBonds1 = MAX_BONDS[atom1.element as keyof typeof MAX_BONDS] || 0;
      const maxBonds2 = MAX_BONDS[atom2.element as keyof typeof MAX_BONDS] || 0;
      
      if (currentBondCount1 > maxBonds1) {
        console.error(`${atom1.element} atomu maksimum bağ kapasitesini aşıyor (${currentBondCount1}/${maxBonds1})`);
        return;
      }
      
      if (currentBondCount2 > maxBonds2) {
        console.error(`${atom2.element} atomu maksimum bağ kapasitesini aşıyor (${currentBondCount2}/${maxBonds2})`);
        return;
      }

      const newBond: Bond = {
        id: Math.random().toString(36).substr(2, 9),
        from: fromId,
        to: toId,
        order: order as 1 | 2 | 3
      };

      set(state => ({
        bonds: [...state.bonds, newBond],
        selectedAtomId: null
      }));

      get().checkCompletion();
    } catch (error) {
      console.error('Bağ oluşturma hatası:', error);
    }
  },

  addStructure: (structure: MoleculeStructure, x = 0, y = 0) => {
    try {
      const timeOffset = Date.now();
      const idMap = new Map<string, string>();
      
      // Önce atomları ekle
      const newAtoms = structure.atoms.map(atom => {
        const newId = `${timeOffset}_${atom.id}`;
        idMap.set(atom.id, newId);
        return {
          ...atom,
          id: newId,
          x: atom.x + x,
          y: atom.y + y,
        };
      });

      // Bağları oluştur (null değerleri filtrele)
      const newBonds = structure.bonds
        .map(bond => {
          const fromId = idMap.get(bond.from);
          const toId = idMap.get(bond.to);
          
          if (!fromId || !toId) {
            console.error('Invalid bond reference:', { from: bond.from, to: bond.to });
            return null;
          }
          
          return {
            ...bond,
            id: `${timeOffset}_${bond.id}`,
            from: fromId,
            to: toId,
          };
        })
        .filter((bond): bond is Bond => bond !== null);

      // Tüm değişiklikleri tek seferde uygula
      set(state => ({
        atoms: [...state.atoms, ...newAtoms],
        bonds: [...state.bonds, ...newBonds],
      }));
    } catch (error) {
      console.error('Error adding structure:', error);
    }
  },

  moveAtom: (id, x, y) => {
    set(state => ({
      atoms: state.atoms.map(atom =>
        atom.id === id ? { ...atom, x, y } : atom
      )
    }));
  },

  deleteAtom: (id) => {
    set(state => {
      // Önce atomu sil
      const newAtoms = state.atoms.filter(atom => atom.id !== id);
      
      // Sonra bu atoma bağlı tüm bağları sil
      const newBonds = state.bonds.filter(bond => 
        bond.from !== id && bond.to !== id
      );

      return {
        atoms: newAtoms,
        bonds: newBonds,
        selectedAtomId: null,
        selectedTool: null
      };
    });

    get().checkCompletion();
  },

  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedAtomId: (id) => set({ selectedAtomId: id }),
  setSelectedStructure: (structure) => set({ selectedStructure: structure }),

  setChallenge: (challenge) => {
    set({
      currentChallenge: challenge,
      atoms: [],
      bonds: [],
      isComplete: false,
      showFormula: false
    });
  },

  nextChallenge: () => {
    const state = get();
    
    // Use the current challenges array if available, otherwise filter by difficulty
    const currentChallenges = state.challenges?.length > 0 
      ? state.challenges 
      : filterChallengesByDifficulty(state.selectedDifficulty || 'easy');
    
    if (currentChallenges.length === 0) {
      set({ 
        gameFinished: true, 
        gameStarted: true, // Keep gameStarted as true to show GameStats
        currentChallenge: null,
        currentChallengeIndex: -1,
        isComplete: false
      });
      return;
    }

    // For random difficulty, select a random challenge that hasn't been played yet
    if (state.selectedDifficulty === 'random') {
      const unplayedChallenges = currentChallenges.filter(
        challenge => !state.playedChallenges.has(challenge.id)
      );

      if (unplayedChallenges.length === 0) {
        // All challenges have been played, finish the game
        set({ 
          gameFinished: true, 
          gameStarted: true, // Keep gameStarted as true to show GameStats
          currentChallenge: null,
          currentChallengeIndex: -1,
          isComplete: false
        });
        return;
      }

      // Select a random unplayed challenge
      const randomIndex = Math.floor(Math.random() * unplayedChallenges.length);
      const nextChallenge = unplayedChallenges[randomIndex];
      const nextIndex = currentChallenges.findIndex(c => c.id === nextChallenge.id);

      set(state => ({
        currentChallengeIndex: nextIndex,
        currentChallenge: nextChallenge,
        playedChallenges: new Set(state.playedChallenges).add(nextChallenge.id),
        atoms: [],
        bonds: [],
        selectedTool: null,
        selectedAtomId: null,
        isComplete: false,
        showFormula: false,
        gameStarted: true,
        gameFinished: false
      }));
      return;
    }
    
    // For non-random difficulties, use the existing logic
    const nextIndex = (state.currentChallengeIndex ?? -1) + 1;
    
    // Check if we've reached the end of the challenges
    if (nextIndex >= currentChallenges.length) {
      // Check if we have any missed challenges
      const missedChallenges = currentChallenges.filter(challenge => 
        !state.moleculeStats[challenge.id]?.completed && 
        !state.moleculeStats[challenge.id]?.skipped
      );
      
      if (missedChallenges.length > 0) {
        // If we have missed challenges, go back to the first one
        const firstMissedChallenge = missedChallenges[0];
        const firstMissedIndex = currentChallenges.findIndex(
          c => c.id === firstMissedChallenge.id
        );
        
        set(state => ({
          currentChallengeIndex: firstMissedIndex,
          currentChallenge: currentChallenges[firstMissedIndex],
          playedChallenges: new Set(state.playedChallenges).add(currentChallenges[firstMissedIndex].id),
          atoms: [],
          bonds: [],
          selectedTool: null,
          selectedAtomId: null,
          isComplete: false,
          showFormula: false,
          gameStarted: true,
          gameFinished: false
        }));
      } else {
        // No more challenges to complete, finish the game
        set({ 
          gameFinished: true, 
          gameStarted: true, // Keep gameStarted as true to show GameStats
          currentChallenge: null,
          currentChallengeIndex: -1,
          isComplete: false
        });
      }
      return;
    }
    
    // Move to the next challenge in sequence
    set(state => ({
      currentChallengeIndex: nextIndex,
      currentChallenge: currentChallenges[nextIndex],
      playedChallenges: new Set(state.playedChallenges).add(currentChallenges[nextIndex].id),
      atoms: [],
      bonds: [],
      selectedTool: null,
      selectedAtomId: null,
      isComplete: false,
      showFormula: false,
      gameStarted: true,
      gameFinished: false
    }));
  },

  skipChallenge: () => {
    const state = get();
    if (state.currentChallenge) {
      set(state => ({
        moleculeStats: {
          ...state.moleculeStats,
          [state.currentChallenge!.id]: {
            completed: false,
            score: 0,
            usedShowFormula: state.showFormula,
            skipped: true
          }
        }
      }));
    }
    get().nextChallenge();
  },

  updateScore: (points) => set(state => ({ score: state.score + points })),
  updateTimer: () => set(state => ({ timer: state.timer + 1 })),
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  toggleFormula: () => set(state => ({ showFormula: !state.showFormula })),

  checkCompletion: () => {
    const state = get();
    if (!state.currentChallenge || state.wasAutoSolved) return; // Skip if auto-solved

    const isValid = validateMolecule(
      state.currentChallenge.formula,
      state.atoms,
      state.bonds
    );

    if (isValid && !state.isComplete) {
      const baseScore = calculateChallengeScore(state.currentChallenge.difficulty);
      const finalScore = state.showFormula ? Math.floor(baseScore / 2) : baseScore;

      set(state => ({
        isComplete: true,
        score: state.score + finalScore,
        moleculeStats: {
          ...state.moleculeStats,
          [state.currentChallenge!.id]: {
            completed: true,
            score: finalScore,
            usedShowFormula: state.showFormula,
            skipped: false
          }
        }
      }));
    }
  },

  resetLevel: () => {
    set({
      atoms: [],
      bonds: [],
      selectedTool: null,
      selectedAtomId: null,
      selectedStructure: null,
      isComplete: false,
      showFormula: false,
      wasAutoSolved: false, // Reset the auto-solved flag
    });
  },

  startGame: (difficulty: 'random' | 'easy' | 'medium' | 'hard' | undefined = undefined) => {
    if (!difficulty) {
      set({
        currentChallenge: null,
        currentChallengeIndex: -1,
        score: 0,
        timer: 0,
        atoms: [],
        bonds: [],
        selectedTool: null,
        selectedAtomId: null,
        isComplete: false,
        showFormula: false,
        gameStarted: false,
        gameFinished: false,
        selectedDifficulty: null,
      });
      return;
    }

    // Check for custom challenges in session storage
    const customChallengesJson = sessionStorage.getItem('customChallenges');
    let challengesToUse = filterChallengesByDifficulty(difficulty);
    let isCustomGame = false;
    
    if (customChallengesJson) {
      try {
        const customChallenges = JSON.parse(customChallengesJson);
        if (Array.isArray(customChallenges) && customChallenges.length > 0) {
          challengesToUse = customChallenges;
          isCustomGame = true;
          // Clear the custom challenges from session storage after using them
          sessionStorage.removeItem('customChallenges');
        }
      } catch (error) {
        console.error('Error parsing custom challenges:', error);
      }
    }

    if (challengesToUse.length === 0) {
      console.error('No challenges found for the selected difficulty');
      return;
    }

    // For random difficulty, select a random challenge
    const initialChallengeIndex = difficulty === 'random' 
      ? Math.floor(Math.random() * challengesToUse.length)
      : 0;

    set((state) => {
      // Reset the playedChallenges set and add the first challenge
      const newPlayedChallenges = new Set<string>();
      newPlayedChallenges.add(challengesToUse[initialChallengeIndex].id);
      
      // Keep the existing moleculeStats when starting a new game with missed challenges
      const newMoleculeStats = isCustomGame 
        ? { ...state.moleculeStats } 
        : {};
      
      return {
        ...state,
        currentChallenge: challengesToUse[initialChallengeIndex],
        currentChallengeIndex: initialChallengeIndex,
        challenges: [...challengesToUse],
        playedChallenges: newPlayedChallenges,
        moleculeStats: newMoleculeStats, // Preserve existing stats
        score: 0, // Reset score for the new game
        timer: 0, // Reset timer for the new game
        atoms: [],
        bonds: [],
        selectedTool: null,
        selectedAtomId: null,
        isComplete: false,
        showFormula: false,
        gameStarted: true,
        gameFinished: false,
        selectedDifficulty: difficulty,
      };
    });
  },

  getCompletionStats: () => {
    const { moleculeStats } = get();
    const completedChallenges = Object.values(moleculeStats).filter(stat => stat.completed).length;
    const totalChallenges = challenges.length;
    const skippedChallenges = Object.values(moleculeStats).filter(stat => stat.skipped).length;
    const showFormulaUsed = Object.values(moleculeStats).filter(stat => stat.usedShowFormula).length;
    const totalScore = Object.values(moleculeStats).reduce((sum, stat) => sum + stat.score, 0);
    
    return {
      totalScore,
      completedChallenges,
      totalChallenges,
      skippedChallenges,
      showFormulaUsed
    };
  },
  
  clearCanvas: () => {
    set({
      atoms: [],
      bonds: [],
      selectedTool: null,
      selectedAtomId: null,
      selectedStructure: null,
      isDragging: false,
    });
  },
  
  setLanguage(lang: 'en' | 'tr') {
    // Save language preference to localStorage
    localStorage.setItem('userLanguage', lang);
    set({ language: lang });
  },
  
  getTotalPossibleScore: () => {
    const { challenges, selectedDifficulty } = get();
    if (!selectedDifficulty) return 0;
    const filtered = filterChallengesByDifficulty(selectedDifficulty);
    return filtered.length * 30; // Max 30 points per challenge
  },
  
  solveChallenge: () => {
    const { currentChallenge } = get();
    if (!currentChallenge) return;
    
    // Clear the canvas first
    get().clearCanvas();
    
    if (currentChallenge.targetStructure.atoms.length === 0) return;
    
    // Calculate molecule bounds
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    currentChallenge.targetStructure.atoms.forEach(atom => {
      minX = Math.min(minX, atom.x);
      minY = Math.min(minY, atom.y);
      maxX = Math.max(maxX, atom.x);
      maxY = Math.max(maxY, atom.y);
    });
    
    const moleculeWidth = maxX - minX || 100; // Default width if all x's are same
    const moleculeHeight = maxY - minY || 100; // Default height if all y's are same
    const moleculeCenterX = minX + moleculeWidth / 2;
    const moleculeCenterY = minY + moleculeHeight / 2;
    
    // Get the container dimensions
    const container = document.querySelector('.relative.w-full.h-full.flex.flex-col');
    const containerWidth = container?.clientWidth || window.innerWidth;
    const containerHeight = container?.clientHeight || window.innerHeight;
    
    // Calculate center of the visible area (accounting for padding)
    const canvasCenterX = containerWidth / 2;
    const canvasCenterY = containerHeight / 2;
    
    // First add all atoms with adjusted positions
    const atomIdMap: {[key: string]: string} = {};
    
    // Calculate scale based on molecule size and available space
    const padding = 40; // Minimum padding from edges
    const maxScale = 3; // Maximum scale factor
    const scale = Math.min(
      maxScale,
      (containerWidth - 2 * padding) / (moleculeWidth || 1),
      (containerHeight - 2 * padding) / (moleculeHeight || 1)
    );

    // Create a map of atom IDs to their elements
    const atomElements: {[key: string]: string} = {};
    currentChallenge.targetStructure.atoms.forEach(atom => {
      atomElements[atom.id] = atom.element;
    });

    // First pass: add all atoms
    currentChallenge.targetStructure.atoms.forEach((atom) => {
      const offsetX = (atom.x - moleculeCenterX) * scale;
      const offsetY = (atom.y - moleculeCenterY) * scale;
      const newX = canvasCenterX + offsetX;
      const newY = canvasCenterY + offsetY;
      
      const newId = get().addAtom(atom.element, newX, newY);
      atomIdMap[atom.id] = newId;
    });
    
    // Second pass: add all bonds
    currentChallenge.targetStructure.bonds.forEach((bond) => {
      const fromId = atomIdMap[bond.from];
      const toId = atomIdMap[bond.to];
      if (fromId && toId) {
        get().addBond(fromId, toId, bond.order || 1);
      }
    });

    // Third pass: ensure all atoms have correct valence by adding hydrogens if needed
    const state = get();
    state.atoms.forEach(atom => {
      if (atom.element === 'C') {
        // Get all bonds for this carbon
        const bonds = state.bonds.filter(b => b.from === atom.id || b.to === atom.id);
        const bondCount = bonds.reduce((count, bond) => count + (bond.order || 1), 0);
        
        // Add hydrogens if needed (carbon wants 4 bonds)
        const hydrogensNeeded = Math.max(0, 4 - bondCount);
        if (hydrogensNeeded > 0) {
          // Calculate angles of existing bonds to avoid placing hydrogens there
          const existingAngles: number[] = [];
          
          // Get angles and types of existing bonds
          const bondInfo: {angle: number, order: number}[] = [];
          bonds.forEach(bond => {
            const otherAtomId = bond.from === atom.id ? bond.to : bond.from;
            const otherAtom = state.atoms.find(a => a.id === otherAtomId);
            if (otherAtom) {
              const dx = otherAtom.x - atom.x;
              const dy = otherAtom.y - atom.y;
              const angle = Math.atan2(dy, dx);
              bondInfo.push({angle, order: bond.order || 1});
            }
          });
          
          // Sort bonds by angle for easier processing
          bondInfo.sort((a, b) => a.angle - b.angle);
          
          // Create a list of occupied angles with their "widths" based on bond order
          const occupiedAngles: {angle: number, width: number}[] = [];
          bondInfo.forEach(({angle, order}) => {
            const width = 0.5 + (order - 1) * 0.25; // Wider angle for multiple bonds
            occupiedAngles.push({angle, width});
            // Add some extra space around multiple bonds
            if (order > 1) {
              occupiedAngles.push({angle: angle + 0.3, width: 0.1});
              occupiedAngles.push({angle: angle - 0.3, width: 0.1});
            }
          });
          
          // Function to check if an angle is too close to existing bonds
          const isAngleAvailable = (angle: number) => {
            const minGap = Math.PI / 3; // 60 degrees minimum between bonds
            return !occupiedAngles.some(({angle: occupiedAngle, width}) => {
              const diff = Math.abs(angle - occupiedAngle);
              const normalizedDiff = Math.min(diff, 2 * Math.PI - diff);
              return normalizedDiff < minGap + width;
            });
          };
          
          // Try to find good angles for hydrogens
          const hydrogenAngles: number[] = [];
          const candidateAngles: number[] = [];
          
          // First, try positions between existing bonds
          for (let i = 0; i < bondInfo.length; i++) {
            const current = bondInfo[i];
            const next = bondInfo[(i + 1) % bondInfo.length];
            
            // Calculate the gap between bonds
            let gap = (next.angle - current.angle + 2 * Math.PI) % (2 * Math.PI);
            
            // If there's enough space for at least one hydrogen
            if (gap > Math.PI / 2) { // 90 degrees minimum
              // Try to place hydrogen in the middle of the gap
              let angle = (current.angle + gap/2) % (2 * Math.PI);
              if (isAngleAvailable(angle)) {
                candidateAngles.push(angle);
              }
              
              // If it's a very large gap, try to place two hydrogens
              if (gap > Math.PI) { // 180 degrees
                const angle1 = (current.angle + gap/3) % (2 * Math.PI);
                const angle2 = (current.angle + 2*gap/3) % (2 * Math.PI);
                if (isAngleAvailable(angle1)) candidateAngles.push(angle1);
                if (isAngleAvailable(angle2)) candidateAngles.push(angle2);
              }
            }
          }
          
          // If we still need more positions, try evenly spaced positions
          let angle = 0;
          while (candidateAngles.length < hydrogensNeeded * 2 && angle < 2 * Math.PI) {
            if (isAngleAvailable(angle)) {
              candidateAngles.push(angle);
            }
            angle += Math.PI / 4; // Try every 45 degrees
          }
          
          // Sort candidates by quality (prefer positions between existing bonds)
          candidateAngles.sort((angleA, angleB) => {
            // Calculate minimum distance for angle A
            const minDistA = Math.min(...occupiedAngles.map(({angle: a2}) => {
              const diff = Math.abs(angleA - a2);
              return Math.min(diff, 2 * Math.PI - diff);
            }));
            
            // Calculate minimum distance for angle B
            const minDistB = Math.min(...occupiedAngles.map(({angle: b2}) => {
              const diff = Math.abs(angleB - b2);
              return Math.min(diff, 2 * Math.PI - diff);
            }));
            
            return minDistB - minDistA; // Prefer larger minimum distances
          });
          
          // Take the best angles first
          hydrogenAngles.push(...candidateAngles.slice(0, hydrogensNeeded));
          
          // If we still don't have enough, just add any angle
          while (hydrogenAngles.length < hydrogensNeeded) {
            const angle = Math.random() * 2 * Math.PI;
            hydrogenAngles.push(angle);
          }
          
          // Add the hydrogens
          const radius = 40; // Slightly shorter bonds for hydrogens
          hydrogenAngles.slice(0, hydrogensNeeded).forEach(angle => {
            const hX = atom.x + Math.cos(angle) * radius;
            const hY = atom.y + Math.sin(angle) * radius;
            const hId = get().addAtom('H', hX, hY);
            get().addBond(atom.id, hId, 1);
          });
        }
      }
    });
    
    // Mark as solved with penalty
    set(state => ({
      score: Math.max(0, state.score - 5), // Deduct 5 points, but don't go below 0
      isComplete: true,
      wasAutoSolved: true, // Set the auto-solved flag
      moleculeStats: {
        ...state.moleculeStats,
        [currentChallenge.id]: {
          ...state.moleculeStats[currentChallenge.id],
          completed: true,
          score: -5,
          usedShowFormula: true,
          skipped: false
        }
      }
    }));
  },
}));