import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//icons
import CircleIcon from '@mui/icons-material/Circle';
import CloudIcon from '@mui/icons-material/Cloud';
import { Favorite, FavoriteBorder } from '@mui/icons-material';


const cities = ['Berlin', 'Bratislava', 'Cape Town', 'Dubai', 'Kosice', 'Kyiv', 'Kryvyi Rih', 'London', 'Los Angeles', 'Madrid', 'New York', 'Paris', 'Poprad', 'Presov', 'Rio de Janeiro', 'Rome', 'Shanghai', 'Smila', 'Sydney', 'Tokyo'];

export default function App_bar({ onCitySelect }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCitySelect = (city) => {
    onCitySelect(city); // Call the callback function passed from the parent component
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Container for icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <CloudIcon sx={{ fontSize: 32, color: 'white', position: 'relative', zIndex: 1 }} />
            <CircleIcon sx={{ fontSize: 20, color: 'lightblue', position: 'absolute', right: -6, top: 0, zIndex: 0 }} />
          </Box>

          <Typography variant="h6" color="inherit" component="div" sx={{ marginLeft: '10px' }}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {cities.map((city) => (
          <MenuItem key={city} onClick={() => handleCitySelect(city)}>{city}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
