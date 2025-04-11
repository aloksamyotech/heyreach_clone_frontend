import { Modal,Button,TextField,Box, Typography, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const RenameModal = ({title,open,name,path,setModal,rowData})=>{
    const {
        register,
        watch,
        control,
        reset,
        handleSubmit,
        setValue
    }=useForm();

    const rename = async(data)=>{
        alert("data is updated : ",path);
        console.log("data : ",data);        
        reset();
        setModal(false);
    }

    useEffect(()=>{
        if(rowData){
            setValue(name,rowData[name]);
        }
    })
    return(
        <Modal open={open} onClose={()=>{reset();setModal(false)}}>
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 3,
                borderRadius: 2,
                }}
            >
                <Box display="flex" justifyContent="end" alignItems="start" sx={{marginTop:'-20px'}}>
                    <IconButton onClick={()=>{setModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <Typography variant="h3" fontWeight="bold" align="center">
                        Rename {title}
                    </Typography>
                </Box>
                <Typography variant="body2" mb={3}>
                    Enter a new name for <strong>{rowData ? rowData[name] :''}</strong>
                </Typography>
                <TextField
                    fullWidth
                    label="New Name"
                    variant="outlined"
                    {...register(name,{required:'Title Required'})}
                    sx={{
                        background: "none !important",
                        color: "grey !important",
                        height:'45px',
                        borderRadius: "8px",
                        fontWeight: 400,
                        "& .css-7boqks-MuiFormLabel-root-MuiInputLabel-root":{
                          color:'grey !important'
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: "2px solid #e5e7eb !important",background:'none !important',color:'grey !important' }, // Removes default border
                          "&:hover fieldset": { border: "2px solid #e5e7eb !important",color:'grey !important' },
                          "&.Mui-focused fieldset": { border: "2px solid #e5e7eb !important",color:'grey !important' },
                        },

                      }}
                />
                <Box mt={2} textAlign="right">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(rename)}
                >
                    Confirm
                </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default RenameModal;