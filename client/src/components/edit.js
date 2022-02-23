import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import axios from "axios";

export default function Edit() {
    const [form, setForm] = useState({
        person_name: "",
        person_position: "",
        person_level: "",
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const url = `http://localhost:5000/record/${params.id.toString()}`;
        axios.get(url).then(res => {
            setForm(res.data);
        })
    },[])

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    function updateForm(personLevel, value) {
        setForm({...form, [personLevel]: value})
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <Container maxWidth={'lg'}>
            <Typography variant={'h4'}>Update Record</Typography>
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
                <Button disabled={form.person_name==="" || form.person_level==="" || form.person_position===""} variant={"contained"}>Update</Button>
            </Stack>
        </Container>
    );
}