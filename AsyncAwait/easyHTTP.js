class EasyHTTP {

    // GET
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    // POST
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    // PUT
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    // DELETE
    async delete(url, data) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await 'Resource Deleted';
    }
}