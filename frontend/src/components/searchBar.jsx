import React, { useState } from 'react';

const SearchBar = () => {

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch =  async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchBooks(searchTerm);
      setBooks(results);
      setSearchTerm(''); // Clear the search bar
    
  };

  return (
        <div>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div>
            {books.length > 0 ? (
              <ul> 
                {books.map((book) => (
                  <li key={book.id}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors.join(", ")}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
  );
};
export default SearchBar;