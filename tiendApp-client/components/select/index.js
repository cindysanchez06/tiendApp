import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
}));

export default function SelectCustom({label, options = [], name, handleChange, value}) {
  const classes = useStyles();
  
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{ label }</InputLabel>
        <Select
          labelId={`${label}-${name}`}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        >
        <MenuItem value=''>Seleccione</MenuItem>
        {
            options.map((option) => {
                return <MenuItem value={option.id}>{option.value}</MenuItem>
            })
        }
        </Select>
      </FormControl>
    </div>
  );
}
