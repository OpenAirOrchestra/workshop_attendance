import React from 'react';
import SearchBar from './SearchBar'
import AddendanceList from './AttendanceList'
import NewAttendeeForm from './NewAttendeeForm'

export default AttendanceSheet

function AttendanceSheet(props) {
  return (
    <div>
	<h1>Attendance for</h1>
	<SearchBar />
  	<AddendanceList />
	<NewAttendeeForm />
    </div>      
  )
}
