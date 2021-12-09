import React from 'react';

export default SearchBar

function SearchBar(props) {
  return (
    <div className='SearchBar'> 
      <form>
        <input type="text" name="search" placeholder="&#128269;"/>
	<br/>
        <input type="checkbox" name="recent"/><label for="recent">recent</label>
        <input type="checkbox" name="new"/><label for="new">new folks</label>
        <input type="checkbox" name="attendees"/><label for="attendees">attendees</label>
      </form>
    </div>      
  )
}
