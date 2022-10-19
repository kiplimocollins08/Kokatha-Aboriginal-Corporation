import React from 'react';

import {Box, Tab, Tabs, Typography, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import Applications from './Applications';
import Membership from './Memberships';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`game-manager-tabpanel-${index}`}
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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `game-manager-tab-${index}`,
    'aria-controls': `game-manager-tabpanel-${index}`
  }
}

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({
      value: newValue
    })
  }

  render() {
    const { value } = this.state;

    const handleTabChange = (e, newValue) => {
      this.handleChange(newValue);
    }

    return (
      <Box sx={{p: 1}}>
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
              borderColor: 'divider'
            }}
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="game manager tabs"
            >
              <Tab label="Health Applications" {...a11yProps(0)}/>
              <Tab label="Members" {...a11yProps(1)}/>
            </Tabs>
          </Box>
          <TabPanel index={0} value={value}>
            <Applications />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <Membership />
          </TabPanel>
          </Box>
        </Container>
      </Box>
    )
  }
}

export default function Admin(props) {
  return <AdminPage {...props} />
}