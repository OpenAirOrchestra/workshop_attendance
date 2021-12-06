import React from 'react';
import Filters from './Filters'
import AddendanceList from './AttendanceList'
import NewAttendeeForm from './NewAttendeeForm'

export default AttendanceSheet

function AttendanceSheet(props) {
  return (
    <div>
	<h1>Attendance for</h1>
	<Filters />
  	<AddendanceList />
	<NewAttendeeForm />
    </div>      
  )
}
