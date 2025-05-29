import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useGameStore } from '../store/gameStore';
import { Atom } from '../types/molecule';

interface SecondaryElementsPanelProps {
  onClose: () => void;
}
const secondaryElements: { element: Atom['element']; name: string }[] = [
  { element: 'S', name: 'Sulfur' },
  { element: 'P', name: 'Phosphorus' },
  { element: 'F', name: 'Fluorine' },
  { element: 'Cl', name: 'Chlorine' },
  { element: 'Br', name: 'Bromine' },
  { element: 'I', name: 'Iodine' },
  { element: 'Na', name: 'Sodium' },
  { element: 'K', name: 'Potassium' },
  { element: 'Ca', name: 'Calcium' },
  { element: 'Mg', name: 'Magnesium' },
  { element: 'Fe', name: 'Iron' },
  { element: 'Zn', name: 'Zinc' },
  { element: 'Cu', name: 'Copper' },
  { element: 'Co', name: 'Cobalt' },
  { element: 'Se', name: 'Selenium' },
  { element: 'B', name: 'Boron' },
  { element: 'Si', name: 'Silicon' },
];

export const SecondaryElementsPanel: React.FC<SecondaryElementsPanelProps> = ({ onClose }) => {
  const { setSelectedTool } = useGameStore();

  const handleElementClick = (element: Atom['element']) => {
    setSelectedTool(element as any);
    onClose();
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Secondary Elements
      </Typography>
      <Grid container spacing={1}>
        {secondaryElements.map((item) => (
          <Grid item xs={6} key={item.element}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleElementClick(item.element)}
              sx={{
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" component="div">
                {item.element}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.name}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
