import React from 'react';

import AttendanceRecord from './AttendanceRecord.js'

export default AttendanceList

function AttendanceList(props) {
  const attendees = props.attendees;
  const pendingMap = props.pendingMap ? props.pendingMap : {}
  const event_id = props.event_id;

  const rows = attendees
    .sort((a, b) => (a.firstname.toLowerCase() > b.firstname.toLowerCase()) ? 1 : (a.firstname.toLowerCase() === b.firstname.toLowerCase()) ? ((a.lastname.toLowerCase() > b.lastname.toLowerCase()) ? 1 : -1) : -1)
    .map((attendee) =>
      <AttendanceRecord attendee={attendee} event_id={event_id} pendingMap={pendingMap} key={attendee.user_id ? attendee.user_id : attendee.firstname + '.' + attendee.lastname} />
    );
  return (
    <div className='AttendanceList'>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
