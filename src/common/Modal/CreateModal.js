import { Modal,Button,TextField,Box,Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const CreateModal = ({open,name,path,setModal})=>{
    const navigate = useNavigate(); 
    const {
        register,
        watch,
        control,
        reset,
        handleSubmit,
    }=useForm();

    const rename = async(data)=>{
        navigate('/campaigns/create',{
          state:{name:data?.name}
        });        
        setModal(false);

    }

    return(
        <Modal open={open} onClose={()=>{reset();setModal(false)}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          {/* Modal Title */}
          <Typography variant="h3" sx={{ mb: '20px', fontWeight: 600 }}>
            Create New Campaign
          </Typography>
  
          {/* Campaign Name Input */}
          <TextField
            label="New Campaign Name *"
            variant="outlined"
            fullWidth
            {...register(name,{required:'Name required'})}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
  
          {/* Create Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit(rename)}
            disabled={!watch(name)}
            sx={{
              background: "#1a5276",
              color: "white",
              py: 1,
              borderRadius: "8px",
              fontWeight: "400",
              fontSize:'16px',
              "&:hover": {
                bgcolor: "#1a5276",
              },
              "&:disabled": {
                bgcolor: "#f0f0f0",
                color: "#aaa",
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    );    
}

export default CreateModal;