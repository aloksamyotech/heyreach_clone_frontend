import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableHead,
  TableCell,
  Table,
  TableBody,
  TableRow,
  Tooltip,
  Tabs,
  Tab,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowBack, ArrowBackIos, ArrowForward, MessageOutlined, PersonOutline } from '@mui/icons-material';
import ActionMenu from 'common/ActionMenu/ActionMenu';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RenameModal from 'common/Modal/RenameModal';
import DeleteModal from 'common/Modal/DeleteModal';
import CreateModal from 'common/Modal/CreateModal';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import LeadList from './LeadList';
import LinkedInAccount from './LinkedInAccount';
import CampaignFlowCreator from './Campaign';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './createcampaign.css';
import { ReviewAndLaunch } from './ReviewLaunch';

const steps = ["List of Leads","LinkedIn Senders","Sequence","Review & Launch"];

const CreateCampaing = ()=>{
    const location = useLocation();
    const [tabvalue, setTabValue] = useState(0);

    const onNext = () => {
        setTabValue((prev) => prev + 1);
      };
    
      const onBack = () => {
        setTabValue((prev) => prev - 1);
      };
    
      const onSubmit = (data) => {
        setTabValue((prev) => prev + 1);
        alert("Campaign Created Successfully!");
      };
    
    const {
        setValue,
        handleSubmit,
        register,
        watch,
        control
    } = useForm();
    
    useEffect(()=>{
       setValue('name',location.state.name);
    },[])
    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" mb={2} justifyContent={'flex-start'}>
                <IconButton>
                    <ArrowBackIos fontSize='14px'/>
                </IconButton>
                <Typography variant="h2">Create Campaign</Typography>
            </Stack>
            <Box width="100%" sx={{ background: 'white', borderRadius: '0' }} py={2}>
                <Stepper activeStep={tabvalue} sx={{borderBottom:'1px solid #c3bebe',paddingInline:'10px',paddingBottom:'15px'}}>
                    {
                        steps?.map((step,index)=>(
                            <Step key={index} completed={tabvalue > index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                <Box sx={{ mt: 3,px:1 }}>
                    {tabvalue === 0 && <LeadList control={control}/>}
                    {tabvalue === 1 && <LinkedInAccount register={register} />}
                    {tabvalue === 2 && <CampaignFlowCreator />}
                    {tabvalue === 3 && <ReviewAndLaunch watch={watch}/>}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button disabled={tabvalue === 0} variant='contained' sx={{background:'#1c64f2'}} onClick={onBack}>
                            Back
                        </Button>
                        {tabvalue === steps.length - 1 ? (
                            <Button variant="contained" sx={{background:'#1c64f2'}} onClick={handleSubmit(onSubmit)}>
                                <ArrowForward color='white' fontSize='15px'  />Launch Campaign
                            </Button>
                        ) : (
                            <Button variant="contained" sx={{background:'#1c64f2'}} onClick={onNext}>
                                Continue
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
        </>
    )
}

export default CreateCampaing;