'use client';
import { Dispatch, SetStateAction, useState } from "react";
import {Book} from "../Book";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Container } from "@mui/material";

const BookDetails = ({book, url, setDetail}: {book: Book, url: string, setDetail: Dispatch<SetStateAction<Book | undefined>>}) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [body, setBody] = useState(book.body);

    
    const handleSave = (event: any) => {
        event.preventDefault()
        book.title = title;
        book.author = author;
        book.body = body;
        updateBook(book, url);
        setEditing(false);
        setDetail(book);
    }

    const handleCancel = () => {
        setTitle(book.title);
        setAuthor(book.author);
        setBody(book.body);
        setEditing(false);
    }

    if (!editing)
        return (
            <Dialog open={true} fullWidth={true} maxWidth="md" scroll="paper" onClose={() => {handleClose(setDetail)}}>
                <DialogTitle>{title} - {author}</DialogTitle>
                <DialogContentText sx={{marginLeft: "20px", marginRight: "20px"}}>
                    {body}
                </DialogContentText>
                <DialogActions>
                    <Button variant="contained" onClick={() => {handleClose(setDetail)}}>Close</Button>
                    <Button onClick={() => {setEditing(true)}}>Edit</Button>
                </DialogActions>
            </Dialog>
        )
    else
        return (
            <Dialog open={true} fullWidth={true} maxWidth="md" onClose={() => setEditing(false)}>
                <DialogTitle>Editing {title}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{textAlign: "center", display: 'flex', flexDirection: 'column'}}
                        autoComplete="off"
                        onSubmit={handleSave}
                    >
                        <TextField
                            required
                            id="title"
                            label="Title"
                            defaultValue={title}
                            margin="normal"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            id="author"
                            label="Author"
                            defaultValue={author}
                            margin="normal"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <TextField
                            multiline
                            required
                            id="body"
                            label="Body"
                            defaultValue={body}
                            minRows={5}
                            margin="normal"
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Button variant="contained" type="submit">Save</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
}

function updateBook(book: Book, url: string) {
    (async () => {
        const raw = await fetch(`${url}/books/${book.id}/`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        return await raw.json();
    })();
}

function handleClose(setDetail: Dispatch<SetStateAction<Book | undefined>>) {
    setDetail(undefined);
}

export default BookDetails;
