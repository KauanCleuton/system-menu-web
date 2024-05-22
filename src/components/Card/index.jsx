import PropTypes from 'prop-types';

import { Box, Card, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';


const AuthCard = ({ children, ...other }) => {
    const theme = useTheme()
    return (
        <>
            <Card
                sx={{
                    maxWidth: { xs: 400, lg: 475 },
                    margin: { xs: 2.5, md: 7 },
                    '& > *': {
                        flexGrow: 1,
                        flexBasis: '50%'
                    },
                    borderRadius: '12px',
                    py: 1
                }}
                content={false}
                {...other}
            >
                <Box sx={{ px: { xs: 2, sm: 3, xl: '27px' }, position: 'relative' }}>{children}</Box>
            </Card>
        </>
    )
}

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;
