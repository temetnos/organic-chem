import React, { createContext, useContext, useState, useCallback } from 'react';
import { MoleculeStructure, Atom, Bond } from '../types/molecule';

interface MoleculeEditorContextType {
  atoms: Atom[];
  bonds: Bond[];
  selectedAtom: string | null;
  addAtom: (element: string, x: number, y: number) => void;
  addBond: (from: string, to: string, order: number) => void;
  addStructure: (structure: MoleculeStructure) => void;
  setSelectedAtom: (id: string | null) => void;
  clearCanvas: () => void;
}

const MoleculeEditorContext = createContext<MoleculeEditorContextType | undefined>(undefined);

export const useMoleculeEditor = () => {
  const context = useContext(MoleculeEditorContext);
  if (!context) {
    throw new Error('useMoleculeEditor must be used within a MoleculeEditorProvider');
  }
  return context;
};

export const MoleculeEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [selectedAtom, setSelectedAtom] = useState<string | null>(null);

  const addAtom = useCallback((element: string, x: number, y: number) => {
    const newAtom: Atom = {
      id: `${Date.now()}`,
      element,
      x,
      y,
    };
    setAtoms((prev) => [...prev, newAtom]);
  }, []);

  const addBond = useCallback((from: string, to: string, order: number) => {
    const newBond: Bond = {
      id: `${Date.now()}`,
      from,
      to,
      order,
    };
    setBonds((prev) => [...prev, newBond]);
  }, []);

  const addStructure = useCallback((structure: MoleculeStructure) => {
    const timeOffset = Date.now();
    const idMap = new Map<string, string>();

    // Add atoms with new IDs
    const newAtoms = structure.atoms.map((atom) => {
      const newId = `${timeOffset}_${atom.id}`;
      idMap.set(atom.id, newId);
      return { ...atom, id: newId };
    });

    // Add bonds with updated atom IDs
    const newBonds = structure.bonds.map((bond) => ({
      ...bond,
      id: `${timeOffset}_${bond.id}`,
      from: idMap.get(bond.from)!,
      to: idMap.get(bond.to)!,
    }));

    setAtoms((prev) => [...prev, ...newAtoms]);
    setBonds((prev) => [...prev, ...newBonds]);
  }, []);

  const clearCanvas = useCallback(() => {
    setAtoms([]);
    setBonds([]);
    setSelectedAtom(null);
  }, []);

  return (
    <MoleculeEditorContext.Provider
      value={{
        atoms,
        bonds,
        selectedAtom,
        addAtom,
        addBond,
        addStructure,
        setSelectedAtom,
        clearCanvas,
      }}
    >
      {children}
    </MoleculeEditorContext.Provider>
  );
};
