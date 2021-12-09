import React from 'react';

export default SearchBar

function SearchBar(props) {
  const searchTerm = props.searchTerm;
  const setSearchTerm = props.setSearchTerm;

  return (
    <div className='SearchBar'>
      <form>
        <input type="text" name="search" placeholder="&#128269;" value={ searchTerm } onChange={ (event) => setSearchTerm(event.target.value) } />
        <br />
        <input type="checkbox" name="recent" id="recent" /><label htmlFor="recent">recent</label>
        <input type="checkbox" name="new" id="new" /><label htmlFor="new">new folks</label>
        <input type="checkbox" name="attendees" id="attendees" /><label htmlFor="attendees">attendees</label>
      </form>
    </div>
  )
}
