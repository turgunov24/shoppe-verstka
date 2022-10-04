import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function ProfilePageTab({ setProfilePageTabValue }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setProfilePageTabValue(newValue);
  };

  return (
    <div className="border-b border-borderGray">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        textColor="inherit"
        className={value == 0 ? "mt-0" : "mt-44 md:mt-[180px]"}
      >
        <Tab id="profile-page-tab-categories" label="Dashboard" />
        <Tab id="profile-page-tab-categories" label="Orders" />
        <Tab id="profile-page-tab-categories" label="Downloads" />
        <Tab id="profile-page-tab-categories" label="Adresses" />
        <Tab id="profile-page-tab-categories" label="Account details" />
        <Tab id="profile-page-tab-categories" label="Logout" />
      </Tabs>
    </div>
  );
}
