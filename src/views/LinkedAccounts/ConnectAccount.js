import { Divider, SwipeableDrawer, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React from 'react'

const ConnectAccount = (props) => {
    const { open, toggleDrawer } = props;
    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                sx={{

                    '& .MuiDrawer-paper': {
                        width: '40%',
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px',
                    }
                }}
            >
                <Stack sx={{ margin: "20px" }}>
                    <Typography variant='h3'>Connect LinkedIn Account</Typography>
                </Stack>
                <Divider />
            </SwipeableDrawer>
        </>
    )
}

export default ConnectAccount