"use client"

import { Box, Typography } from "@mui/material"
import { useParams } from "next/navigation"

const EditAdmin = () => {
    const { slug } = useParams()

    return (
        <Box>
            <Typography variant="h2" sx={{color: '#000'}}>
                Admin com usuário: {slug}
            </Typography>   
        </Box>
    )
}

export default EditAdmin