import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress 
            size={50}
            sx={{
                color: "#FF4D00"
            }} />
        </Box>
    )
}

export default Loading