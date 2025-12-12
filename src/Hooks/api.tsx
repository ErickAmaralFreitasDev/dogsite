export const API_URL = 'http://dogsite.local/wp-json';

interface apiProps {
    username: string;
    password: string;
}

interface propsApi {
    token?: string;
    formData?: FormData;
    page?: number;
    total?: number;
    user?: number | string;
    id?: number;
}

// interface userProps {
//     body: {
//         username: string;
//         email: string;
//         password: string;
//     }
// }

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

export function TOKEN_VALIDATE_POST ({ token }: propsApi) {
    return {
        url: API_URL + '/jwt-auth/v1/token/validate',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
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

export function USER_POST ({ username, email, password }: { username: string, email: string, password: string }) {
    return {
        url: API_URL + '/api/user',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }
    }
}

export function PHOTO_POST({ formData, token }: propsApi) {
    return {
        url: API_URL + '/api/photo',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData
        }
    }
}

export function PHOTOS_GET({ page = 1, total = 6, user = 0 }: propsApi) {
    return {
        url: API_URL + `/api/photo?_page=${page}&_total=${total}&_user=${user}`,
        options: {
            method: 'GET',
            cache: 'no-store' as RequestCache,
        }
    }
}

export function PHOTO_GET({ id }: { id: number }) {
    return {
        url: API_URL + `/api/photo/${id}`,
        options: {
            method: 'GET',
            cache: 'no-store' as RequestCache,
        }
    }
}

export function ALLPHOTOS_GET({ page = 1, total = 6 }: { page?: number, total?: number }) {
    return {
        url: API_URL + `/api/photo?_page=${page}&_total=${total}`,
        options: {
            method: 'GET',
            cache: 'no-store' as RequestCache,
        }
    }
}


export function COMMENT_POST({ id, body, token }: { 
    id: number; 
    body: { comment: string }; 
    token: string 
    }) {
    return {
        url: API_URL + `/api/comment/${id}`,
        options: {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(body),
        },
    }
}

export function PHOTO_DELETE({ id, token }: { 
    id: number; 
    token: string 
    }) {
    return {
        url: API_URL + `/api/photo/${id}`,
        options: {
            method: 'DELETE',
            headers: {
            Authorization: 'Bearer ' + token,
        }},
    }
}

export function GET_STATS({ token }: { 
    token: string 
    }) {
    return {
        url: API_URL + `/api/stats`,
        options: {
            method: 'GET',
            headers: {
            Authorization: 'Bearer ' + token,
        }},
    }
}