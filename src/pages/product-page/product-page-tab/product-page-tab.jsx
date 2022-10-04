import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function ProductPageTab({ setProductPageTabValue }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setProductPageTabValue(newValue);
  };

  return (
    <div className="hidden md:block border-b border-borderGray">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        textColor="inherit"
      >
        <Tab label="Desciption" />
        <Tab label="Additional information" />
        <Tab label="Reviews" />
      </Tabs>
    </div>
  );
}
