import React from 'react';

export default AttendanceRecord

function AttendanceRecord(props) {
  const attendee = props.attendee;

  const notes = attendee.notes ? <div> {attendee.notes} </div> : '';
  const phone = attendee.phone ? <span> {attendee.phone} </span> : '';
  const email = attendee.email ? <span> {attendee.email} </span> : '';

  const attendanceIcon = attendee.recordid ? '\u2714' : '\u274c';
  const attendanceClassName = attendee.recordid ? 'present' : 'absent';
  const pendingClassName = attendee.pending ? 'pending' : '';
  const attendeeDetails = <div>
    {notes}
    {email}
    {phone}
  </div>;

  const pendingSpinner = attendee.pending ? ( <span className="pending-spinner" /> ) : '';

  return (
    <tr className={'AttendanceRecord  ' + attendanceClassName + ' ' + pendingClassName }>
      <td className='attendee' >
        {attendee.firstname + ' ' + attendee.lastname}
        <div className="details">
          {attendeeDetails}
        </div>
      </td>
      <td className='presence' >{ pendingSpinner }{attendanceIcon}</td>
    </tr>
  )
}
