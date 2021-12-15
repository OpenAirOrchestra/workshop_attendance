/// Restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See:  https://developer.wordpress.org/rest-api/
class EventService {

    /// Get rest api location
    serviceLocation() {
        return "../../../../?rest_route=/workshop_attendance/v1/event";
    }

    /// Get request (get an event)
    async get(id) {
        const url = this.serviceLocation() + "/" + id;
        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            alert("Failed to get workshop " + id + ", Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
        }

        return response.json();
    }
}

export default EventService;
