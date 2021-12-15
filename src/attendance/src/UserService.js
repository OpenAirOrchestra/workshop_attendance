/// webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class UserService {

    /// Get rest api location
    serviceLocation() {
        return "../users.php";
    }

    async retrieve() {
        const url = this.serviceLocation();
        
        const response = await fetch(url);
        console.log( "Response from retrieve: " + response );
        const result = response.ok ? response.json : [];

        return Promise.resolve(result);
    }
}

export default UserService;
