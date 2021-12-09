import React from 'react';

export default AttendanceRecord

function AttendanceRecord(props) {
  const attendee = props.attendee;

  const notes = attendee.notes ?  <div> { attendee.notes } </div> : '';
  const phone = attendee.phone ? <span> { attendee.phone } </span> : '';
  const email = attendee.email ? <span> { attendee.email } </span> : '';

  const attendanceIcon = attendee.recordid ? '\u2714' : '\u274c'; 
  const attendanceClassName = attendee.recordid ? 'present' : 'absent'; 
  const attendeeDetails = <div>
	{ notes } 
	{ email } 
	{ phone } 
  </div>; 

  return (
    <tr className= { 'AttendanceRecord' + ' ' +  attendanceClassName }> 
      <td className='attendee' >
        { attendee.firstname + ' ' +  attendee.lastname }
        <div className="details">
          { attendeeDetails } 
        </div>
      </td>
      <td className='presence' >{ attendanceIcon }</td>
    </tr>      
  )
}
