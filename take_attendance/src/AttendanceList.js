import React from 'react';

import AttendanceRecord from './AttendanceRecord.js'

export default AddendanceList

function AddendanceList(props) {
  const attendees = props.attendees;
  const rows = attendees
    .sort((a, b) => (a.firstname > b.firstname) ? 1 : (a.firstname === b.firstname) ? ((a.lastname > b.lastname) ? 1 : -1) : -1 )
    .map((attendee) =>
	<AttendanceRecord attendee = { attendee } key = { attendee.user_id ? attendee.user_id : attendee.firstname + attendee.lastname } />
  );
  return (
    <div> 
      <table>
        {rows}
      </table>
    </div>      
  )
}
