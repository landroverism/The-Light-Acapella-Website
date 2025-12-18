import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Custom color tokens
const colors = {
  gold: {
    main: '#FFD700',
    dark: '#FFC107',
    light: '#FFE44D',
    contrastText: '#000000',
  },
  dark: {
    black: '#000000',
    paper: '#1A1A1A',
    card: '#252525',
    elevated: '#333333',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    muted: '#666666',
  },
  voiceParts: {
    lead: '#FFD700',
    tenor: '#60A5FA',
    baritone: '#4ADE80',
    bass: '#F87171',
    soprano: '#F472B6',
  },
  eventTypes: {
    church: '#3B82F6',
    private: '#A855F7',
    conference: '#22C55E',
    corporate: '#F97316',
  },
  status: {
    confirmed: '#4ADE80',
    tentative: '#FBBF24',
    past: '#6B7280',
  },
};

// Create base theme
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.gold.main,
      dark: colors.gold.dark,
      light: colors.gold.light,
      contrastText: colors.gold.contrastText,
    },
    secondary: {
      main: colors.text.secondary,
      dark: colors.text.muted,
      light: colors.text.primary,
    },
    background: {
      default: colors.dark.black,
      paper: colors.dark.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    divider: 'rgba(255, 215, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      color: colors.text.secondary,
    },
    subtitle2: {
      fontWeight: 500,
      color: colors.text.muted,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.6,
      color: colors.text.secondary,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.2)',
    '0 4px 8px rgba(0,0,0,0.25)',
    '0 6px 12px rgba(0,0,0,0.3)',
    '0 8px 16px rgba(0,0,0,0.35)',
    '0 10px 20px rgba(0,0,0,0.4)',
    '0 12px 24px rgba(0,0,0,0.45)',
    '0 14px 28px rgba(0,0,0,0.5)',
    '0 16px 32px rgba(0,0,0,0.55)',
    '0 18px 36px rgba(0,0,0,0.6)',
    '0 20px 40px rgba(0,0,0,0.65)',
    '0 22px 44px rgba(0,0,0,0.7)',
    '0 24px 48px rgba(0,0,0,0.75)',
    '0 26px 52px rgba(0,0,0,0.8)',
    '0 28px 56px rgba(0,0,0,0.85)',
    '0 30px 60px rgba(0,0,0,0.9)',
    '0 32px 64px rgba(0,0,0,0.95)',
    '0 34px 68px rgba(0,0,0,1)',
    '0 36px 72px rgba(0,0,0,1)',
    '0 38px 76px rgba(0,0,0,1)',
    '0 40px 80px rgba(0,0,0,1)',
    '0 42px 84px rgba(0,0,0,1)',
    '0 44px 88px rgba(0,0,0,1)',
    '0 46px 92px rgba(0,0,0,1)',
    '0 48px 96px rgba(0,0,0,1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: colors.dark.black,
          color: colors.text.primary,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: colors.dark.paper,
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.gold.main,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: colors.gold.dark,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 28px',
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(255, 215, 0, 0.25)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255, 215, 0, 0.35)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.card,
          backgroundImage: 'none',
          borderRadius: 16,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
          minHeight: 56,
          '&.Mui-selected': {
            color: colors.gold.main,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.gold.main,
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: colors.gold.main,
        },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: `0 0 0 8px rgba(255, 215, 0, 0.16)`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.dark.elevated,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.gold.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.gold.main,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.dark.card,
          backgroundImage: 'none',
          borderRadius: 20,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.gold.main,
          color: colors.gold.contrastText,
          fontWeight: 700,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

// Export colors for use in components
export { colors };
export default theme;

