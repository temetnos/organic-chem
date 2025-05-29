import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useTheme } from '../contexts/ThemeContext';
import type { Atom } from '../types/molecule';
import { getMoleculeName } from '../utils/nomenclature';
import { validateMoleculeStructure } from '../utils/chemistryRules';
import { Box, Button, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TemplatePanel } from './TemplatePanel';

// Atom tipleri sabiti
const atomTypes = ['H', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Co', 'Cu', 'Zn', 'Br', 'I', 'Si', 'Se'] as const;

const ATOM_SIZES = {
  'H': 8,
  'C': 20,
  'N': 24,
  'O': 26,
} as const;

export const DrawingPanel: React.FC = () => {
  const [isTemplatePanelOpen, setIsTemplatePanelOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    atoms, 
    bonds, 
    selectedTool, 
    selectedAtomId,
    isDragging,
    addAtom, 
    addBond,
    deleteAtom,
    moveAtom,
    setSelectedAtomId,
    setIsDragging,
    checkCompletion
  } = useGameStore();
  const { isDarkMode } = useTheme();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Molekül ismini ve geçerliliğini hesapla
  const moleculeName = getMoleculeName(atoms, bonds);
  const validation = validateMoleculeStructure(atoms, bonds);
  const isMoleculeValid = validation.isValid;

  useEffect(() => {
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Calculate available space for canvas
      const maxWidth = containerRect.width - 40; // 20px padding on each side
      const maxHeight = window.innerHeight * 0.6; // 60% of viewport height
      
      // Maintain aspect ratio (16:9)
      const aspectRatio = 16 / 9;
      let width = maxWidth;
      let height = width / aspectRatio;
      
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      
      setCanvasSize({ 
        width: Math.floor(width), 
        height: Math.floor(height) 
      });
    };

    // Initial setup
    updateCanvasSize();
    
    // Add debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCanvasSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMolecule(ctx);
  }, [atoms, bonds, isDarkMode, selectedAtomId]);

  const drawMolecule = (ctx: CanvasRenderingContext2D) => {
    // Bağları çiz
    bonds.forEach(bond => {
      const atom1 = atoms.find(a => a.id === bond.from);
      const atom2 = atoms.find(a => a.id === bond.to);
      if (atom1 && atom2) {
        // Hidrojen bağı mı kontrol et
        const isHydrogenBond = (atom1.element === 'H' || atom2.element === 'H');
        
        // Hidrojen bağları için farklı stil
        if (isHydrogenBond) {
          ctx.strokeStyle = isDarkMode ? '#9ca3af' : '#9ca3af'; // Açık gri renk
          ctx.lineWidth = 1; // Daha ince çizgi
          ctx.setLineDash([2, 2]); // Kesikli çizgi efekti
        } else {
          ctx.strokeStyle = isDarkMode ? '#d1d5db' : '#4b5563';
          ctx.lineWidth = 2;
          ctx.setLineDash([]); // Düz çizgi
        }
        
        const dx = atom2.x - atom1.x;
        const dy = atom2.y - atom1.y;
        const angle = Math.atan2(dy, dx);
        
        for (let i = 0; i < bond.order; i++) {
          const offset = (i - (bond.order - 1) / 2) * 6;
          
          ctx.beginPath();
          ctx.moveTo(
            atom1.x + Math.sin(angle) * offset,
            atom1.y - Math.cos(angle) * offset
          );
          ctx.lineTo(
            atom2.x + Math.sin(angle) * offset,
            atom2.y - Math.cos(angle) * offset
          );
          ctx.stroke();
        }
        
        // Çizgi stilini ve saydamlığı sıfırla
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      }
    });

    // Atomları çiz
    atoms.forEach(atom => {
      const radius = ATOM_SIZES[atom.element as keyof typeof ATOM_SIZES] || 20;
      
      // Atom dairesi
      ctx.beginPath();
      ctx.arc(atom.x, atom.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = getAtomColor(atom.element);
      ctx.fill();
      
      // Seçili durum için kenarlık
      if (atom.id === selectedAtomId) {
        ctx.strokeStyle = isDarkMode ? '#3b82f6' : '#2563eb';
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = isDarkMode ? '#d1d5db' : '#4b5563';
        ctx.lineWidth = 2;
      }
      ctx.stroke();

      // Atom sembolü
      ctx.fillStyle = getAtomTextColor(atom.element);
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(atom.element, atom.x, atom.y);
    });
  };

  const findAtomAtPosition = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    // Canvas'ın sayfadaki konumunu ve boyutunu al
    const rect = canvas.getBoundingClientRect();
    
    // Tıklanan noktanın canvas içindeki göreceli konumunu hesapla
    // (viewport koordinatlarından canvas koordinatlarına dönüşüm)
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Canvas'ın gerçek boyutları ile görüntülenen boyutları arasındaki ölçek faktörü
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Tıklanan noktanın canvas koordinat sistemindeki karşılığını hesapla
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;
    
    console.log('Aranan konum:', { 
      clientX, 
      clientY, 
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      scale: { scaleX, scaleY },
      canvasCoords: { x, y },
      scaledCoords: { canvasX, canvasY }
    });
    
    // Tüm atomları kontrol et ve tıklanan noktaya en yakın olanı bul
    let closestAtom: Atom | null = null;
    let minDistance = 30; // Maksimum tıklama mesafesi (pixel)
    
    atoms.forEach(atom => {
      const dx = atom.x - canvasX;
      const dy = atom.y - canvasY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      console.log('Kontrol edilen atom:', { 
        atomId: atom.id,
        atomX: atom.x, 
        atomY: atom.y, 
        distance,
        element: atom.element 
      });
      
      // Eğer bu atom daha yakınsa ve maksimum mesafe içindeyse
      if (distance < minDistance) {
        minDistance = distance;
        closestAtom = atom;
      }
    });
    
    console.log('Bulunan atom:', closestAtom ? 
      { id: closestAtom.id, element: closestAtom.element, distance: minDistance } : 'Yok');
      
    return closestAtom;
  };

  // getCanvasCoordinates fonksiyonu kaldırıldı, doğrudan findAtomAtPosition kullanılıyor

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    console.log('Canvas tıklandı:', { clientX, clientY });
    
    // Doğrudan findAtomAtPosition'ı kullan
    const clickedAtom = findAtomAtPosition(clientX, clientY);
    
    if (selectedTool === 'delete' && clickedAtom) {
      console.log('Atom siliniyor:', clickedAtom.id);
      deleteAtom(clickedAtom.id);
      checkCompletion();
      return;
    }
    
    if (selectedTool && atomTypes.includes(selectedTool as any)) {
      // Yeni atom ekleme
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Canvas'ın sayfadaki konumunu ve boyutunu al
      const rect = canvas.getBoundingClientRect();
      
      // Tıklanan noktanın canvas içindeki göreceli konumunu hesapla
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Canvas'ın gerçek boyutları ile görüntülenen boyutları arasındaki ölçek faktörü
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      // Tıklanan noktanın canvas koordinat sistemindeki tam konumunu hesapla
      const canvasX = x * scaleX;
      const canvasY = y * scaleY;
      
      console.log('Yeni atom ekleniyor:', { 
        element: selectedTool, 
        x: canvasX, 
        y: canvasY,
        clientCoords: { x, y },
        scale: { scaleX, scaleY }
      });
      
      addAtom(selectedTool as Atom['element'], canvasX, canvasY);
      checkCompletion();
      return;
    }

    if (selectedTool && ['single-bond', 'double-bond', 'triple-bond'].includes(selectedTool)) {
      if (clickedAtom) {
        if (!selectedAtomId) {
          console.log('İlk atom seçildi:', clickedAtom.id);
          setSelectedAtomId(clickedAtom.id);
        } else if (selectedAtomId !== clickedAtom.id) {
          console.log('İkinci atom seçildi, bağ oluşturuluyor:', { from: selectedAtomId, to: clickedAtom.id });
          const bondOrder = selectedTool === 'single-bond' ? 1 : selectedTool === 'double-bond' ? 2 : 3;
          addBond(selectedAtomId, clickedAtom.id, bondOrder);
          setSelectedAtomId(null);
          checkCompletion();
        } else {
          console.log('Aynı atoma tekrar tıklandı, seçim kaldırılıyor');
          setSelectedAtomId(null);
        }
      } else {
        console.log('Atom bulunamadı, seçim kaldırılıyor');
        setSelectedAtomId(null);
      }
      return;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | { clientX: number; clientY: number }) => {
    if (!selectedTool) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Canvas boyutlarına göre koordinat düzeltmesi
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    if (selectedTool === 'move') {
      const clickedAtom = atoms.find(atom => {
        const dx = atom.x - canvasX;
        const dy = atom.y - canvasY;
        return Math.sqrt(dx * dx + dy * dy) < 20;
      });

      if (clickedAtom) {
        setSelectedAtomId(clickedAtom.id);
        setIsDragging(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | { clientX: number; clientY: number }) => {
    if (!selectedAtomId || !isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Canvas boyutlarına göre koordinat düzeltmesi
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    moveAtom(selectedAtomId, canvasX, canvasY);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setSelectedAtomId(null);
    }
  };

  const getCursorClass = (tool: string | null): string => {
    if (!tool) return 'cursor-default';
    
    switch(tool) {
      case 'C':
      case 'H':
      case 'O':
      case 'N':
      case 'single-bond':
      case 'double-bond':
      case 'triple-bond':
        return 'cursor-crosshair';
      case 'move':
        return 'cursor-move';
      case 'delete':
        return 'cursor-pointer';
      default:
        return 'cursor-default';
    }
  };

  const getAtomColor = (element: string): string => {
    if (isDarkMode) {
      switch (element) {
        case 'H': return '#f3f4f6'; // gray-100
        case 'C': return '#d1d5db'; // gray-300
        case 'O': return '#fca5a5'; // red-300
        case 'N': return '#93c5fd'; // blue-300
        default: return '#ffffff';
      }
    } else {
      switch (element) {
        case 'H': return '#1f2937'; // gray-800
        case 'C': return '#4b5563'; // gray-600
        case 'O': return '#dc2626'; // red-600
        case 'N': return '#2563eb'; // blue-600
        default: return '#000000';
      }
    }
  };

  const getAtomTextColor = (_element: string): string => {
    return isDarkMode ? '#000000' : '#ffffff';
  };

  // Add touch event listeners to prevent scrolling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const preventDefaultHandler = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    canvas.addEventListener('touchmove', preventDefaultHandler, { passive: false });
    return () => {
      canvas.removeEventListener('touchmove', preventDefaultHandler);
    };
  }, []);

  return (
    <Box className="relative w-full h-full flex flex-col">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto p-2 sm:p-4 flex-1 flex flex-col"
      >
        <div 
          className={`
            relative w-full flex-1 flex items-center justify-center 
            rounded-lg overflow-hidden touch-none
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}
          `}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className={`
              w-full h-full max-h-[70vh]
              ${getCursorClass(selectedTool)}
              touch-none select-none
            `}
            style={{
              display: 'block',
              touchAction: 'none',
              width: '100%',
              height: '100%',
              maxHeight: '70vh',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            onClick={handleCanvasClick}
            onTouchStart={handleCanvasClick}
            onTouchMove={(e) => {
              e.preventDefault();
              const touch = e.touches[0];
              handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY,
              });
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleMouseUp();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
        
        <div className="mt-3 px-1 sm:px-0 text-center sm:text-left break-words">
          <p className={`
            text-sm font-medium
            ${isMoleculeValid ? 'text-green-600' : 'text-yellow-600'}
          `}>
            {moleculeName ? (
              <>
                {moleculeName} {!isMoleculeValid && '(Geçersiz Yapı)'}
              </>
            ) : (
              'Molekül çizmeye başlayın'
            )}
          </p>
          
          {!isMoleculeValid && moleculeName && (
            <p className="text-xs text-gray-500 mt-1">
              Doğru yapıyı oluşturmaya çalışın.
            </p>
          )}
        </div>
      </div>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsTemplatePanelOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 100,
        }}
      >
        Hazır Yapılar
      </Button>

      <Drawer
        anchor="right"
        open={isTemplatePanelOpen}
        onClose={() => setIsTemplatePanelOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            position: 'fixed',
            height: '100%',
          },
          position: 'fixed',
          height: '100%',
          flexShrink: 0,
          zIndex: 1200,
        }}
        variant="temporary"
      >
        <TemplatePanel onClose={() => setIsTemplatePanelOpen(false)} />
      </Drawer>
    </Box>
  );
};