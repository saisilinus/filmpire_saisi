import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import createCtx from '../../utils/createCtx';

interface ColorModeContext {
  mode: PaletteMode;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  toggleColorMode: () => void;
}

export const [useColorModeContext, ColorModeProvider] = createCtx<ColorModeContext>();

type Props = {
  children: React.ReactNode;
}

const ToggleColorModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleColorMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeProvider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeProvider>
  );
};

export default ToggleColorModeProvider;
