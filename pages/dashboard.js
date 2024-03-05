import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Profile", icon: <AccountBoxIcon />, path: "/profile" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar /> {/* Empty Toolbar to offset content below AppBar */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={item.text}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar /> {/* Empty Toolbar to offset content below AppBar */}
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography paragraph>
            Welcome to your dashboard. Here you can find an overview of your
            activity.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("This is a placeholder action!")}
          >
            Perform an Action
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
