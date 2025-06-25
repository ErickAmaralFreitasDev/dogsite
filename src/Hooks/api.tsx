export const API_URL = 'http://dogsite.local/wp-json';

interface apiProps {
    username: string;
    password: string;
}

interface propsApi {
    token: string;
}

export function TOKEN_POST ({ username, password}: apiProps) {
    return {
        url: API_URL + '/jwt-auth/v1/token',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }
    }
}

export function USER_GET ({token}:propsApi) {
    return {
        url: API_URL + '/api/user',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
    }
}