import React, { useRef, useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';


export const OutlinedSelect = ({
  id,
  name,
  label,
  onChange,
  formControlClassName,
  menuItems,
  selectedItemId,
  errors,
  touched
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (<FormControl variant="outlined" className={formControlClassName} error={Boolean(errors[name] && touched[name])}>
  <InputLabel ref={inputLabel} htmlFor={id}>{label}</InputLabel>
  <Select
    value={selectedItemId}
    onChange={onChange}
    labelWidth={labelWidth}
    inputProps={{
      name,
      id,
    }}
  >
    {menuItems.map((item, index) => (
      <MenuItem key={`${index}-${item.id}`} value={item.id}>{item.title}</MenuItem>
    ))}
    
  </Select>
  {errors[name] && touched[name] && <FormHelperText>{errors[name]}</FormHelperText>}
</FormControl>);
}