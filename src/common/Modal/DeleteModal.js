import { Modal,Button,Box, Typography } from "@mui/material";

const DeleteModal = ({open,name,path,setDeleteModal,rowData})=>{
    // const {
    //     register,
    //     watch,
    //     control,
    //     reset,
    //     handleSubmit,
    //     setValue
    // }=useForm();

    const deleteData = async()=>{
        console.log("path",path);        
        alert("data is updated : ",rowData);
        setDeleteModal(false);
    }

    return(
        <Modal open={open} onClose={()=>{reset();setDeleteModal(false)}}>
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
                <Typography variant="h3" textAlign={'center'} mb={3}>
                    Are Sure You Want to Delete <strong>{rowData ? rowData[name] :''}</strong>
                </Typography>
                {/* <Box mt={2} display={'flex'} justifyContent={'center'} alignItems={'center'}> */}
                    <Button
                        variant="outlined"
                        sx={{display:'inline-block',margin:'0 10px 0 90px'}}
                        onClick={()=>{setDeleteModal(false)}}
                    >
                        Cancel  
                    </Button>
                    <Button
                        variant="contained"
                        sx={{color:'white',background:'rgba(239, 68, 68, 1)',display:'inline-block',}}
                        onClick={()=>{deleteData()}}
                    >
                        Confirm
                    </Button>
                {/* </Box> */}
            </Box>
        </Modal>
    )
}

export default DeleteModal;