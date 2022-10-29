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

import { BASE_URL } from '../../config';

import UploadFileIcon from "@mui/icons-material/UploadFile";

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      update_amount: 1500,
      loading_update_amount: false,

      uploading_members: false,


      members_file: null,
      health_file: null,
    }

    this.handleUpdateAmount = this.handleUpdateAmount.bind(this);
    this.handleMembersFileUpload = this.handleMembersFileUpload.bind(this);
  }

  handleMembersFileUpload(e) {
    if (!e.target.files) {
      return
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("members", file);

    const options = {
      method: 'POST',
      url: `${BASE_URL}/api/membership/upload`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }

    axios.request(options).then((response) => {
      alert("Uploaded Successfully");
    }).catch((error) => {
      alert("Failed to upload");
      console.log(error.response.data);
    }).finally(() => {
      this.setState({
        uploading_members: false
      })
    })
  }

  handleUpdateAmount() {
    this.setState({
      loading_update_amount: true
    })

    var config = {
      method: 'put',
      url: `${BASE_URL}/api/membership/fund/`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        "amount": this.state.update_amount
      }
    };


    axios(config)
      .then(function (response) {
        alert("Success");
      })
      .catch(function (error) {
        alert("Failed");
      }).finally(() => {
        this.setState({
          loading_update_amount: false
        })
      })

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
            {/* <Typography>
              Fund All Members
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, my: 0 }}>
              <TextField
                id="tx_fund_amount"
                label="Amount"
                value={this.state.update_amount}
                size="small"
                sx={{ maxWidth: "100%", width: 320 }}
                InputProps={{
                  readOnly: false,
                }}
              />

              <LoadingButton 
                variant="contained"
                loading={this.state.loading_update_amount}
                onClick={this.handleUpdateAmount}
                disableElevation>
                Fund Accounts
              </LoadingButton>
            </Box> */}


            <Typography>
              Upload Existing Members (.csv file)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>

              <LoadingButton
                loading={this.state.uploading_members}
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
                disableElevation
              >
                Upload Profile
                <input type="file" hidden accept=".csv" onChange={this.handleMembersFileUpload}/>
              </LoadingButton>
            
            </Box>
            <Divider />
          </Box>
        </Box>
    );
  }
}