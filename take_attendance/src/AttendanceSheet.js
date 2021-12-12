import React, { useEffect, useState } from 'react';
import Configuration from './Configuration';
import MockAttendanceService from './MockAttendanceService';
import MockEventService from './MockEventService';
import MockUserService from './MockUserService';
import Header from './Header'
import SearchBar from './SearchBar'
import AttendanceList from './AttendanceList'
import NewAttendeeForm from './NewAttendeeForm'
import Loading from './Loading'

export default AttendanceSheet

/// Compute attendees from users and attendance records
function possibleAttendees(users, recents, currentAttendees, pending) {
	let attendanceMap = {}

	// Add users to the map.
	for (const user of users) {
		let attendanceRecord = { user_id: user.id, firstname: '', lastname: '' };
		if (user.nickname) {
			attendanceRecord.firstname = user.nickname;
		} else if (user.first_name) {
			attendanceRecord.firstname = user.first_name;
			if (user.last_name) {
				attendanceRecord.lastname = user.last_name;
			}
		}

		if (user.description) {
			attendanceRecord.notes = user.description;
		}

		attendanceMap[user.id] = attendanceRecord;
	}

	// Add recents to the map
	for (const recent of recents) {
		const key = recent.user_id ? recent.user_id : (recent.firstname + '.' + recent.lastname);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...recent };
		}

		attendanceRecord.id = recent.id;

		if (!attendanceRecord.notes) {
			attendanceRecord.notes = recent.notes;
		}
		attendanceRecord.event_id = recent.event_id;
		attendanceMap[key] = attendanceRecord;
	}

	// Add currentAttendees to the map
	for (const currentAttendee of currentAttendees) {
		const key = currentAttendee.user_id ? currentAttendee.user_id : (currentAttendee.firstname + '.' + currentAttendee.lastname);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...currentAttendee };
		}
		attendanceRecord.id = currentAttendee.id;
		attendanceRecord.event_id = currentAttendee.event_id;
		if (currentAttendee.phone && !attendanceRecord.phone) {
			attendanceRecord.phone = currentAttendee.phone;
		}
		if (currentAttendee.user_id && !attendanceRecord.user_id) {
			attendanceRecord.user_id = currentAttendee.user_id;
		}
		if (currentAttendee.user_id && !attendanceRecord.user_id) {
			attendanceRecord.user_id = currentAttendee.user_id;
		}
		if (currentAttendee.firstname && !attendanceRecord.firstname) {
			attendanceRecord.firstname = currentAttendee.firstname;
		}
		if (currentAttendee.lastname && !attendanceRecord.lastname) {
			attendanceRecord.lastname = currentAttendee.lastname;
		}
		if (currentAttendee.notes && !attendanceRecord.notes) {
			attendanceRecord.notes = currentAttendee.notes;
		}

		attendanceMap[key] = attendanceRecord;
	}

	// Add pending to the map
	for (const pendingAttendee of pending) {
		const key = pendingAttendee.user_id ? pendingAttendee.user_id : (pendingAttendee.firstname + '.' + pendingAttendee.lastname);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...pendingAttendee };
		}

		attendanceMap[key] = attendanceRecord;
	}

	// Iterate the map to create result.
	const attendees = Object.values(attendanceMap);
	return attendees ? attendees : [];
}

/// Return the subset of attendees with text that matches searchTerm
function searchAttendees(attendees, searchTerm) {
	const pattern = searchTerm ? searchTerm.toLowerCase().replace(/\s+/g, '') : null;
	let result = attendees;

	if (pattern) {
		result = result.filter(attendee => {
			const line = Object.values(attendee).map(value => {
				return String(value).toLowerCase()
			}).join().replace(/\s+/g, '');
			return line.includes(pattern);
		})
	}

	return result;
}

/// Return the subset of attendees that match the filter criteria
function filterAttendees(attendees, filterRecent, filterNew, filterPresent) {
	let result = attendees;

	if (filterRecent || filterNew || filterPresent) {
		result = result.filter(attendee => {
			if (filterRecent && attendee.event_id) {
				return true;
			}

			if (filterNew && !attendee.user_id) {
				return true;
			}

			if (filterPresent && attendee.event_id && attendee.event_id === EVENT_ID) {
				return true;
			}

			return false;
		});
	}

	return result;
}

/// Load all data from backend.
async function loadAll(setIsLoading, setEventRecord, setUsers, setRecents, setCurrentAttendees) {
	const eventService = Configuration.eventService;
	const userService = Configuration.userService;
	const attendanceService = Configuration.attendanceService;

	const eventRecord = await eventService.get(EVENT_ID);
	setEventRecord(eventRecord);

	const users = await userService.retrieve();
	setUsers(users);

	const recents = await attendanceService.retrieve(null /* event_id */, 256 /* limit */);
	setRecents(recents);

	const currentAttendees = await attendanceService.retrieve(EVENT_ID /* event_id */, 0 /* limit */);
	setCurrentAttendees(currentAttendees);

	setIsLoading(false);
}

function AttendanceSheet(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [searchTerm, setSearchTerm] = useState('');

	const [filterRecent, setFilterRecent] = useState(false);
	const [filterNew, setFilterNew] = useState(false);
	const [filterPresent, setFilterPresent] = useState(false);

	const [eventRecord, setEventRecord] = useState(null);
	const [users, setUsers] = useState([]);
	const [recents, setRecents] = useState([])
	const [currentAttendees, setCurrentAttendees] = useState([]);
	const [pending, setPending] = useState([
		{ user_id: 103, firstname: 'Denise', lastname: 'Stephan', phone: '', email: '', notes: '', event_id: 1000, id: 203 }
	]);

	let pendingMap = { };
	for (const pendingAttendee of pending) {
		const key = pendingAttendee.user_id ? pendingAttendee.user_id : (pendingAttendee.firstname + '.' + pendingAttendee.lastname);
		pendingMap[key] = pendingAttendee;
	}

	// Set up configuration
	useEffect(() => {
		if (!Configuration.eventService) {
			Configuration.eventService = new MockEventService();
			Configuration.userService = new MockUserService();
			Configuration.attendanceService = new MockAttendanceService();
		}
	});


	// Load initial data.
	useEffect(() => {
		if (isLoading) {
			loadAll(setIsLoading, setEventRecord, setUsers, setRecents, setCurrentAttendees)
		}
	}, [isLoading]);

	// Attendance
	const attendees = possibleAttendees(users, recents, currentAttendees, pending);

	// Search
	const searchedAttendees = searchAttendees(attendees, searchTerm);

	// Filter
	const filteredAttendees = filterAttendees(searchedAttendees, filterRecent, filterNew, filterPresent);

	const showNewAttendeeForm = !isLoading && (filterNew || filterPresent || !filterRecent);

	return (
		<div className="AttendanceSheet">
			<Header name={eventRecord ? eventRecord.title : ''} />
			<SearchBar
				searchTerm={searchTerm} setSearchTerm={setSearchTerm}
				filterRecent={filterRecent} setFilterRecent={setFilterRecent}
				filterNew={filterNew} setFilterNew={setFilterNew}
				filterPresent={filterPresent} setFilterPresent={setFilterPresent}
			/>
			<AttendanceList attendees={filteredAttendees} event_id={EVENT_ID} pendingMap = { pendingMap } />
			<NewAttendeeForm hideAttendeeForm={!showNewAttendeeForm} />
			<Loading isLoading={isLoading} />
		</div>
	)
}

// Dummy data
const EVENT_ID = 1000;
