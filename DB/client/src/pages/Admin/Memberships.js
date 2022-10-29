import React from "react";

import {
  CircularProgress,
  Paper,
  Typography,
  Button,
  styled,
  Modal,
  Grid,
  TextField,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Box from "@mui/material/Box";

import axios from "axios";

import { BASE_URL } from "../../config";

import {
  ApplicationForm,
  createData,
  modalStyle,
  StyledDataGrid,
} from "./Applications";
import MemberPage, { MemberPageModal } from "./modals/MemberPage";

const dataColumnsMembers = [
  {
    field: "id",
    headerName: "ID",
    width: 10,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    flex: 1,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: "150",
    flex: 1,
  },
  {
    field: "balance",
    header: "Balance",
    width: "150",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Actions",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
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
];

function titleCase(str) {
  str = str.toLowerCase();
  str = str.split("_");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

function formatDate(date) {
  if (!date) return "None";
  const d = new Date(date);
  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
  // console.log(d);
  return d.toLocaleDateString("en-UK");
}


export default class Membership extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      loading: false,

      open: false,
      currentId: null,
      currentFormData: null,

      add_amount: 1500,
    };

    this.handleLoadApplications = this.handleLoadApplications.bind(this);
    this.handleViewApplication = this.handleViewApplication.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

    this.handleSubmitAmount = this.handleSubmitAmount.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);

    this.handleUpdateMember = this.handleUpdateMember.bind(this);
    this.handleDeleteMember = this.handleDeleteMember.bind(this);
  }

  componentDidMount() {
    this.handleLoadApplications();
  }

  handleViewApplication(e) {
    const id = e.target.value;
    const { members } = this.state;

    for (let i = 0; i < this.state.members.length; i++) {
        
      if (members[i].aid == id) {
        var config1 = {
          method: 'get',
          url: `http://localhost:8000/api/health/member/${id}`,
        };
    
        axios(config1)
          .then((response) => {
            console.log("Viws");
            console.log(response.data);
  
            this.setState({
              currentHealthData: response.data,
              currentId: id,
              currentFormData: members[i].data,
              open: true,
            });
          })
          .catch(function (error) {
            console.log(error);
            alert("Error");
          });

        // this.setState({
        //   currentId: id,
        //   currentFormData: members[i].data,
        //   open: true,
        // });
        return;
      }
    }

    var config = {
      method: "get",
      url: `${BASE_URL}/api/membership/id/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      crossDomain: true,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({
          currentId: id,
          currentFormData: response.data,
          open: true,
        });
      })
      .catch(function (error) {
        alert("Error opening data");
      }).finally(() => {
        console.log(this.state.currentFormData);
        var config1 = {
          method: 'get',
          url: `http://localhost:8000/api/health/member/${this.state.currentFormData._id}`,
        };
    
        axios(config1)
          .then((response) => {
            console.log("Viws");
            console.log(response.data);

            this.setState({
              currentHealthData: response.data
            });
          })
          .catch(function (error) {
            console.log(error);
            alert("Error");
          });
      });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
      currentId: null,
    });
  }

  handleApproveApplication(e) {
    const id = e.target.value;
    alert(id);
  }

  async handleLoadApplications() {
    this.setState({ loading: true });

    const config = {
      method: "get",
      url: `${BASE_URL}/api/membership/`,
      headers: {
        "Access-Control-Allow-Origin": "*", // stein
      },
    };

    const data = []; //  [{"_id":"631f375510e7ddcd8e9a0c73","first_name":"Key","last_name":"Peele","single_name":"Key","aka":"Keyl","mobile":"0718817287","email":"joe@hotmail.com","home_phone":"0985555222","work_phone":"","member_id":"00001","street_address":"Home Ground, Corner X, City Y","suburb":"Home Ground","state":"SA","dob":"1978-08-08T21:00:00.000Z","date_of_membership":"2002-12-31T21:00:00.000Z","approved":false,"__v":0},{"_id":"631f37b210e7ddcd8e9a0c75","first_name":"John","last_name":"Preston","single_name":"John","aka":"jp11","mobile":"071882121287","email":"jp@ton.com","home_phone":"04343555222","work_phone":"32323","member_id":"00002","street_address":"24 XY Street","suburb":"XY","state":"SP","dob":"1988-08-08T20:00:00.000Z","date_of_membership":"2003-01-04T21:00:00.000Z","approved":true,"__v":0}];
    const res = [];
    for (let i = 0; i < data.length; i++) {
      res.push(
        createData(
          i + 1,
          data[i],
          this.handleViewApplication,
          this.handleApproveApplication
        )
      );
    }
    this.setState(
      {
        members: res,
      },
      () => {
        if (this.state.currentId) {
          for (let i = 0; i < this.state.members.length; i++) {
            if (this.state.members[i].aid === this.state.currentId) {
              this.setState({
                currentFormData: this.state.members[i].data,
                open: true,
              });
              return;
            }
          }
        }
      }
    );

    axios(config)
      .then((response) => {
        const data = response.data;
        const res = [];
        for (let i = 0; i < data.length; i++) {
          res.push(
            createData(
              i + 1,
              data[i],
              this.handleViewApplication,
              this.handleApproveApplication
            )
          );
        }
        this.setState({
          members: res,
        });
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleChangeAmount(e) {
    console.log("Change");
    console.log(e.target.value);
    // this.setState({
    //   add_amount: e.target.value
    // })
  }

  handleUpdateMember() {
    const data = this.state.currentFormData;
    delete data['_id'];
    delete data['__v'];

    console.log(data);

    var config = {
      method: 'put',
      url: `${BASE_URL}/api/membership/update/id/${this.state.currentId}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
      .then((response) => {
        this.handleLoadApplications();
        alert("Success");
        console.log(JSON.stringify(response.data));

        // this.handleLoadApplications();
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed");
      })

  }

  handleDeleteMember() {
    if (!this.state.currentId) return

    var config = {
      method: 'delete',
      url: `${BASE_URL}/api/membership/delete/${this.state.currentId}`,
      headers: { }
    };

    axios(config)
      .then((response) => {
        this.setState({
          open: false,
          currentId: null,
          currentFormData: null
        });
        this.handleLoadApplications();
        console.log(JSON.stringify(response.data));
       // alert("Deleted");
      })
      .catch(function (error) {
        console.log(error);
        alert("Failure");
      });

  }

  handleChangeField(e) {
    const id = e.target.id;
    const value = e.target.value;
    console.log(`${id} - ${value}`)
    this.setState({
      currentFormData: ({...this.state.currentFormData, [id]: value})
    });
  }

  handleSubmitAmount() {
    var data = {
      amount: this.state.add_amount,
    };

    const id = this.state.currentFormData
      ? this.state.currentFormData.member_id
      : null;

    var config = {
      method: "put",
      url: `${BASE_URL}/api/membership/fund/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("Success");
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data["message"]);
      })
      .finally(() => {
        this.handleLoadApplications();
      });
  }

  render() {
    const data = this.state.currentFormData;

    const itemList = [];

    if (data)
    for (const [key, value] of Object.entries(data)) {
      itemList.push(
        <Grid item xs={12} md={6} sm={6} lg={6}> { key !== "dob" && key !== "date_of_membership" ?
          <TextField
            id={key}
            label={titleCase(key)}
            value={value}
            size="small"
            sx={{ maxWidth: "100%", width: 320 }}
            onChange={this.handleChangeField}
            // InputProps={{
            //   readOnly: false,
            // }}
          />
          :
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
             id={key}
             label={titleCase(key)}
             value={value}
             onChange={(f) => f}
             readOnly={true}
            renderInput={(params) => <TextField {...params}  size="small"  InputProps={{
              readOnly: false,
            }}  sx={{ maxWidth: "100%", width: 320 }} />}
          /> 
        </LocalizationProvider>
        }
        </Grid>
      )
    }


    return (
      <Box
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, m: 1 }}>
          <Typography variant="h5" component="div" gutterBottom>
            Memberships
          </Typography>
        </Box>

        <Modal open={this.state.open} onClose={this.handleClose}>
          {/* <MemberPage memberData={this.state.currentFormData} healthData={this.state.currentHealthData} /> */}
          <Box sx={{...modalStyle, minWidth: '70%'}}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle1">Member Details</Typography>
                  {/* <ApplicationForm
                    application_id={this.state.currentId}
                    data={this.state.currentFormData}
                  /> */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Grid container spacing={2} sx={{ maxWidth: 700 }}>
                        {itemList}
                      </Grid>
                    </Box>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%",
                    maxHeight: "100%",
                  }}
                >
                  <Box
                    sx={{
                      margin: 0,
                      maxHeight: 200,
                      minWidth: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle1">Finances</Typography>
                    <Paper
                      variant="outlined"
                      sx={{ margin: 0, padding: 1, minWidth: 200 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "100%",
                          minHeight: "100%",
                          gap: 1,
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <TextField
                              label="Add Amount"
                              size="small"
                              value={this.state.add_amount}
                              onClick={this.handleChangeAmount}
                              sx={{ maxWidth: "100%", width: 320 }}
                              InputProps={{
                                readOnly: false,
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              variant="outlined"
                              sx={{ minwidth: "100%" }}
                              onClick={this.handleSubmitAmount}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} spacing={1}>
                            <TextField
                              label="Balance"
                              size="small"
                              value={
                                this.state.currentFormData
                                  ? this.state.currentFormData.account_balance
                                  : null
                              }
                              sx={{ maxWidth: "90%", width: 320, mr: 1 }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Spent"
                              size="small"
                              sx={{ maxWidth: "90%", width: 320 }}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      margin: 0,
                      minHeight: 200,
                      minWidth: "100%",
                      maxHeight: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Health Applications
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        margin: 0,
                        height: 350,
                        maxHeight: "100%",
                        minWidth: 200,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "100%",
                          minHeight: "100%",
                        }}
                      >
                        
                        {
                        
                        this.state.currentHealthData ? 
                        
                        (

                          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {
                              this.state.currentHealthData.map(h_data => (
                                <ListItem divider>
                                  <ListItemText primary={h_data.reason} secondary={`\$${h_data.amount} - ${formatDate(h_data.date)}`} />
                                </ListItem>
                              ))
                            }
                          </List>

                        ) : "" 
                        
                        }
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    width: "100%",
                    maxHeight: "100%",
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'gray',
                    p: 2,
                  }}
                >
                  <Button variant="contained" color="success" disableElevation onClick={this.handleUpdateMember}>
                    Update
                  </Button>

                  <Button variant="contained" color="error" disableElevation onClick={this.handleDeleteMember}>
                    Delete
                  </Button>


                </Box>
              </Grid>
            </Grid>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 500,
            }}
          >
            {this.state.loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: 450,
                  m: 0,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <StyledDataGrid
                rows={this.state.members}
                columns={dataColumnsMembers}
                pageSize={20}
                rowsPerPageOptions={[50]}
                disableSelectionOnClick
              />
            )}
          </Box>
        </Paper>
      </Box>
    );
  }
}
