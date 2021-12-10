/// Mock webservice for getting users from wordpress.
/// See: https://dzone.com/articles/consuming-rest-api-with-reactjs
/// See: https://developer.wordpress.org/rest-api/reference/users/

class MockUserService {

    constructor() {
        this.users = [
            { id: 99, name: 'Zaphod', first_name: 'Zaphond', last_name: 'Beeblebrox', email: 'zaphod@example.com', description: 'Presedent of the Galaxy', nickname: 'Zaphod Dude' },
            { id: 1099, name: 'FordP', first_name: 'Ford', last_name: 'Prefect', email: 'ford@example.com', description: 'Alien', nickname: 'Fnord' },
            { id: 1100, name: 'AurthorD', first_name: 'Arthor', last_name: 'Dent', email: 'arthor@example.com', description: 'Sad Earthline', nickname: 'DentArthorDent' },
            { id: 1101, name: 'MarvinA', first_name: 'Marvin', last_name: 'Android', email: 'marvin@example.com', description: 'Marvin the paranoid android', nickname: 'SadMarvin' }
        ];
    }

    async retrieve() {
        return Promise.resolve(this.users);
    }
}

export default MockUserService;