/// webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class UserService {

    /// Get rest api location
    serviceLocation() {
        // DFDF TODO: deal with more than 100 users, use page=1 etc.
        return "../../../../?rest_route=/wp/v2/users&per_page=100";
    }

    async retrieve() {
        const url = this.serviceLocation();
        console.log( "URL to retrieve: " + url );

        const response = await fetch(url);

        if (!response.ok) {
            console.log( "Failed Response: " + response.status + " " + response.statusText );

            return Promise.resolve([]);
        }
        // console.log( "Response ok: " + response.ok );
        
        // const text = await response.text();

        // console.log( "Response text: " + text );
        // console.log( "Response json: " + JSON.parse(text) );
        // // const result = response.ok ? response.json : [];

        // return Promise.resolve([]);
        return response.json();
    }
}

export default UserService;
