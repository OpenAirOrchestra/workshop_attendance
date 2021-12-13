
/// Mock restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
class MockAttendanceService {

    maxRecordId = 1000;

    constructor() {
        this.attendanceRecords = [
            { user_id: 99, firstname: 'Zaphod', lastname: 'Beeblebrox', phone: '', email: '', notes: 'Presedent of the Galaxy', event_id: 300, id: 199 },
            { user_id: 100, firstname: 'Alice', lastname: 'Dole', phone: '', email: '', notes: 'A Tuba', event_id: 1000, id: 200 },
            { user_id: 101, firstname: 'Bob', lastname: 'Gill', phone: '', email: '', notes: 'Bob is a fella', event_id: 1000, id: 201 },
            { user_id: 102, firstname: 'Charlie', lastname: 'Lipp', phone: '', email: '', notes: 'C Saxophone', event_id: 1000, id: 202 },
            { user_id: 103, firstname: 'Denise', lastname: 'Stephan', phone: '', email: '', notes: '', event_id: 1000, id: 203 },
            { user_id: 104, firstname: 'Ethan', lastname: 'Fuller', phone: '', email: '', notes: 'F Flute', event_id: 1000, id: 204 },

            { user_id: 105, firstname: 'Francine', lastname: 'Churchill', phone: '', email: '', notes: 'C Flute', id: 205 },
            { user_id: 106, firstname: 'Greg', lastname: 'Guard', phone: '', email: '', notes: 'Clarinet', id: 206 },
            { user_id: 107, firstname: 'Harry', lastname: 'Gill', phone: '', email: '', notes: 'Bassoon', id: 207 },
            { user_id: 108, firstname: 'Ichabod', lastname: 'Crane', phone: '', email: '', notes: 'Trombone', id: 208 },

            { user_id: 110, firstname: 'Niel', lastname: 'Armstrong', phone: '', email: '', notes: 'Astronaut', event_id: 10, id: 300 },
            { user_id: 111, firstname: 'Oprah', lastname: 'Winfrey', phone: '', email: '', notes: 'Celebrety', event_id: 10, id: 310 },
            { user_id: 112, firstname: 'Peter', lastname: 'Armguister', phone: '', email: '', notes: 'Dude', event_id: 10, id: 320 },
            { user_id: 113, firstname: 'Quinn', lastname: 'Eskimo', phone: '', email: '', notes: 'Beatles', event_id: 10, id: 330 },

            { firstname: 'Sonny', lastname: 'Bono', phone: '', email: '', notes: 'Celebrity husband', event_id: 1000, id: 340 },
            { firstname: 'Frank', lastname: 'Zappa', phone: '', email: '', notes: 'Guitar', event_id: 1004, id: 350 }

        ];
    }

    async retrieve(event_id, limit) {
        let records = this.attendanceRecords;
        if (event_id) {
            records = records.filter(record => record.event_id === event_id);
        }
        if (limit) {
            records = records.slice(0, limit);
        }
        await new Promise((res) => setTimeout(res, 1000));
        return Promise.resolve(records);
    }

    async get(id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.attendanceRecords[i].id === id) {
                return Promise.resolve(this.items[i]);
            }
        }
        return null;
    }

    async create(attendanceRecord) {

        // Fake delay
        await new Promise((res) => setTimeout(res, 1000));

        // Add the new record
        ++this.maxRecordId;
        let newRecord = { ...attendanceRecord };
        newRecord.id = this.maxRecordId;
        this.attendanceRecords.push(newRecord);

        //Return the promise
        return Promise.resolve(attendanceRecord);
    }

    async delete(id) {
        // Fake delay
        await new Promise((res) => setTimeout(res, 1000));

        // Remove the record
        this.attendanceRecords = this.attendanceRecords.filter(attendee => { return id !== attendee.id; });

        //Return the promise
        return Promise.resolve(id);
    }

    async update(attendanceRecord) {
        console.log("MockAttendanceService.updateAttendanceRecord():");
        console.log(attendanceRecord);
    }

}

export default MockAttendanceService;
