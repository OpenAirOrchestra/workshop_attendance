/// Restful web service for getting attendance records.
/// See:  https://dzone.com/articles/consuming-rest-api-with-reactjs
class AttendanceService {

    /// Get rest api location
    serviceLocation() {
        return "../../../../?rest_route=/workshop_attendance/v1/attendees";
    }

    async retrieve(page, per_page, event_id) {
        const searchParams = new URLSearchParams({
            page: page,
            per_page: per_page
        });
        if (event_id) {
            searchParams.set('search', event_id);
        }
        const url = this.serviceLocation() + "&" + searchParams.toString();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to get attendees Response: " + response.status + " " + response.statusText);
        }

        return response.json();
    }

    /// Get request (get an event)
    async get(id) {
        const url = this.serviceLocation() + "/" + id;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to get attendee Response: " + response.status + " " + response.statusText);
        }

        return response.json();
    }

    async create(attendanceRecord) {
        const url = this.serviceLocation();

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendanceRecord)
        });

        if (!response.ok) {
            throw new Error("Failed to create attendance record Response: " + response.status + " " + response.statusText);
        }

        return response.json();
    }

    async delete(id) {
        const url = this.serviceLocation() + "/" + id;

        const response = await fetch(url, {
            method: "DELETE",
            mode: "cors"
        })

        if (!response.ok) {
            throw new Error("Failed to delete attendees Response: " + response.status + " " + response.statusText);
        }

        return Promise.resolve(response);
    }
}

export default AttendanceService;
