/// Mock restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
class MockEventService {

    constructor() {
        this.events = [
            { id: 1000, title: 'Workshop for 23 03 2011', date: '23 03 2011' },
            { id: 205, title: 'Workshop for 23 03 2011', date: '30 03 2011' },
            { id: 206, title: 'Workshop for 23 03 2011', date: '07 04 2011' },
            { id: 207, title: 'Workshop for 23 03 2011', date: '14 04 2011' }
        ];
    }

    async retrieve() {
        return Promise.resolve(this.attendanceRecords);
    }

    async get(id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.attendanceRecords[i].id === id) {
                return Promise.resolve(this.items[i]);
            }
        }
        return null;
    }
}

export default MockEventService;