import React, {useState} from 'react';
import {
    Box,
    Button, Checkbox,
    Divider, IconButton, Modal,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditModal from "./AddOrEditModal";
import {useSelector} from "react-redux";
import {SelectAllContacts} from "./features/contacts/ContactSelector";

const HomePage = () => {
    const contacts = useSelector(SelectAllContacts);
    const [open,setOpen] = useState(false);
    const handelClick = () =>{
        setOpen(open=>!open)
    }
    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                <TextField size={"small"} placeholder={"search..."} />
                <Button variant={"contained"} onClick={handelClick}>Create Contact</Button>
            </Stack>
            <Divider light/>
            <Box p={2}>
            <Paper variant={"outlined"}>
                <Table size={"small"} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox size={"small"} color={"secondary"}/>
                            </TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Expertise</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {contacts && contacts.map((contact,index)=>{
                            return(
                                <TableRow>
                                    <TableCell>
                                        <Checkbox size={"small"} color={"secondary"}/>
                                    </TableCell>
                                    <TableCell>{contact.first_name}</TableCell>
                                    <TableCell>{contact.last_name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.id}</TableCell>
                                    <TableCell>{contact.designation}</TableCell>
                                    <TableCell>{contact.gender}</TableCell>
                                    <TableCell>{contact.expertise.join(',')}</TableCell>
                                    <TableCell>
                                        <IconButton size={"small"}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton size={"small"}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }

                    </TableBody>
                </Table>
            </Paper>
            </Box>
            <Modal open={open} onClose={handelClick}>
                <AddOrEditModal/>
            </Modal>
        </Box>
    );
};

export default HomePage;