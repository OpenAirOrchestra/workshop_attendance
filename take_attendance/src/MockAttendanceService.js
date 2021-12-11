
/// Mock restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
class MockAttendanceService {

    constructor() {
        this.attendanceRecords = [
            { user_id: 99, firstname: 'Zaphod', lastname: 'Beeblebrox', phone: '', email: '', notes: 'Presedent of the Galaxy', event_id: 1000, id: 199 },
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
            { user_id: 113, firstname: 'Quinn', lastname: 'Eskimo', phone: '', email: '', notes: 'Beatles', event_id: 10, id: 330 }
        ];
    }

    async retrieve(event_id) {
        let records = this.attendanceRecords;
        if (event_id) {
            records = records.filter(record => record.event_id === event_id);
        }
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
        console.log("MockAttendanceService.createAttendanceRecord():");
        console.log(attendanceRecord);
        return Promise.resolve(attendanceRecord);
    }

    async delete(id) {
        console.log("MockAttendanceService.deleteAttenanceRecord():");
        console.log("ID:" + id);
    }

    async update(attendanceRecord) {
        console.log("MockAttendanceService.updateAttendanceRecord():");
        console.log(attendanceRecord);
    }

}


export default MockAttendanceService;
