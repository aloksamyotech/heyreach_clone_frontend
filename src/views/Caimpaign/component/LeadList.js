import { TextField, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export default function LeadList({ control }) {
    return (
        <Grid container>
            <Grid item xs={6} sm={6} md={6} p={2}>
                <Typography variant="h5" fontWeight="500" px={1} pb={1} mb={1}>
                    Campaign Name *
                </Typography>
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "2px solid #e5e7eb !important", color: "grey !important", borderRadius:'8px', },
                                    "&:hover fieldset": { border: "2px solid #e5e7eb !important", color: "grey !important", borderRadius:'8px' },
                                    "&.Mui-focused fieldset": { border: "2px solid #e5e7eb !important", color: "grey !important", borderRadius:'8px' },
                                },
                            }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            fullWidth
                            placeholder="Enter Campaign Name"
                        />
                    )}
                />
                <Typography variant="h5" fontWeight="500" p={1} my={1}>
                    Select the list of leads you want to reach out to
                </Typography>
                <FormControl fullWidth error={!!control.listId}>
                    <Controller
                        control={control}
                        name="listId"
                        render={({ field, fieldState: { error } }) => (
                            <Select
                                {...field}
                                fullWidth
                                labelId="demo-simple-select-label"
                                sx={{
                                    background: "none !important",
                                    border: "2px solid #e5e7eb !important",
                                    color: "grey !important",
                                    borderRadius: "8px",
                                    fontWeight: 400,
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-select": {
                                        padding: "10px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "grey !important",
                                        background: "none",
                                    },
                                }}
                            >
                                <MenuItem key={1} value={1}>
                                    List 1
                                </MenuItem>
                                <MenuItem key={2} value={2}>
                                    List 2
                                </MenuItem>
                                <MenuItem key={3} value={3}>
                                    List 3
                                </MenuItem>
                                <MenuItem key={4} value={4}>
                                    List 4
                                </MenuItem>
                                <MenuItem key={5} value={5}>
                                    List 5
                                </MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6} p={2}></Grid>
        </Grid>
    );
}
