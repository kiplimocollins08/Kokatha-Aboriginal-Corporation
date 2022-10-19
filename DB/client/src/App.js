import React from 'react';

import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { theme } from './Mtheme';

function TopAppBar(props) {
  const { navigate } = props;

  const handleLoginPage = () => {
    navigate("/login");
  }

  const handleHomePage = () => {
    navigate("/");
  }

  const handleApplyPage = () => {
    navigate("/application");
  }

  const handleAdminPage = () => {
    navigate("/admin");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHomePage}
          >
            <HomeRoundedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          <Button color="inherit" onClick={handleApplyPage}>Add Member</Button>

          <Button color="inherit" onClick={handleAdminPage}>Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Kokatha Membership Database"
    }

    this.handleSetTitle = this.handleSetTitle.bind(this);
  }

  handleSetTitle(title) {
    this.setState({
      title: title
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <React.Fragment>
          <CssBaseline />
          <Box
            sx={{
              p: 0,
              m: 0,
              position: "relative",
              w: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TopAppBar title={this.state.title} navigate={this.props.navigate} />

            <Outlet setTitle={this.handleSetTitle} />
          </Box>
      </React.Fragment>
      </ThemeProvider>
    )
  }
}


export default function App(props) {
  const navigate = useNavigate();

  return <AppComponent {...props} navigate={navigate} />
}