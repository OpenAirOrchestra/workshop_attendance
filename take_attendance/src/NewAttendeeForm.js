import React from 'react';

export default NewAttendeeForm

function NewAttendeeForm(props) {
  return (
    <div> 
      <form>
        <label>
	  First Name:
          <input type="text" name="firstname" />
        </label>
        <br/>
        <label>
	  Last Name:
          <input type="text" name="lastname" />
        </label>
        <br/>
        <label>
	  Email:
          <input type="text" name="email" />
        </label>
        <br/>
        <label>
	  Phone:
          <input type="text" name="phone" />
        </label>
        <br/>
        <label>
	  Notes:
          <input type="textarea" name="notes" />
        </label>
        <br/>
        <input type="submit" value="Add" />
      </form>
    </div>      
  )
}
