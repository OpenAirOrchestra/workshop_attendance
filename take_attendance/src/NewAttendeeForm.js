import React from 'react';

export default NewAttendeeForm

function NewAttendeeForm(props) {

  const hideAttendeeForm = props.hideAttendeeForm;

  if (hideAttendeeForm) {
    return null;
  }

  return (
    <div className='NewAttendeeForm'>
      <h2>Add New Attendee</h2>
      <form>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" name="firstname" id="firstname" />
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input type="text" name="lastname" id="lastname" />
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
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  )
}
