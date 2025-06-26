import React from 'react';
import { TOKEN_POST, USER_GET } from './Hooks/api';


interface UserData {
  id: number;
  username: string;
  email: string;
  nome: string;
  token?: string; 
}

interface UserContextType {
  user: UserData | null;
  login: boolean | null;
  loading: boolean;
  error: string | null;
  userLogin: (username: string, password: string) => Promise<void>;
  getUser: (token: string) => Promise<void>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserStorage = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserData | null>(null);
    const [login, setLogin] = React.useState<boolean | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function getUser(token: string) {
        const {url, options} = USER_GET({token});
        const response = await fetch(url, options);
        const json = await response.json();
        setUser(json);
        setLogin(true);
    }

    async function userLogin(username: string, password: string) {
        const {url, options} = TOKEN_POST ({username, password});
        const tokenRes = await fetch(url, options);
        const {token} = await tokenRes.json();
        window.localStorage.setItem('token', token);
        getUser(token);
    }

    return (
        <UserContext.Provider value={{ user, login, loading, error, userLogin, getUser }}>
            {children}
        </UserContext.Provider>
    );
}
