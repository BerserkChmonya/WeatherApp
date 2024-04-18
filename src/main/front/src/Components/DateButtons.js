// DateButtons.js
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function DateButtons({ dates, handleDateChange, selectedDate }) {
  const buttonWidth = `${100 / dates.length}%`; // Calculate width dynamically

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      p={2}
      position="fixed"
      bottom={0}
      width="99vw"
      bgcolor="white"
      boxShadow="0px -1px 5px rgba(0, 0, 0, 0.1)"
    >
      {dates.map((date, index) => (
        <Button
          key={index}
          onClick={() => handleDateChange(date)}
          variant={date.toDateString() === selectedDate.toDateString() ? 'contained' : 'outlined'}
          color="primary"
          sx={{ width: buttonWidth, minWidth: 120, flexShrink: 0 }}
        >
          {date.toDateString() === new Date().toDateString() ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </Button>
      ))}
    </Box>
  );
}

export default DateButtons;