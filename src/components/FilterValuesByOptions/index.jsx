import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useTheme, Button } from '@mui/material'

const FilterValuesByOptions = ({ handleChange }) => {
    const [selectOption, setSelectOption] = useState('diario')
    const theme = useTheme()
    const optionsFilter = [
        {
            id: 1,
            slug: 'diario',
            name: 'Diário'
        },
        {
            id: 2,
            slug: 'semanal',
            name: 'Semanal'
        },
        {
            id: 3,
            slug: 'mensal',
            name: 'Mensal'
        },
        {
            id: 4,
            slug: 'anual',
            name: 'Anual'
        },
        {
            id: 5,
            slug: 'date',
            name: 'Por Data'
        },
    ]

    return (
        <Box sx={{
            width: '100%',
            // height: 70,
            py: 1,
            px: 3,
            background: theme.palette.secondary.main,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Grid container alignItems='center' justifyContent='space-between'>
                {optionsFilter.map((item, index) => {
                    return (  
                        <Grid item key={index}>
                            <Button 
                                variant='contained' 
                                sx={{
                                    background: selectOption === item.slug ? theme.palette.primary.main : 'transparent',
                                    // color: selectOption === item.slug ? '#fff' : theme.palette.text.primary,
                                    color: "#fff",
                                    borderRadius: 4,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark
                                    }
                                }}
                                onClick={() => setSelectOption(item.slug)} 
                            >
                                {item.name}
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default FilterValuesByOptions
