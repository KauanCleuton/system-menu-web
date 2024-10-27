import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'


const Caixa = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            py: 12,
            justifyContent: 'center',
            alignItems: 'center',
            display:'flex'
        }}>
          <Container fixed>
            <Grid container spacing={0}>
              
            </Grid>
          </Container>
        </Box>
    )
}


export default Caixa