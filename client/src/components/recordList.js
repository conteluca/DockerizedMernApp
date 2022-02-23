import React, {useEffect, useState} from "react";
import {
    ButtonGroup,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {DeleteSharp, EditSharp} from "@mui/icons-material";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function RecordList() {
    const navigate = useNavigate()
    const [records, setRecords] = useState([]);
    const getRecords = () => {
        axios.get('http://localhost:5000/record')
            .then(res => {
                const rec = res.data;
                const array = [];
                Object.keys(rec).forEach(value => array.push(rec[value]))
                setRecords(array)
            })
    }
    useEffect(getRecords, [records.length])

    function deleteRecord(id) {
        axios.delete(`http://localhost:5000/${id}`).then(res => {
            console.log(res);
            console.log(res.data);
        })
        getRecords()
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <TableRow key={record._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell>{record.person_name}</TableCell>
                    <TableCell>{record.person_position}</TableCell>
                    <TableCell>{record.person_level}</TableCell>
                    <TableCell>
                        <ButtonGroup>
                            <IconButton onClick={() => deleteRecord(record._id)}>
                                <DeleteSharp color={"secondary"}/>
                            </IconButton>
                            <IconButton onClick={() => navigate(`/edit/${record._id}`)}>
                                <EditSharp color={"secondary"}/>
                            </IconButton>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <Container maxWidth={'xl'} sx={{mt: 2}}>
            <Table sx={{minWidth: 650}} aria-label={'table'}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant={'h6'}>Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={'h6'}>Position</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={'h6'}>Level</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant={'h6'}>Action</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordList()}
                </TableBody>
            </Table>
        </Container>
    );
}