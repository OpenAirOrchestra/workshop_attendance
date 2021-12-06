import React from 'react';

export default AttendanceRecord

function AttendanceRecord(props) {
  const attendee = props.attendee;

  const notes = attendee.notes ?  <div> { attendee.notes } </div> : '';
  const phone = attendee.phone ? <span> { attendee.phone } </span> : '';
  const email = attendee.email ? <span> { attendee.email } </span> : '';

  const attending = attendee.recordid ? '\u2714' : '\u274c'; 
  const attendeeDetails = <div>
	{ notes } 
	{ email } 
	{ phone } 
  </div>; 

  return (
    <tr> 
      <td>
        { attendee.firstname + ' ' +  attendee.lastname }
        <div>
          { attendeeDetails } 
        </div>
      </td>
      <td>{ attending }</td>
    </tr>      
  )
}
