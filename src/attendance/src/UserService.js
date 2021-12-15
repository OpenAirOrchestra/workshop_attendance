/// webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class UserService {

    /// Get rest api location
    serviceLocation() {
        return "../../../../?rest_route=/wp/v2/users";
    }

    /// Retrieve users.
    /// page and per_page are needed because of the limits on the wordpress json api.
    async retrieve(page, per_page) {

        const searchParams = new URLSearchParams( {
            page: page,
            per_page: per_page
        });
        const url = this.serviceLocation() + "&" + searchParams.toString();
        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            alert( "Failed to list users, Response: " + response.status + " " + response.statusText + "\n" + text);

            return response.error();
        }
        
        return response.json();
    }
}

export default UserService;
