export interface Book {
    id: number;
    title: string;
    body?: string,
    author: string;
    checked_out: boolean;
}