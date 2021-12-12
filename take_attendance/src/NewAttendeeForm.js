import React, { useState } from 'react';

export default NewAttendeeForm

function NewAttendeeForm(props) {

  const hideAttendeeForm = props.hideAttendeeForm;

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  if (hideAttendeeForm) {
    return null;
  }

  return (
    <div className='NewAttendeeForm'>
      <h2>Add New Attendee</h2>
      <form>
        <label htmlFor="firstname">First Name (required):</label>
        <input type="text" name="firstname" id="firstname" className='required' value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
        <br />
        <label htmlFor="lastname">Last Name (required): </label>
        <input type="text" name="lastname" id="lastname" className='required' value={lastname} onChange={(event) => setLastname(event.target.value)}/>
        <br />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id="email" />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" id="phone" />
        <br />
        <label htmlFor="notes">Notes:</label>
        <br />
        <textarea name="notes" id="notes" />
        <br />
        <div className='centered'>
          <input type="submit" value="Add" disabled={!(firstname && lastname)} />
        </div>
      </form>
    </div>
  )
}
