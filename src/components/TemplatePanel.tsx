import React from 'react';
import { templates } from '../data/templates';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useGameStore } from '../store/gameStore';
import { MoleculeStructure } from '../types/molecule';

interface TemplatePanelProps {
  onClose: () => void;
}

export const TemplatePanel: React.FC<TemplatePanelProps> = ({ onClose }) => {
  const { setSelectedTool, setSelectedStructure } = useGameStore();

  const handleTemplateClick = (structure: MoleculeStructure) => {
    setSelectedStructure(structure);
    setSelectedTool('template');
    onClose(); // Paneli kapat
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Hazır Yapılar
      </Typography>
      <Grid container spacing={2}>
        {templates.map((template) => (
          <Grid item xs={6} key={template.id}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleTemplateClick(template.structure)}
              sx={{
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography variant="subtitle1">{template.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {template.description}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
