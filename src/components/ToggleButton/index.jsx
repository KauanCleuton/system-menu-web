import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const ViewToggleButtons = ({ handleChange, view }) => {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={`1px solid ${theme.palette.divider}`}
            borderRadius={1}
            overflow="hidden"
        >
            <IconButton
                onClick={() => handleChange('list')}
                aria-label="list"
                sx={{
                    flex: 1,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    color: view === 'list' ? theme.palette.primary.main : theme.palette.secondary.main,
                    backgroundColor: view === 'list' ? theme.palette.primary.light : 'transparent',
                    '&:hover': {
                        backgroundColor: view === 'list' ? theme.palette.primary.main : theme.palette.action.hover,
                        color: view === 'list' ? "#fff" : theme.palette.secondary.main,
                    },
                    borderRadius: 0, // Remove bordas arredondadas nos botões
                }}
            >
                <ViewListIcon />
            </IconButton>

            <IconButton
                onClick={() => handleChange('card')}
                aria-label="card"
                sx={{
                    flex: 1,
                    color: view === 'card' ? theme.palette.primary.main : theme.palette.secondary.main,
                    backgroundColor: view === 'card' ? theme.palette.primary.light : 'transparent',
                    '&:hover': {
                        backgroundColor: view === 'card' ? theme.palette.primary.main : theme.palette.action.hover,
                        color: view === 'card' ? "#fff" : theme.palette.secondary.main,
                    },
                    borderRadius: 0, // Remove bordas arredondadas nos botões
                }}
            >
                <ViewModuleIcon />
            </IconButton>
        </Box>
    );
};

export default ViewToggleButtons;
