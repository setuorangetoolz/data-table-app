import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    Modal,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditModal, {contactValueInterface} from "./AddOrEditModal";
import {useDispatch, useSelector} from "react-redux";
import {SelectAllContacts} from "./features/contacts/ContactSelector";
import {deleteContact, editContact} from "./features/contacts/ContactSlice";

const HomePage = () => {
    const dispatch = useDispatch()
    const contacts = useSelector(SelectAllContacts);
    const [open,setOpen] = useState(false);
    const [contactId, setContactId] = useState<number>()
    const [searchContact, setSearchContact] = useState<string>("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handelSearchContact = (event:ChangeEvent<HTMLInputElement>) =>{
        setSearchContact(event.target.value)
    }
    console.log(searchContact);

    const handelClick = () =>{
        if(!open){
            setContactId(undefined);
        }
        setOpen(open=>!open)
    }
    const handleDelete = (contactId:number) =>{
        dispatch(deleteContact(contactId))
    }

    const handleEdit = (contactId:number) =>{
        handelClick()
       setContactId(contactId);
    }

    const filterContacts = () =>{
        return contacts.filter((contact) =>
            contact.first_name.toLowerCase().includes(searchContact.toLowerCase())
        );
    }

    const filterContactList = filterContacts();

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                <TextField size={"small"} type={"text"} placeholder={"search..."} value={searchContact} onChange={handelSearchContact} />
                <Button variant={"contained"} onClick={handelClick}>Create Contact</Button>
            </Stack>
            <Divider light/>
            <Box p={2}>
            <Paper variant={"outlined"}>
                <Table size={"small"} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox size={"small"} />
                            </TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Expertise</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {searchContact !== "" ?
                            filterContactList?.map((contact,index)=> {
                            const contactId = index + 1;
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Checkbox size={"small"}/>
                                    </TableCell>
                                    <TableCell>{contact.first_name}</TableCell>
                                    <TableCell>{contact.last_name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.age}</TableCell>
                                    <TableCell>{contact.designation}</TableCell>
                                    <TableCell>{contact.gender}</TableCell>
                                    <TableCell>{contact.expertise.join(',')}</TableCell>
                                    <TableCell>
                                        <IconButton size={"small"} onClick={() => handleEdit(contactId)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton size={"small"} onClick={() => handleDelete(contactId)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        :
                            contacts.slice(startIndex,endIndex).map((contact,index)=> {
                                const contactId = index + 1;
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox size={"small"}/>
                                        </TableCell>
                                        <TableCell>{contact.first_name}</TableCell>
                                        <TableCell>{contact.last_name}</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.age}</TableCell>
                                        <TableCell>{contact.designation}</TableCell>
                                        <TableCell>{contact.gender}</TableCell>
                                        <TableCell>{contact.expertise.join(',')}</TableCell>
                                        <TableCell>
                                            <IconButton size={"small"} onClick={() => handleEdit(contactId)}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton size={"small"} onClick={() => handleDelete(contactId)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }


                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={contacts.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            </Box>
            <Modal open={open} onClose={handelClick}>
                <AddOrEditModal setOpen={setOpen} onClose={handelClick} contactId={contactId} />
            </Modal>
        </Box>
    );
};

export default HomePage;