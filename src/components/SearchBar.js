import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import { debounce } from 'lodash';

// SearchBar component

// onSearch is called when search is performed , loading is a boolean that indicated if the search operation is in progress //

const SearchBar = ({ onSearch, loading }) => { 

  const [query, setQuery] = useState(''); // Local state, this will keep track of what the user has typed into the search box //

  // Debounced search function to avoid excessive API calls

  const debouncedSearch = debounce((searchTerm) => {
    onSearch(searchTerm); 
  }, 500); // Triggers search in parent component,waits 500ms after the user stops typing before initiating a search


  // Handle input changes
  // Triggers when the user types in the <Input> field via the onChange prop
  //e.target.value gets the current value of the input field
  //setQuery updates the query and debouncedSearch(newQuery) calls the debounced version of onSearch with the updated query.

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery); 
  };


  // Handle form submission
  // Triggers when the user submits the form
  // e.preventDefault() prevents form submission behavior
  // onSearch(query) triggers immediate search nby calling onSearch prop with the current Query.

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); 
  };


  // Clear the search input
  //Triggers when the usrer clickes the Clear button
  // setQuery(''): Resets the query state to an empty string to clear the input field
  // onSearch(''): Calls onSearch with an empty string, which in App.js triggers a fetch for popular movies .

  const handleClear = () => {
    setQuery('');
    onSearch(''); 
  };

  // Clean up debounce on component unmount
  // useEffect runs the cleanup function here when decouncedSearch changes
  // debouncedSearch.cancel() cancels any pending debounced calls to onSearch

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); 
    };
  }, [debouncedSearch]);

  // This part renders the UI. Still have some stuff to do.

  return (
    <Form onSubmit={handleSubmit} className="search-bar-form">
      <div className="d-flex align-items-center">
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie..."
          className="search-input"
        />
        {loading && <Spinner color="primary" className="ms-2" />}
        {query && (
          <Button color="secondary" onClick={handleClear} className="ms-2">
            Clear
          </Button>
        )}
        <Button type="submit" className="ms-2 custom-search-button">
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;