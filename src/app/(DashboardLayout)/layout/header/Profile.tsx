import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

const Profile = ({ adminName = "Admin" }) => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="profile image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* Menu du profil */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "220px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Mon Profil</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>Mon Compte</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>Mes Tâches</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Se déconnecter ({adminName})
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
