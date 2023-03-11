import React from "react";
import { ReactComponent as Help } from "../../assets/images/help.svg";
import { ReactComponent as Trash } from "../../assets/images/trash.svg";
import { ReactComponent as Close } from "../../assets/images/Close.svg";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./dashboard.scss";

const noteTypeList = [
  {
    title: "Progress note - 80 left",
    value: "Progress note",
  },
  {
    title: "Soap note - 80 left",
    value: "Soap note",
  },
  {
    title: "EMDR note - 80 left",
    value: "EMDR note",
  },
  {
    title: "Couples therapy note - 80 left",
    value: "Couples therapy note",
  },
  {
    title: "Family therapy note - 80 left",
    value: "Family therapy note",
  },
];

const Dashboard = () => {
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [noteType, setNoteType] = React.useState("");
  const [client, setClient] = React.useState("")
  const [uploadList, setUploadList] = React.useState([]);

  const handleChange = (e) => {
    setNoteType(e.target.value);
  };

  const handleChangeClient = (e) => {
    setClient(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        // return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handlOnSubmit = () => {
    if (noteType && client !== "") {
      setOpen(false);
      uploadList.push({ id: "", client: noteType, type: client })
    }
  };

  const handleDelete = () => {
    setUploadList("")
    setUploadList([])
  }

  return (
    <div className="dashboard">
      <Container maxWidth="lg">
        <h6 className="dashboard__heading">
          Hi, Maria
          <Help />
        </h6>
        <div className="dashboard__head">
          <h4 className="dashboard__title">Upload your session's recordings</h4>
          <Button variant="contained" className="btn" onClick={handleClickOpen}>
            Upload
          </Button>
        </div>
        <div className="uploadedData">
          <div className="uploadedData__status">
            <span>2</span>Notes in progress
          </div>
          <div className="uploadedData__table">
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Client</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>ETA</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uploadList.length > 0 ? uploadList.map((item, i) => (
                    <TableRow>
                      <TableCell>{item?.client}</TableCell>
                      <TableCell>{item?.type}</TableCell>
                      <TableCell>
                        <Box className="progressBox">
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <span>
                          <Trash onClick={handleDelete} />
                        </span>
                      </TableCell>
                    </TableRow>
                  )) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          className="uploadModel"
          aria-labelledby="draggable-dialog-title"
        >
          <Button
            autoFocus
            onClick={handleClose}
            className="uploadModel__closeBtn"
          >
            <Close />
          </Button>
          <DialogContent className="uploadModel__body">
            <h5 className="uploadModel__title">Complete Your Upload</h5>
            <p className="uploadModel__text">
              Fill in the details below to complete your upload
            </p>
            <div className="uploadModel__form">
              <FormControl>
                <Select
                  value={noteType}
                  onChange={handleChange}
                  placeholder="Select note type"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" style={{ display: "none" }}>
                    <em>Select note type</em>
                  </MenuItem>
                  {noteTypeList.map((typeItem, id) => (
                    <MenuItem key={id} value={typeItem.value}>
                      {typeItem.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="Enter client name"
                name="city"
                value={client}
                onChange={handleChangeClient}
              />
              <Button onClick={handlOnSubmit} className="btn uploadModel__btn">Finish Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default Dashboard;
