import React, { useState, ChangeEvent } from 'react';
import { TextField, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parse, isValid, format } from 'date-fns';

function DatePickerWithTextBox() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [textValue, setTextValue] = useState<string>('');

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    setTextValue(newValue ? format(newValue, 'MM/dd/yyyy') : '');
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTextValue(newValue);

    const parsedDate = parse(newValue, 'MM/dd/yyyy', new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Date"
          value={textValue}
          onChange={handleTextChange}
          placeholder="MM/DD/YYYY"
        />
        <DatePicker
          label="Calendar"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default DatePickerWithTextBox;
