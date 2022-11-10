import React from "react";

import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Applications from "./Applications";
import Membership from "./Memberships";
import AdminPanel from "./AdminPanel";
import { Finance } from "./Finance";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`admin-tabpanel-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{p: 3}}>
              {children}
            </Box>
        )}
      </div>
  )
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
}

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({
      value: newValue,
    });
  }

  render() {
    const { value } = this.state;

    const handleTabChange = (e, newValue) => {
      this.handleChange(newValue);
    };

    return (
      <Box sx={{ p: 1, width: '100%' }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: '100%'
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
             <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="game manager tabs"
            >
                <Tab label="Panel" {...a11yProps(0)} />
                {/* <Tab label="Health Applications" {...a11yProps(1)} /> */}
                <Tab label="Members" {...a11yProps(2)} />
                <Tab label="Finance" {...a11yProps(3)} />
              </Tabs>

              </Box>

              <TabPanel index={0} value={value}>
                <AdminPanel />
              </TabPanel>
              {/* <TabPanel index={1} value={value}>
                <Applications />
              </TabPanel> */}
              <TabPanel index={1} value={value}>
                <Membership />
              </TabPanel>
              <TabPanel index={2} value={value}>
                <Finance />
              </TabPanel>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default function Admin(props) {
  return <AdminPage {...props} />;
}
