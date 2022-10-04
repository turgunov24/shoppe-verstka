import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CalculateShippingSelects() {
  const [country, setCountry] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);

  return (
    <div className="flex flex-col gap-3">
      <FormControl
        variant="standard"
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Select a Country
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          label="Select a Country"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="city"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Post code/ zip
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          label="Post code/ zip"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
