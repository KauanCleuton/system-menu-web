"use client"
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useScrollTrigger } from '@mui/material';

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
  const totalItems = useSelector(state => state.cart.totalItems);
  const item = useSelector(state => state.cart.items);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // ou um placeholder enquanto está hidratando
  }

  return (
    <IconButton
      aria-label="cart"
      LinkComponent={'a'}
      href='/cart'
      sx={{ color: "#FF4D00" }}
    >
      <StyledBadge
        badgeContent={totalItems}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: trigger || path !== '/' ? "transparent" : "#FF4D00",
            color: trigger || path !== '/' ? "#FF4D00" : "#fff",
          }
        }}
      >
        <ShoppingCartIcon
          sx={{
            color: trigger || path !== '/' ? "#FF4D00" : "#fff",
          }}
        />
      </StyledBadge>
    </IconButton>

  );
}
