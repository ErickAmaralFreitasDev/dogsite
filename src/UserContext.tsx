import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Hooks/api';
import {useNavigate} from 'react-router-dom';

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
  userLogout: () => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserStorage = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserData | null>(null);
    const [login, setLogin] = React.useState<boolean | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const userLogout = React.useCallback(async function () {
        setUser(null);
        setLogin(false);
        setError(null);
        setLoading(false);
        window.localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    async function getUser(token: string) {
        const {url, options} = USER_GET({token});
        const response = await fetch(url, options);
        const json = await response.json();
        setUser(json);
        setLogin(true);
    }

    async function userLogin(username: string, password: string) {
        try {
            setError(null);
            setLoading(true);
            const {url, options} = TOKEN_POST ({username, password});
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) {
                throw new Error(`Error: Usuário Inválido ou Senha Incorreta`);
            }
            const {token} = await tokenRes.json();
            window.localStorage.setItem('token', token);
            await getUser(token);
            navigate('/conta');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setLogin(false);
        }finally {
            setLoading(false);
        }
    }

        React.useEffect (() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const { url, options} = TOKEN_VALIDATE_POST({ token });
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error('Token inválido');
                    await getUser(token);
                } catch (err) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            }
        }
        autoLogin();
    }, [userLogout]);

    return (
        <UserContext.Provider value={{ user, login, loading, error, userLogin, getUser, userLogout}}>
            {children}
        </UserContext.Provider>
    );
}
