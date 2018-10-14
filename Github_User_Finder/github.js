class Github {
    constructor() {
        this.client_id = '41b0efa5279c35bf11d4';
        this.client_secret = 'f3af980840d677fd83413296032d6544f697d7ab';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        return {
            profile: profile
        }
    }
}