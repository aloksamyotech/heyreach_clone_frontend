import { Modal,Button,TextField,Box, Typography, IconButton, Alert, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const ImportModal = ({open,name,path,setImportModal,rowData})=>{
    const {
        register,
        watch,
        control,
        reset,
        handleSubmit,
        setValue
    }=useForm();

    const rename = async(data)=>{
        alert("daat is updated : ",data);
        alert("daat is path : ",path);
        reset();
        setImportModal(false);
    }

    useEffect(()=>{
        if(rowData){
            setValue(name,rowData[name]);
        }
    })
    return(
        <Modal open={open} id="importModal"  onClose={()=>{reset();setImportModal(false)}}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Box display="flex" justifyContent="end" alignItems="start" sx={{marginTop:'-20px'}}>
                    <IconButton onClick={()=>{setImportModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <Typography variant="h3" fontWeight="bold" align="center">
                        Import From Spreadsheet
                    </Typography>
                </Box>
                <Alert severity="info" variant='outlined' sx={{color:'#1c64f2',margin:'20px 0'}}> *Make sure you have the mandatory fields First Name, Last Name and LinkedIn Profile URL populated within the CSV file. In case you have some empty cells in the CSV file, we will still import it, but will exclude the whole row where theres a missing data for the mandatory fields.</Alert>
                <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{height:'45px',border:'2px solid #e5e7eb',borderRadius:'10px'}}>
                    <TextField
                        type="file"
                        variant="outlined"
                        textAlign="center"
                        inputProps={{ accept: "image/*" }}
                        {...register(name,{required:'File Required'})}
                        sx={{
                                background: "none",
                                height:'45px',
                                "& .MuiOutlinedInput-root": {
                                    background:'none !important',
                                "& fieldset": { border: "none",background:'none !important' }, // Removes default border
                                "&:hover fieldset": { border: "none",background:'none !important' },
                                "&.Mui-focused fieldset": { border: "none",background:'none !important' },
                            }
                        }}
                    >
                        <label htmlFor="file-upload">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{
                                backgroundColor: "transparent",
                                color: "#6b7280",
                                border: "1px solid #6b7280",
                                "&:hover": { backgroundColor: "rgba(107, 114, 128, 0.1)" },
                                }}
                            >
                                Upload File
                            </Button>
                            </label>
                    </TextField>
                    {/* <Typography variant="h5" fontWeight={'400'} color={'grey'} >Upload Spreadsheet | 0 leads to import</Typography> */}
                </Grid>    
                <Box mt={2} textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{display:'inline-block',margin:'0 auto',}}
                    onClick={handleSubmit(rename)}
                >
                    Import
                </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ImportModal;