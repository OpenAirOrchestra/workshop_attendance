/// webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class UserService {

    /// Get rest nonce from query parameter.
    restNonce() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('rest_nonce');
    }

    /// Get rest api location
    serviceLocation() {
        // current URL will be something like:
        // /wp-content/plugins/workshop_attendance/attendance/
        const baseRoute = '/wp-json/wp/v2/users/';
        // const baseRoute = '/wp-json/';
        const relativeURL = '../../../..' + baseRoute;

        return relativeURL;
    }

    async retrieve() {
        const rest_nonce = this.restNonce();
        const url = this.serviceLocation();
        
        const response = await fetch(url, { 
            headers : {
                'X-WP-Nonce': rest_nonce
            } 
        });
        console.log( "Response from retrieve: " + response );
        const result = response.ok ? response.json : [];

        return Promise.resolve(result);
    }
}

export default UserService;
