import { useTheme, Box, Button } from "@mui/material"



const ButtonOption = ({title, handleOpen}) => {
    const theme = useTheme()
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
        }}>
            <Button variant="container" onClick={handleOpen} sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.white,
                fontSize: 12,
                textTransform: 'none',
                border: `1px solid ${theme.palette.primary.main}`,
                ":hover": {
                    bgcolor: 'transparent',
                    color: theme.palette.primary.main
                }
            }}>
                {title}
            </Button>
        </Box>
    )
}


export default ButtonOption