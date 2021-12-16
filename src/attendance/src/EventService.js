/// Restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See:  https://developer.wordpress.org/rest-api/
class EventService {

    /// Get rest api location
    serviceLocation() {
        return "../../../../?rest_route=/workshop_attendance/v1/events";
    }

    async retrieve(page, per_page, date) {

        const searchParams = new URLSearchParams({
            page: page,
            per_page: per_page
        });
        if (date) {
            // YYYY-MM-DD, local time please.
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - (offset * 60 * 1000));
            const dateString = localDate.toISOString().substring(0, 10);

            searchParams.set('search', dateString);
        }
        const url = this.serviceLocation() + "&" + searchParams.toString();

        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            alert("Failed to get workshops Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
        }

        return response.json();
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

    // Create event (post)
    async create(event) {
        const url = this.serviceLocation();

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        });

        if (!response.ok) {
            const text = await response.text();
            alert("Failed to create workshop, Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
        }

        return response.json();
    }
}

export default EventService;
