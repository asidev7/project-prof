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
  Badge,
  Typography,
} from "@mui/material";
import {
  IconSettings,
  IconBellRinging,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

const Profile = ({ adminName = "Admin", userRole = "Administrateur" }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Notification Icon */}
      <IconButton
        sx={{
          backgroundColor: "#4CAF50",
          "&:hover": { backgroundColor: "#45a049" },
        }}
      >
        <Badge badgeContent={3} color="error">
          <IconBellRinging color="white" />
        </Badge>
      </IconButton>

      {/* Profile Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src="/images/profile/user-1.jpg"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            width: 40,
            height: 40,
            border: "2px solid #e0e0e0",
          }}
        />
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body2" fontWeight="bold">
            {adminName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {userRole}
          </Typography>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconUser size={20} />
          </ListItemIcon>
          <ListItemText>Profil</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconSettings size={20} />
          </ListItemIcon>
          <ListItemText>Paramètres</ListItemText>
        </MenuItem>

        <Box sx={{ p: 1, borderTop: "1px solid #f0f0f0" }}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            component={Link}
            href="/logout"
            startIcon={<IconLogout size={18} />}
            sx={{
              justifyContent: "flex-start",
              color: "error.main",
              "&:hover": { backgroundColor: "#ffeeee" },
            }}
          >
            Déconnexion
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;