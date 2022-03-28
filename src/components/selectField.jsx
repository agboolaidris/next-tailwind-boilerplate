import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//@INFO: component for selectField
//@PROPS: handleChange {(e:event)=> void}
//@PROPPS: value:string
//@PROPPS: placeholder:string
//@PROPS: items:{value:any, title:string}[]
//@PROPS: name:string
export default function BasicSelect({
  handleChange,
  value,
  placeholder,
  name,
  items,
}) {
  return (
    <Box sx={{ minWidth: 300, maxWidth: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          label="Age"
          onChange={handleChange}
        >
          {items.length > 0 &&
            items.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.title}
              </MenuItem>
            ))}{" "}
        </Select>
      </FormControl>
    </Box>
  );
}
