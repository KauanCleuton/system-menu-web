import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

const Loading = () => {
    const theme = useTheme()
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress 
            size={50}
            sx={{
                color: theme.palette.primary.main
            }} />
        </Box>
    )
}

export default Loading