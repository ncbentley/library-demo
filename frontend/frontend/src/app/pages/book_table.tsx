'use client';
import React, { useState, useEffect } from "react";
import {Book} from "../Book";
import BookBrief from "./book_brief"
import BookDetails from "./book_details";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, TextField } from "@mui/material";
import NewBook from "./new_book";

async function fetch_books(url: string): Promise<Book[]> {
    const res = await fetch(url + "/books/", {next: {revalidate: 30}});
    const result: any = await res.json()
    return result;
  }

const BookTable = ({url}: {url: string}) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newing, setNew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<Book>();

    useEffect(() => {
        fetch_books(url).then((books) => {
            setBooks(books);
            setLoading(false);
        })
    }, []);

    const updateFilter = (event: any) => {
        var filter: string = event.target.value;
        fetch_books(url).then((books) => {
            if (filter != "") {
                console.log(filter)
                var filtered: Book[] = books.filter((book) => {
                    if (book.title.toLowerCase().includes(filter.toLowerCase())) return true;
                    if (book.author.toLowerCase().includes(filter.toLowerCase())) return true;
                    if (book.body?.toLowerCase().includes(filter.toLowerCase())) return true;
                    return false;
                });
                setBooks(filtered);
            } else 
                setBooks(books);
        })
    }

    if (loading) return <p>Loading...</p>
    return (
        <Container maxWidth="md">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Checked Out?</TableCell>
                            <TableCell>
                                <TextField 
                                    placeholder="Filter Books"
                                    size="small"
                                    onChange={updateFilter}
                                />
                                <Button variant="contained" onClick={() => setNew(true)}>Add Book</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => <BookBrief url={url} id={book.id} setDetail={setDetail} key={book.id}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {!!detail && !newing ? <BookDetails book={detail} url={url} setDetail={setDetail} /> : <p></p>}
            {!!newing ? <NewBook url={url} setNew={setNew} books={books} setBooks={setBooks} /> : <p></p>}
        </Container>
    );
}

export default BookTable;