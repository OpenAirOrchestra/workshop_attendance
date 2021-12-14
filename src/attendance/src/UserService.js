/// webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class UserService {

    async retrieve() {
        await new Promise((res) => setTimeout(res, 1000 * Math.random()));
        return Promise.resolve([]);
    }
}

export default UserService;
