'use client';
import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import {Book} from "../Book";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

async function getData(url: string, id: number) {
    const res = await fetch(`${url}/books/${id}/`)
    return res.json()
}

const BookBrief = ({id,url,setDetail}: {id: number, url: string, setDetail: Dispatch<SetStateAction<Book | undefined>>}) => {
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData(url, id).then((book) => {
            setBook(book);
            setLoading(false);
        })
    }, []);

    if (loading) return <tr></tr>;
    if (!book) return <tr></tr>;
    return (
        <TableRow>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell><Checkbox checked={book.checked_out} disabled /></TableCell>
            <TableCell>{book.checked_out ? 
                <Button variant="contained" id="check-in" onClick={() => {checkIn(book, url, setBook)}}> Check In </Button>:
                <Button variant="contained" id="check-out" onClick={() => {checkOut(book, url, setBook)}}> Check Out </Button>
            }
            {book.checked_out ? <Button variant="contained" id="view-details" onClick={() => {setDetail(book)}}>View Details</Button> : <p></p>}
            </TableCell>
        </TableRow>
    )
}

function checkIn(book: Book, url: string, setBook: Dispatch<SetStateAction<Book | undefined>>) {
    book.checked_out = false;
    updateBook(book, url, setBook);
}

function checkOut(book: Book, url: string, setBook: Dispatch<SetStateAction<Book | undefined>>) {
    book.checked_out = true;
    updateBook(book, url, setBook);
}

function updateBook(book: Book, url: string, setBook: Dispatch<SetStateAction<Book | undefined>>) {
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
    })().then( (res) => {
        setBook(res);
    });
}

export default BookBrief;
