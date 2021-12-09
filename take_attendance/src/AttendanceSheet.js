import React from 'react';
import Header from './Header'
import SearchBar from './SearchBar'
import AddendanceList from './AttendanceList'
import NewAttendeeForm from './NewAttendeeForm'

export default AttendanceSheet

function AttendanceSheet(props) {
  return (
    <div className="AttendanceSheet">
	<Header name={ EVENT_NAME } />
	<SearchBar />
  	<AddendanceList attendees={ ATTENDEES } />
	<NewAttendeeForm />
    </div>      
  )
}

// Dummy data
const EVENT_ID = 1000;

const EVENT_NAME = "June 8 Workshop";

const ATTENDEES = [
        // Recent users, attending
	{  user_id: 99, firstname: 'Zaphond', lastname: 'Beeblebrox', phone: '', email: '', notes: 'Presedent of the Galaxy', recent_event_id: 10, recordid: 199 },
	{  user_id: 100, firstname: 'Alice', lastname: 'Dole', phone: '', email: '', notes: 'A Tuba', recent_event_id: 10, recordid: 200 },
	{  user_id: 101, firstname: 'Bob', lastname: 'Gill', phone: '', email: '', notes: 'Bob is a fella', recent_event_id: 10, recordid: 201 },
	{  user_id: 102, firstname: 'Charlie', lastname: 'Lipp', phone: '', email: '', notes: 'C Saxophone', recent_event_id: 10, recordid: 202 },
	{  user_id: 103, firstname: 'Denise', lastname: 'Stephan', phone: '', email: '', notes: '', recent_event_id: 10, recordid: 203 },
	{  user_id: 104, firstname: 'Ethan', lastname: 'Fuller', phone: '', email: '', notes: 'F Flute', recent_event_id: 10, recordid: 204 },


        // Not recent users, attending
	{  user_id: 105, firstname: 'Francine', lastname: 'Churchih', phone: '', email: '', notes: 'C Flute', recordid: 205 },
	{  user_id: 106, firstname: 'Greg', lastname: 'Guard', phone: '', email: '', notes: 'Clarinet', recordid: 206 },
	{  user_id: 107, firstname: 'Harry', lastname: 'Gill', phone: '', email: '', notes: 'Bassoon', recordid: 207 },
	{  user_id: 108, firstname: 'Ichabod', lastname: 'Crane', phone: '', email: '', notes: 'Trombone', recordid: 208 },

	// New users, attending
	{  firstname: 'James', lastname: 'Brown', phone: '222-2222', email: 'j@gmail.com', notes: 'Guitar', recordid: 210 },
	{  firstname: 'Karen', lastname: 'Fedoruk', phone: '222-3333', email: 'k@gmail.com', notes: 'Violin', recordid: 211 },
	{  firstname: 'Leo', lastname: 'Pulaski', phone: '222-444', email: 'leo@leo.com', notes: 'Bass', recordid: 212 },
	{  firstname: 'Mary', lastname: 'Jane', phone: '222-9999', email: '', notes: 'Viola', recordid: 213 },

        // Recent users, not attending
	{  user_id: 110, firstname: 'Niel', lastname: 'Armstrong', phone: '', email: '', notes: 'Astronaut', recent_event_id: 10 },
	{  user_id: 111, firstname: 'Oprah', lastname: 'Winfrey', phone: '', email: '', notes: 'Celebrety', recent_event_id: 10 },
	{  user_id: 112, firstname: 'Peter', lastname: 'Armguister', phone: '', email: '', notes: 'Dude', recent_event_id: 10 },
	{  user_id: 113, firstname: 'Quinn', lastname: 'Eskimo', phone: '', email: '', notes: 'Beatles', recent_event_id: 10 },

        // Not recent users, not attending
	{  user_id: 123, firstname: 'Ruth', lastname: 'Ginsberg', notes: 'Hero' },
	{  user_id: 123, firstname: 'Seth', lastname: 'Rogan', notes: 'Actor' },
	{  user_id: 123, firstname: 'Taylor', lastname: 'Swift', notes: 'Singer' },
	{  user_id: 123, firstname: 'Uluu', lastname: 'Luulo', notes: 'Rockin the Alien' }
];

