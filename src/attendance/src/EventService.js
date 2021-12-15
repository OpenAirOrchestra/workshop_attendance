/// Restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
class EventService {

    constructor() {
        this.events = [
            { id: 65, title: 'Workshop for 23 03 2011', date: '23 03 2011' },
            { id: 66, title: 'Workshop for 23 03 2011', date: '30 03 2011' },
            { id: 67, title: 'Workshop for 23 03 2011', date: '07 04 2011' },
            { id: 68, title: 'Workshop for 23 03 2011', date: '14 04 2011' }
        ];
    }

    async get(id) {
        let result = null;

        console.log("Event service, get " + id);
        for (var i = 0; i < this.events.length; i++) {
            if (this.events[i].id == id) {
                result = this.events[i];
                break;
            }
        }
        if (result) {
            // Dummy loading delay
            await new Promise((res) => setTimeout(res, 1000 * Math.random()));
            return Promise.resolve(result);
        }
        
        return null;
    }
}

export default EventService;
