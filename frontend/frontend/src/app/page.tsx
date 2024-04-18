import BookTable from "./pages/book_table";

const url = "http://nbentley.pythonanywhere.com";

export default async function Home() {
  return (
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <div>
          <BookTable url={url}/>
        </div>
      </body>
    </html>
  )
}
