import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          fullScreen={fullScreen}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, scale: 0.95, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 20 },
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            sx: {
              backgroundColor: 'background.paper',
              backgroundImage: 'none',
              borderRadius: fullScreen ? 0 : 4,
              maxHeight: fullScreen ? '100%' : '90vh',
            },
          }}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
              },
            },
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 1,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Content */}
          <DialogContent
            sx={{
              pt: 3,
              pb: 4,
              '&::-webkit-scrollbar': {
                width: 6,
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 215, 0, 0.3)',
                borderRadius: 3,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255, 215, 0, 0.5)',
              },
            }}
          >
            {children}
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
