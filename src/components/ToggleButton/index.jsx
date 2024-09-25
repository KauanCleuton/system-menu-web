import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material/styles';

const VerticalToggleButtons = ({ handleChange, view }) => {
    const theme = useTheme();

    return (
        <ToggleButtonGroup
            orientation="horizontal"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton
                value="list"
                aria-label="list"
                sx={{
                    color: view === 'list' ? theme.palette.primary.main : theme.palette.secondary.main,
                    backgroundColor: view === 'list' ? theme.palette.primary.light : 'transparent',
                    '&:hover': {
                        backgroundColor: view === 'list' ? theme.palette.primary.main : theme.palette.action.hover,
                    },
                }}
            >
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton
                value="card"
                aria-label="card"
                sx={{
                    color: view === 'card' ? theme.palette.primary.main : theme.palette.secondary.main,
                    backgroundColor: view === 'card' ? theme.palette.primary.light : 'transparent',
                    '&:hover': {
                        backgroundColor: view === 'card' ? theme.palette.primary.main : theme.palette.action.hover,
                    },
                }}
            >
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default VerticalToggleButtons;
