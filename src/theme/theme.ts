import { createTheme } from '@mui/material/styles';

// Custom color palette
const colors = {
  primary: '#363123',      // Dark brown - main text, primary actions
  secondary: '#202610',    // Dark green - secondary elements, accents
  accent: '#854039',       // Rust red - highlights, important actions
  success: '#78C15F',      // Green - success states, positive actions
  background: '#ddd5cd',   // Light beige - backgrounds, subtle highlights
};

// Create theme with custom palette
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: '#4a453a',
      dark: '#252016',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary,
      light: '#3a3e2a',
      dark: '#16190b',
      contrastText: '#ffffff',
    },
    error: {
      main: colors.accent,
      light: '#a55650',
      dark: '#5d2c26',
      contrastText: '#ffffff',
    },
    success: {
      main: colors.success,
      light: '#8fcc7f',
      dark: '#548742',
      contrastText: '#000000',
    },
    warning: {
      main: colors.background,
      light: '#e8e1d9',
      dark: '#b8aca1',
      contrastText: '#000000',
    },
    background: {
      default: '#fafafa',
      paper: colors.background,
    },
    text: {
      primary: colors.primary,
      secondary: colors.secondary,
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      color: colors.primary,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      color: colors.primary,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      color: colors.primary,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      color: colors.primary,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      color: colors.primary,
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      color: colors.primary,
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      color: colors.primary,
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      color: colors.secondary,
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(221, 213, 205, 0.60)', // background color with opacity
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: `1px solid rgba(54, 49, 35, 0.1)`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: colors.primary,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4a453a',
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderColor: '#4a453a',
            backgroundColor: 'rgba(54, 49, 35, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          backgroundColor: colors.success,
          color: '#000000',
        },
        outlined: {
          borderColor: colors.secondary,
          color: colors.secondary,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(54, 49, 35, 0.1)',
        },
        bar: {
          backgroundColor: colors.success,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(54, 49, 35, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.success,
            },
          },
        },
      },
    },
  },
});

// Export individual colors for direct use when needed
export const appColors = colors;

// Type augmentation for TypeScript support
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}