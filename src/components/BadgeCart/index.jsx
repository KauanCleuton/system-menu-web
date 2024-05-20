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
  console.log(totalItems)
  console.table(item)
  return (
    <IconButton aria-label="cart" LinkComponent={'a'} href='/cart'>
      <StyledBadge badgeContent={totalItems} color='success'>
        <ShoppingCartIcon sx={{ color: trigger || path !== '/' ? "#001928" : "#fff", }} />
      </StyledBadge>
    </IconButton>
  );
}
