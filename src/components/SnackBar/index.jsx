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

const SnackBar = () => {
    const dispatch = useDispatch();
    const { open, message, severity, type } = useSelector(state => state.alert);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: CLOSE_ALERT});
    };

    const getIcon = () => {
        switch (type) {
            case 'user':
                return <PersonIcon sx={{ color: '#FF4D00' }} />;
            case 'key':
                return <KeyIcon sx={{ color: '#FF4D00' }} />;
            case 'file':
                return <InsertDriveFileIcon sx={{ color: '#FF4D00' }} />;
            case 'error':
                return <LockIcon sx={{ color: '#FF4D00' }} />;
            case 'success':
                return <LockOpenIcon sx={{ color: '#FF4D00' }} />;
            default:
                return null;
        }
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
                variant='filled'
                onClose={handleClose}
                severity={severity === "success" ? "success" : "error"}
                icon={getIcon()}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" sx={{ color: '#FF4D00' }} />
                    </IconButton>
                }
                sx={{
                    fontSize: 15,
                    bgcolor: '#141414',
                    color: '#FF4D00',
                    '& .MuiAlert-icon': {
                        color: '#FF4D00',
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBar;
