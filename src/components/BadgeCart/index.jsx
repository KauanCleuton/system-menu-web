"use client"
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useScrollTrigger, useTheme } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',

  },
}));

export default function BadgeCart() {
  const path = usePathname()
  const theme = useTheme()
  const totalItems = useSelector(state => state.cart.totalItems);
  const item = useSelector(state => state.cart.items);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; 
  }

  return (
    <IconButton
      aria-label="cart"
      LinkComponent={'a'}
      href='/cart'
      sx={{ color: theme.palette.primary.main }}
    >
      <StyledBadge
        badgeContent={totalItems}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: trigger || path !== '/' ? "transparent" : theme.palette.primary.main,
            color: trigger || path !== '/' ? theme.palette.primary.main : "#fff",
          }
        }}
      >
        <ShoppingCartIcon
          sx={{
            color: trigger || path !== '/' ? theme.palette.primary.main : "#fff",
          }}
        />
      </StyledBadge>
    </IconButton>

  );
}
