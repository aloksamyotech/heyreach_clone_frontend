import { Stack, Button, Container, Typography, Box, Card, SwipeableDrawer } from '@mui/material';
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectAccount from './ConnectAccount';

const LinkedAccounts = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (openDrawer) => {
        setOpenDrawer(openDrawer);
    };

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
                    <Typography variant="h2">LinkedIn Accounts</Typography>
                    <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                        <Button variant="contained" startIcon={<LinkedInIcon />} onClick={() => toggleDrawer(true)}>
                            Connect Account
                        </Button>
                    </Stack>
                </Stack>
                <ConnectAccount open={openDrawer} toggleDrawer={toggleDrawer} />
            </Container>
        </>
    )
}

export default LinkedAccounts;