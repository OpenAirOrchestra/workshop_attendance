import React from 'react';

export default AttendanceRecord

export function attendeeKey(attendee) {
  const key = attendee.user_id ? attendee.user_id : (attendee.firstname + '.' + attendee.lastname);
  return key;
}

function AttendanceRecord(props) {
  const attendee = props.attendee;
  const pendingMap = props.pendingMap ? props.pendingMap : {};
  const event_id = props.event_id;

  const key = attendeeKey(attendee);

  const pending = pendingMap[key];
  const present = attendee.event_id && (attendee.event_id === event_id);

  const notes = attendee.notes ? <div> {attendee.notes} </div> : '';
  const phone = attendee.phone ? <span> {attendee.phone} </span> : '';
  const email = attendee.email ? <span> {attendee.email} </span> : '';

  const attendanceIcon = present ? '\u2714' : '\u274c';
  const attendanceClassName = present ? 'present' : 'absent';
  const pendingClassName = pending ? 'pending' : '';
  const attendeeDetails = <div>
    {notes}
    {email}
    {phone}
  </div>;

  const pendingSpinner = pending ? (<span className="pending-spinner" />) : '';

  // For not new users, don't show full last name
  const lastname = (attendee.user_id && attendee.lastname)? attendee.lastname.charAt(0) : attendee.lastname;
  return (
    <tr className={'AttendanceRecord  ' + attendanceClassName + ' ' + pendingClassName}>
      <td className='attendee' >
        {attendee.firstname + ' ' + lastname}
        <div className="details">
          {attendeeDetails}
        </div>
      </td>
      <td className='presence' >{pendingSpinner}<span className='presenceIcon'>{attendanceIcon}</span></td>
    </tr>
  )
}
