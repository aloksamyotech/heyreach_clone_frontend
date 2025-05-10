import { ArrowBackIos, ArrowForward, Edit } from "@mui/icons-material";
import { Stepper, Step, StepLabel, Container, Box, IconButton, Typography, Switch, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const steps = ["Campaign Performance","Sequence Performance","Sender Performance","Lead Analytics"];

export default function ViewCampaign() {
    const [tabvalue, setTabValue] = useState(0);
    const onNext = () => {
      setTabValue((prev) => prev + 1);
    };
    const {
      setValue,
      handleSubmit,
      register,
      watch,
      control
    } = useForm();
  
    const onBack = () => {
      setTabValue((prev) => prev - 1);
    };
  
    const onSubmit = (data) => {
      setTabValue((prev) => prev + 1);
      alert("Campaign Created Successfully!");
    };
    
    return (
      <Container>
        <Box width={'100%'} p={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton sx={{textAlign:'center'}}>
              <ArrowBackIos sx={{fontSize:'15px'}} />
            </IconButton>
            <Typography variant="h3">View Campaign</Typography>
          </Stack>
        </Box>

        <Box width={'100%'} p={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Switch />
              <Typography variant="h4">Software Engineer Campaign</Typography>
              <IconButton>
                <Edit />
              </IconButton>
            </Stack>
          </Stack>
          <Button bgcolor="#1c64f2" color="white">
            <Edit color="white" />
            Edit Campaign
          </Button>
        </Box>

        <Box width={'100%'} p={2} bgcolor={'white'}>
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
                    {tabvalue === 0 && <>Hello World</>}
                    {/* {tabvalue === 1 && <LinkedInAccount register={register} />}
                    {tabvalue === 2 && <CampaignFlowCreator />}
                    {tabvalue === 3 && <ReviewAndLaunch watch={watch}/>} */}
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
    );
}
