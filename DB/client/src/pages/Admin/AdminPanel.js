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

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 500 }}>
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 1 }}>
            <Typography variant="h5" component="div" gutterBottom>
              Admin Panel
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 1 }}>
            <Typography>
              Fund All Members
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, my: 0 }}>
              <TextField
                id="tx_fund_amount"
                label="Amount"
                value={1000}
                size="small"
                sx={{ maxWidth: "100%", width: 320 }}
                InputProps={{
                  readOnly: false,
                }}
              />

              <LoadingButton 
                variant="contained"
                disableElevation>
                Fund Accounts
              </LoadingButton>
            </Box>
            <Divider />


            <Typography>
              Upload Existing Members (.csv file)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            
              <Button variant="contained" disableElevation>
                Fund Accounts
              </Button>
            </Box>
            <Divider />
          </Box>
        </Box>
    );
  }
}