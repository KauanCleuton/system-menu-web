import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyIcon from '@mui/icons-material/Key'
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_ALERT, hideAlert } from '@/store/actions';
import { AdminPanelSettings, CategoryOutlined, Inventory2Outlined, Palette, PaletteOutlined, WarningAmber } from '@mui/icons-material';
import { useTheme } from '@mui/material';

const SnackBar = ({ open, onClose, message, severity, type, timeStamp }) => {
    const theme = useTheme()

    console.log(type, timeStamp, 69)

    const getIcon = () => {
        switch (type) {
            case 'user':
                return <PersonIcon sx={{ color: theme.palette.primary.main }} />;
            case 'notification':
                return <WarningAmber sx={{ color: theme.palette.primary.main }} />;
            case 'key':
                return <KeyIcon sx={{ color: theme.palette.primary.main }} />;
            case 'admin':
                return <AdminPanelSettings sx={{ color: theme.palette.primary.main }} />;
            case 'product':
                return <Inventory2Outlined sx={{ color: theme.palette.primary.main }} />;
            case 'category':
                return <CategoryOutlined sx={{ color: theme.palette.primary.main }} />;
            case 'file':
                return <InsertDriveFileIcon sx={{ color: theme.palette.primary.main }} />;
            case 'error':
                return <LockIcon sx={{ color: theme.palette.primary.main }} />;
            case 'success':
                return <LockOpenIcon sx={{ color: theme.palette.primary.main }} />;
            case 'tema':
                return <PaletteOutlined sx={{ color: theme.palette.primary.main }} />;
            default:
                return null;
        }
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={timeStamp}
            onClose={onClose}>
            <Alert
                variant='filled'
                onClose={onClose}
                severity={severity === "success" ? "success" : "error"}
                icon={getIcon()}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                }
                sx={{
                    fontSize: 15,
                    bgcolor: '#141414',
                    color: theme.palette.primary.main,
                    '& .MuiAlert-icon': {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBar;
