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
            const text = await response.text();
            alert("Failed to get attendees Response: " + response.status + " " + response.statusText + "\n" + text);

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
            alert("Failed to get attendee " + id + ", Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
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
            const text = await response.text();
            alert("Failed to create attendance record, Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
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
            const text = await response.text();
            alert("Failed to create attendance record, Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
        }

        return Promise.resolve(response);
    }
}

export default AttendanceService;
