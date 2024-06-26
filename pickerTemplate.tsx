import React, { useState, useEffect } from 'react';
import { Box, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface NumberDatePickerProps {
  initialT: number;
  onTChange: (newT: number) => void;
  onDateChange: (newDate: Date | null) => void;
}

const NumberDatePicker: React.FC<NumberDatePickerProps> = ({
  initialT,
  onTChange,
  onDateChange
}) => {
  const [t, setT] = useState<number>(initialT);
  const [date, setDate] = useState<Date | null>(null);

  const handleTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setT(value);
      onTChange(value);
    }
  };

  const incrementT = () => {
    const newT = t + 1;
    setT(newT);
    onTChange(newT);
  };

  const decrementT = () => {
    const newT = Math.max(0, t - 1);
    setT(newT);
    onTChange(newT);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      incrementT();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      decrementT();
    } else if (event.key === 'e' || event.key === '.') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const fetchDateFromAPI = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch(`https://api.example.com/date?t=${t}`);
        const data = await response.json();
        // Assuming the API returns a date string
        const newDate = new Date(data.date);
        setDate(newDate);
        onDateChange(newDate);
      } catch (error) {
        console.error('Error fetching date:', error);
        onDateChange(null);
      }
    };

    fetchDateFromAPI();
  }, [t, onDateChange]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1">Value T:</Typography>
      <OutlinedInput
        type="number"
        value={t}
        onChange={handleTChange}
        onKeyDown={handleKeyDown}
        inputProps={{
          step: 1,
          min: 0,
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton onClick={decrementT} edge="start">
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={incrementT} edge="end">
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Selected Date"
          value={date}
          onChange={() => {}} // This prevents direct changes
          readOnly={true}
          renderInput={(params) => <OutlinedInput {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected = date && day.getTime() === date.getTime();
            return (
              <DayComponentProps
                {...DayComponentProps}
                sx={{
                  ...DayComponentProps.sx,
                  backgroundColor: isSelected ? 'primary.main' : 'inherit',
                  color: isSelected ? 'primary.contrastText' : 'inherit',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.dark' : 'inherit',
                    cursor: 'default',
                  },
                }}
              />
            );
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default NumberDatePicker;
