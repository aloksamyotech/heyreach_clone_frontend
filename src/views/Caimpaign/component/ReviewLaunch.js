import { Chip, Typography,Box  } from "@mui/material";
import { Container } from "@mui/system";

export function ReviewAndLaunch({watch}){
   return (
    <Container>
        <Box width={'100%'} p={2} sx={{textAlign:'center'}}>
            <Typography variant="h3">Hooray!&#127881;</Typography>
            <Typography variant="h5" fontWeight={'600'} py={1}>You are about to launch the <Chip label={watch('name')}/> campaign using <Chip label=" Dipesh Dabi "/> for your <Chip label="Software Engineer List"/>!</Typography>
        </Box>
    </Container>
   )
}