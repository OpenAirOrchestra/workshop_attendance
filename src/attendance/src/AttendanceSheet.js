import React, { useEffect, useState } from 'react';
import Configuration from './Configuration';
import MockAttendanceService from './MockAttendanceService';
import MockEventService from './MockEventService';
import MockUserService from './MockUserService';
import UserService from './UserService';

import Header from './Header'
import SearchBar from './SearchBar'
import AttendanceList from './AttendanceList'
import { attendeeKey } from './AttendanceRecord';
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
		} else if (user.name) {
			attendanceRecord.firstname = user.name;
		}

		if (user.description) {
			attendanceRecord.notes = user.description;
		}

		attendanceMap[user.id] = attendanceRecord;
	}

	// Add recents to the map
	for (const recent of recents) {
		const key = attendeeKey(recent);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...recent };
		} else {
			attendanceRecord = { ...attendanceRecord };
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
		const key = attendeeKey(currentAttendee);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...currentAttendee };
		} else {
			attendanceRecord = { ...attendanceRecord };
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
		const key = attendeeKey(pendingAttendee);
		let attendanceRecord = attendanceMap[key];
		if (!attendanceRecord) {
			attendanceRecord = { ...pendingAttendee };
		} else {
			attendanceRecord = { ...attendanceRecord };
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
function filterAttendees(attendees, filterRecent, filterOld, filterNew, filterPresent) {
	let result = attendees;

	if (filterRecent || filterNew || filterOld || filterPresent) {
		result = result.filter(attendee => {
			if (filterRecent && attendee.event_id) {
				return true;
			}

			if (filterOld && !attendee.event_id) {
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

	let page=1;
	let allUsers = [];
	let moreUsers = true;
	do {
		const users = await userService.retrieve(page, 100);
		allUsers = [...allUsers, ...users];
		setUsers(allUsers);
		moreUsers = users.length > 0;
		++ page;
	} while (moreUsers);
	
	const recents = await attendanceService.retrieve(null /* event_id */, 256 /* limit */);
	setRecents(recents);

	const currentAttendees = await attendanceService.retrieve(EVENT_ID /* event_id */, 0 /* limit */);
	setCurrentAttendees(currentAttendees);

	setIsLoading(false);
}

/// Add an attendance record (add attendee)
async function addAttendanceRecord(attendee, modificationPromise, pending, setPending, setCurrentAttendees) {
	const attendanceService = Configuration.attendanceService;

	// Add record to pending
	let newPending = [...pending];
	newPending.push(attendee);
	setPending(newPending);
	attendanceService.pendingRecords = newPending;

	// Create the record to add
	let newAttendee = { ...attendee };
	newAttendee.event_id = EVENT_ID;

	// Ask for the server to create the attendee record
	await attendanceService.create(newAttendee);

	// Wait for previous modification to complete
	await modificationPromise

	// List current attendees again and set them
	const currentAttendees = await attendanceService.retrieve(EVENT_ID /* event_id */, 0 /* limit */);
	setCurrentAttendees(currentAttendees);

	// Remove record from pending.
	// This could get messed up if we didn't serilize the modification requests.
	newPending = [...attendanceService.pendingRecords].filter(pendingAttendee => {
		return pendingAttendee !== attendee;
	});
	setPending(newPending);
	attendanceService.pendingRecords = newPending;
	Promise.resolve(attendee);
}

/// Add an attendance record (add attendee)
async function deleteAttendanceRecord(attendee, modificationPromise, pending, setPending, setRecents, setCurrentAttendees) {
	const attendanceService = Configuration.attendanceService;

	// Add record to pending
	let newPending = [...pending];
	newPending.push(attendee);
	setPending(newPending);
	attendanceService.pendingRecords = newPending;

	// Get the id
	const recordId = attendee.id;

	// Delete the attendance record
	await attendanceService.delete(recordId);

	// Wait for previous modification to complete
	await modificationPromise

	// List recent attendees again and set them
	const recents = await attendanceService.retrieve(null /* event_id */, 256 /* limit */);
	setRecents(recents);

	// List current attendees again and set them
	const currentAttendees = await attendanceService.retrieve(EVENT_ID /* event_id */, 0 /* limit */);
	setCurrentAttendees(currentAttendees);

	// Remove record from pending.
	// This could get messed up if we didn't serilize the modification requests.
	newPending = [...attendanceService.pendingRecords].filter(pendingAttendee => {
		return pendingAttendee !== attendee;
	});
	setPending(newPending);
	attendanceService.pendingRecords = newPending;
	Promise.resolve(attendee);
}

/// The actual component!
function AttendanceSheet(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [searchTerm, setSearchTerm] = useState('');

	const [filterRecent, setFilterRecent] = useState(false);
	const [filterOld, setFilterOld] = useState(false);
	const [filterNew, setFilterNew] = useState(false);
	const [filterPresent, setFilterPresent] = useState(false);

	const [eventRecord, setEventRecord] = useState(null);
	const [users, setUsers] = useState([]);
	const [recents, setRecents] = useState([])
	const [currentAttendees, setCurrentAttendees] = useState([]);
	const [pending, setPending] = useState([]);

	const [modificationPromise, setModificationPromise] = useState(null);

	let pendingMap = {};
	for (const pendingAttendee of pending) {
		const key = attendeeKey(pendingAttendee);
		pendingMap[key] = pendingAttendee;
	}

	// Set up configuration
	useEffect(() => {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
			// Development code
			if (!Configuration.userService) {
				Configuration.eventService = new MockEventService();
				Configuration.userService = new MockUserService();
				Configuration.attendanceService = new MockAttendanceService();
			}
		} else {
			// production code
			if (!Configuration.userService) {
				Configuration.eventService = new MockEventService();
				Configuration.userService = new UserService();
				Configuration.attendanceService = new MockAttendanceService();
			}
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
	const filteredAttendees = filterAttendees(searchedAttendees, filterRecent, filterOld, filterNew, filterPresent);

	const showNewAttendeeForm = !isLoading && (filterNew || filterPresent || !filterRecent);

	return (
		<div className="AttendanceSheet">
			<Header name={eventRecord ? eventRecord.title : ''} />
			<SearchBar
				searchTerm={searchTerm} setSearchTerm={setSearchTerm}
				filterRecent={filterRecent} setFilterRecent={setFilterRecent}
				filterOld={filterOld} setFilterOld={setFilterOld}
				filterNew={filterNew} setFilterNew={setFilterNew}
				filterPresent={filterPresent} setFilterPresent={setFilterPresent}
			/>
			<AttendanceList attendees={filteredAttendees} event_id={EVENT_ID} pendingMap={pendingMap}
				addAttendanceRecord={(attendee) => {
					setModificationPromise(addAttendanceRecord(attendee, modificationPromise, pending, setPending, setCurrentAttendees));
				}}
				deleteAttendanceRecord={(attendee) => {
					setModificationPromise(deleteAttendanceRecord(attendee, modificationPromise, pending, setPending, setRecents, setCurrentAttendees));
				}}
			/>
			<NewAttendeeForm hideAttendeeForm={!showNewAttendeeForm}
				addAttendanceRecord={(attendee) => {
					setModificationPromise(addAttendanceRecord(attendee, modificationPromise, pending, setPending, setCurrentAttendees));
				}} />
			<Loading isLoading={isLoading} />
		</div>
	)
}

// Dummy data
const EVENT_ID = 1000;
