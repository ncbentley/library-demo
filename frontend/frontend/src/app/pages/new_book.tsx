'use client';
import { Dispatch, SetStateAction, useState } from "react";
import {Book} from "../Book";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Container } from "@mui/material";

const NewBook = ({url, setNew, books, setBooks}: {url: string, setNew: Dispatch<SetStateAction<boolean>>, books: Book[], setBooks: Dispatch<SetStateAction<Book[]>>}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");

    
    const handleSave = (event: any) => {
        event.preventDefault()
        insertBook({
            title: title,
            author: author,
            body: body
        }, url).then((res) => {
            var arr : Book[] = books.slice()
            arr.push(res)
            setBooks(arr)
        })
        setNew(false);
    }


    return (
        <Dialog open={true} fullWidth={true} maxWidth="md" onClose={() => setNew(false)}>
            <DialogTitle>Add New Book</DialogTitle>
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
                        id="body"
                        label="Body"
                        defaultValue={body}
                        minRows={5}
                        margin="normal"
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Button variant="contained" type="submit">Add Book</Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setNew(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

function insertBook(book: any, url: string) {
    return (async () => {
        const raw = await fetch(`${url}/books/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        return await raw.json();
    })().then( (res) => {
        return res
    });
}

export default NewBook;
