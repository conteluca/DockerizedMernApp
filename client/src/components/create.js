import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
const initialForm = {
    person_name: "",
    person_position: "",
    person_level: "intern",
}
export default function Create() {
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(key,value) {
        setForm({...form,[key]: value})
    }
    function loadData() {
        axios.post(`http://localhost:5000/record/add`,form)
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                navigate('/');
            })
    }

    // This following section will display the form that takes the input from the user.
    return (
        <Container maxWidth={'xl'} sx={{textAlign: 'center'}}>
            <Typography variant={"h3"}>Create New Record</Typography>
            <Stack spacing={2} maxWidth={'xl'} margin={4} justifyContent="center"
                   alignItems="center">
                <TextField label={'Name'} value={form.person_name} onChange={event => updateForm("person_name",event.target.value)}/>
                <TextField label={'Position'} value={form.person_position}  onChange={event => updateForm("person_position",event.target.value)}/>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Level</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={form.person_level}
                    onChange={event => updateForm("person_level",event.target.value)}>
                    <FormControlLabel value="intern" control={<Radio />} label="Intern" />
                    <FormControlLabel value="junior" control={<Radio />} label="Junior" />
                    <FormControlLabel value="senior" control={<Radio />} label="Senior" />
                </RadioGroup>
            </FormControl>
            <Button disabled={form.person_name==="" || form.person_level==="" || form.person_position===""} variant={"contained"} onClick={loadData}>Create</Button>
            </Stack>
        </Container>
    );
}