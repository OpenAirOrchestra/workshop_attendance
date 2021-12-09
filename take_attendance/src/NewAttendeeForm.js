import React from 'react';

export default NewAttendeeForm

function NewAttendeeForm(props) {
  return (
    <div className='NewAttendeeForm'> 
      <h2>Add New Attendee</h2>
      <form>
        <label for="firstname">First Name:</label>
        <input type="text" name="firstname" id="firstname" />
        <br/>
        <label for="lastname">Last Name: </label>
        <input type="text" name="lastname" id="lastname" />
        <br/>
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" />
        <br/>
        <label for="phone">Phone:</label>
        <input type="text" name="phone"  id="phone"/>
        <br/>
        <label for="notes">Notes:</label>
        <br/>
        <textarea name="notes" id="notes" />
        <br/>
        <div className='centered'>
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>      
  )
}
