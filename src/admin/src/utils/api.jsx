class API {
  BASE_URL = 'http://localhost:8000' // getenv('BASE_URL', 'http://localhost:8000');

  request(endpoint, options = {}) {
    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  auth(username, password) {
    return this.post('/auth/login', { username, password });
  }
}

export default new API;
