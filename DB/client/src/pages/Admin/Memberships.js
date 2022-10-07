import React from 'react';

import {
  CircularProgress, Paper,
  Typography,
  Button,
  styled,
  Modal,
  Grid,
  TextField
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

import Box from "@mui/material/Box";

import axios from 'axios';
import { BASE_URL } from '../../config';
import { ApplicationForm, createData, modalStyle, StyledDataGrid } from './Applications';


const dataColumnsMembers = [
  {
    field: 'id',
    headerName: 'ID',
    width: 10,
  },
  {
    field: 'name',
    headerName: "Name",
    width: 200,
    flex: 1,
  },
  {
    field: 'email',
    headerName: "Email",
    width: 150,
    flex: 1,
  },
  {
    field: 'mobile',
    headerName: "Mobile",
    width: "150",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (

      <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
         <Button
         variant="contained"
         disableElevation
         size="small"
         textSizeSmall
         value={params.row.aid}
         onClick={params.row.handleView}
     >
       View
     </Button>
     </Box>
        ),
  },

]

export default class Membership extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: false,

      open: false,
      currentId: null,
      currentFormData: null
    }

    this.handleLoadApplications = this.handleLoadApplications.bind(this);
    this.handleViewApplication = this.handleViewApplication.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    this.handleLoadApplications();
  }

  handleViewApplication(e) {
    const id = e.target.value;

      var config = {
        method: 'get',
        url: `${BASE_URL}/api/membership/id/${id}`,
        headers: { }
      };
      
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.setState({
            currentId: id,
            currentFormData: response.data,
            open: true,
          })
        })
        .catch(function (error) {
          alert("Error opening data");
        });
  }

  handleOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false,
      currentId: null
    })
  }

  handleApproveApplication(e) {
    const id = e.target.value;
    alert(id);
  }

  handleLoadApplications() {
    this.setState({loading: true});

    const config = {
      method: 'get',
      url: `${BASE_URL}/api/membership/approved`,
    };

    axios(config)
    .then((response) => {
      const data = response.data;
      const res = []
      for (let i = 0; i < data.length; i++) {
        res.push(createData(i + 1, data[i], this.handleViewApplication, this.handleApproveApplication));
      }
      this.setState({
        members: res
      })
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    }).finally(() => {
      this.setState({loading: false});
    })
  }
 
  render() {
    return (<Box
      sx={{
        p: 0,
        m: 0,
        gap: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // maxWidth: 700s
      }}
  >
    <Modal open={this.state.open} onClose={this.handleClose}>
      <Box sx={modalStyle}>
        <ApplicationForm application_id={this.state.currentId} data={this.state.currentFormData}/>
      </Box>
    </Modal>
    <Paper
        variant="outlined"
        elevation={0}
        sx={{
          p: 1,
          mx: 0,
          my: 1,
          width: "100%",
          height: "100%",
          borderRadius: 1,
        }}
    >

        </Paper>
        </Box>
        )
  }
}