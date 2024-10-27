// components/SearchResults.js
import React from "react";
import data from "@/Data.json"
import BookList from "./bookList";



const SearchResults = ({ searchText }) => {
  const getSearchBooks = (query) => {
    return data.books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  if (searchText){
  const results = getSearchBooks(searchText);

  return (
    <BookList filteredBooks={results}/>
  );
    }
    return (<></>);

}

export async function getServerSideProps() {
    const dataFilePath = path.join(process.cwd(), 'Data.json');
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    return { props: { genres: getBooks(data) } };
}

export default SearchResults;