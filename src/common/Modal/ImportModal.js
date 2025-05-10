import React, { useState } from "react";
import { Modal, Box, Typography, Button, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImportModal = ({ open,name, setImportModal,rowData,path }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Modal open={open} onClose={()=>{setImportModal(false)}}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          outline: "none",
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Import from Spreadsheet
        </Typography>

        {/* Information Box */}
        <Box
          p={2}
          mt={2}
          sx={{
            // border: "2px solid #3f51b5",
            borderRadius: "8px",
            // backgroundColor: "#f5f5ff",
            textAlign: "center",
          }}
        >
          <Alert severity="info" variant='outlined' sx={{color:'#1c64f2'}}> 
            *Make sure you have the mandatory fields First Name, Last Name,
            and LinkedIn Profile URL populated within the CSV file.
            <br />
            Rows with missing mandatory data will be excluded.
          </Alert>
        </Box>

        {/* File Upload Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={2}
          p={2}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <input
            type="file"
            accept=".csv"
            id="upload-file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload spreadsheet
            </Button>
          </label>
          <Typography variant="body2" mt={1} color="textSecondary">
            {fileName ? fileName : "0 leads to import"}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={()=>{setImportModal(false)}} color="error">
            Cancel
          </Button>
          <Button
            onClick={()=>{setImportModal(false)}}
            color="primary"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Import
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImportModal;
