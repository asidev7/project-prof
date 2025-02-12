import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: '#4CAF50', // Green success color
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: 'white',
  }));

  return (
    <AppBarStyled position="sticky">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" color="white" />
        </IconButton>

        {/* Notifications Icon */}
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="error">
            <IconBellRinging size="21" stroke="1.5" color="white" />
          </Badge>
        </IconButton>

        {/* Search Bar */}
        <Box flexGrow={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Rechercher..."
            fullWidth
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          />
        </Box>

        {/* Spacer */}
        <Box flexGrow={1} />

        {/* Admin Button and Profile */}
        <Stack spacing={1} direction="row" alignItems="center">
          {/* Admin Button */}
          <Button variant="contained" disableElevation sx={{ backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#2E7D32' } }}>
            Administrateur
          </Button>
          {/* Profile */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
