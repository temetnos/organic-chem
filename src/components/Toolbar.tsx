import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useTheme } from '../contexts/ThemeContext';
import { Move, Trash2, Eraser, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../locales/i18n';
import { SecondaryElementsPanel } from './SecondaryElementsPanel';

type AtomToolId = 'C' | 'H' | 'O' | 'N' | 'S' | 'P' | 'F' | 'Cl' | 'Br' | 'I' | 'Na' | 'K' | 'Ca' | 'Mg' | 'Fe' | 'Zn' | 'Cu' | 'Co' | 'Se' | 'B' | 'Si';
type BondToolId = 'single-bond' | 'double-bond' | 'triple-bond';
type ActionToolId = 'move' | 'delete' | 'clear' | 'template' | 'secondary-elements';
type ToolId = AtomToolId | BondToolId | ActionToolId;

type Tool = {
  id: ToolId;
  labelKey: string;
  type: 'atom' | 'bond' | 'tool' | 'action';
  icon?: React.ReactNode;
};

const atomTools: Tool[] = [
  { id: 'C', labelKey: 'tools.carbon', type: 'atom' },
  { id: 'H', labelKey: 'tools.hydrogen', type: 'atom' },
  { id: 'O', labelKey: 'tools.oxygen', type: 'atom' },
  { id: 'N', labelKey: 'tools.nitrogen', type: 'atom' },
  { id: 'S', labelKey: 'tools.sulfur', type: 'atom' },
  { id: 'P', labelKey: 'tools.phosphorus', type: 'atom' },
];

const bondTools: Tool[] = [
  { id: 'single-bond', labelKey: 'tools.singleBond', type: 'bond' },
  { id: 'double-bond', labelKey: 'tools.doubleBond', type: 'bond' },
  { id: 'triple-bond', labelKey: 'tools.tripleBond', type: 'bond' },
];

const actionTools: Tool[] = [
  { id: 'move', labelKey: 'tools.move', type: 'action', icon: <Move size={16} /> },
  { id: 'delete', labelKey: 'tools.delete', type: 'action', icon: <Trash2 size={16} /> },
  { id: 'clear', labelKey: 'tools.clear', type: 'action', icon: <Eraser size={16} /> },
  { id: 'secondary-elements', labelKey: 'tools.secondaryElements', type: 'action', icon: <ChevronDown size={16} /> },
];

// All available tools combined
const allTools = [...atomTools, ...bondTools, ...actionTools] as const;

export const Toolbar: React.FC = () => {
  const { selectedTool, setSelectedTool, clearCanvas } = useGameStore();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [showSecondaryElements, setShowSecondaryElements] = useState(false);

  const textColorClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const borderColorClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const bgColorClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const buttonBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const buttonHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200';
  const selectedButtonClass = isDarkMode ? 'bg-blue-600' : 'bg-blue-500';

  const renderToolContent = (tool: Tool) => {
    if (tool.icon) {
      return tool.icon;
    }
    if (tool.type === 'atom') {
      return tool.id;
    }
    if (tool.type === 'bond') {
      return tool.id === 'single-bond' ? '—' : tool.id === 'double-bond' ? '=' : '≡';
    }
    return null;
  };

  const handleToolClick = (tool: Tool) => {
    if (tool.id === 'clear') {
      clearCanvas();
    } else if (tool.id === 'secondary-elements') {
      setShowSecondaryElements(!showSecondaryElements);
    } else {
      setSelectedTool(tool.id as any);
      setShowSecondaryElements(false);
    }
  };

  return (
    <div className="relative w-[200px] h-full flex flex-col">
      <div className={`flex-1 flex flex-col ${bgColorClass} ${borderColorClass} border-r`}>
        <div className="p-2 border-b border-gray-200">
          <h2 className={`text-sm font-semibold mb-2 ${textColorClass}`}>
            {t('tools.title', 'Araçlar')}
          </h2>
          
          {/* Atom Buttons */}
          <div className="mb-2">
            <h3 className={`text-xs font-medium mb-1 ${secondaryTextColorClass}`}>
              {t('tools.atoms', 'Atoms')}
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {atomTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={`w-full h-8 rounded transition-colors duration-200 font-medium flex items-center justify-center ${
                    selectedTool === tool.id
                      ? `${selectedButtonClass} text-white`
                      : `${buttonBgClass} ${buttonHoverClass} ${secondaryTextColorClass}`
                  }`}
                >
                  {renderToolContent(tool)}
                </button>
              ))}
            </div>
          </div>

          {/* Bond Buttons */}
          <div className="mb-2">
            <h3 className={`text-xs font-medium mb-1 ${secondaryTextColorClass}`}>
              {t('tools.bonds', 'Bonds')}
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {bondTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={`w-full h-8 rounded transition-colors duration-200 font-medium flex items-center justify-center ${
                    selectedTool === tool.id
                      ? `${selectedButtonClass} text-white`
                      : `${buttonBgClass} ${buttonHoverClass} ${secondaryTextColorClass}`
                  }`}
                >
                  {renderToolContent(tool)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1">
            {actionTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className={`w-full h-8 rounded transition-colors duration-200 flex items-center justify-center gap-2 ${
                  selectedTool === tool.id
                    ? `${selectedButtonClass} text-white`
                    : `${buttonBgClass} ${buttonHoverClass} ${secondaryTextColorClass}`
                } ${tool.id === 'clear' ? 'text-red-500 hover:text-red-600' : ''}`}
              >
                <span className="w-4 text-center">{renderToolContent(tool)}</span>
                <span className="text-xs flex-1 text-left">{t(tool.labelKey, tool.id)}</span>
                {tool.id === 'secondary-elements' && (
                  <span className="w-4">
                    {showSecondaryElements ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Elements Panel */}
      {showSecondaryElements && (
        <div className="absolute right-[-200px] top-0 w-[200px] h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <SecondaryElementsPanel onClose={() => setShowSecondaryElements(false)} />
        </div>
      )}

      <div className="p-2 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className={`text-xs ${secondaryTextColorClass}`}>
            {t('tools.selectedTool', 'Seçili:')} {selectedTool}
          </span>
        </div>
      </div>
    </div>
  );
};