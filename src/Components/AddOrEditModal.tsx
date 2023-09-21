import React, {ChangeEvent} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select, SelectChangeEvent,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {DesignationOptions} from "./ContactConstant";
import {addContact} from "./features/contacts/ContactSlice";
import {useDispatch} from "react-redux";
// import {useDispatch, useSelector} from "react-redux";

const FieldLabel = styled(InputLabel)(({theme})=>({
    position:'relative',
    transform:'none'
}))

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius:'8px'
,    boxShadow: 24,
};

export interface FormValues {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    id: string;
    designation: string;
    gender: string;
    expertise: string[];
}

const initialFormValues: FormValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    id: "",
    designation: "",
    gender: "",
    expertise: []
};


const AddOrEditModal:React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState<FormValues>(initialFormValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement | EventTarget>) => {
        const {name,value:inputValue,type,checked} = event.target as HTMLInputElement

        if (name === 'expertise') {
            // If it's a checkbox, toggle the value in the array
            setValue((prevValue) => ({
                ...prevValue,
                [name]: checked
                    ? [...prevValue[name], inputValue]
                    : prevValue[name].filter((item) => item !== inputValue),
            }));
        } else {
            setValue((prevState) => ({
                ...prevState,
                [name]: type === 'number' ? Number(inputValue) : inputValue
            }))
        }
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;

        // Handle select input
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    return (
        <Box sx={style}>
            <Box p={3}>
                <Typography variant={"h6"}>Create Contact</Typography>
            </Box>
            <Divider light/>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>First Name</FieldLabel>
                            <TextField type="text" name="first_name" value={value.first_name} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>Last Name</FieldLabel>
                            <TextField type="text" name="last_name" value={value.last_name} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>Phone</FieldLabel>
                            <TextField type="tel" name="phone" value={value.phone} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>Email</FieldLabel>
                            <TextField type="email" name="email" value={value.email} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>id</FieldLabel>
                            <TextField type="number" name="id" value={value.id} onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <FieldLabel>Designation</FieldLabel>
                            <Select name="designation" value={value.designation} onChange={handleSelectChange}>
                                {DesignationOptions?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <FieldLabel>Gender</FieldLabel>
                            <RadioGroup
                                name={"gender"}
                                value={value.gender}
                                onChange={handleChange}
                                sx={{ flexDirection: 'row' }}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <FieldLabel>expertize</FieldLabel>
                            <FormGroup sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    name="expertise"
                                    value="react"
                                    checked={value.expertise.includes('react')}
                                    onChange={handleChange}
                                    label="React"
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    name="expertise"
                                    value="node"
                                    checked={value.expertise.includes('node')}
                                    onChange={handleChange}
                                    label="Node"
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    name="expertise"
                                    value="java"
                                    checked={value.expertise.includes('java')}
                                    onChange={handleChange}
                                    label="JAVA"
                                />
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    name="expertise"
                                    value="php"
                                    checked={value.expertise.includes('php')}
                                    onChange={handleChange}
                                    label="php"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>
            <Divider light/>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"} spacing={2} p={3}>
                <Button>Cancel</Button>
                <Button variant={"contained"} onClick={() =>dispatch(addContact(value))}>Save</Button>
            </Stack>
        </Box>
    );
};

export default AddOrEditModal;