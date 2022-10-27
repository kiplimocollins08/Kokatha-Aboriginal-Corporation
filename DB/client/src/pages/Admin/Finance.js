import React from 'react';

import {
  CircularProgress, Paper,
  Typography,
  Button,
  styled,
  Modal,
  Grid,
  TextField,
  Divider
} from "@mui/material";

import Box from "@mui/material/Box";

import axios from 'axios';
import { LoadingButton } from '@mui/lab';
export class Finance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 500 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Finance
          </Typography>
        </Box>
        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}> 
          <Grid container>
            <Grid item xs={5}>
              <Box>
                
              </Box>
            </Grid>
            <Grid item xs={7}>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }
}