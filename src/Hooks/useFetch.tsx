import React from "react";

interface FetchResponse<T> {
    response: Response;
    json: T;
}

interface UseFetchReturn<T> {
    user: T | null;
    loading: boolean;
    error: string | null;
    request: (url: string, options: RequestInit) => Promise<FetchResponse<T>>;
}

const useFetch = <T, >(): UseFetchReturn<T> => {
    const [user, setUser] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const request = React.useCallback(async (url: string, options: RequestInit): Promise<FetchResponse<T>>  => {
        let response: Response;
        let json: T;
        try {
            setError(null);
            setLoading(true);
            response = await fetch(url, options);
            json = await response.json();
            if (response.ok ===false) throw new Error ((json as any)?.message || 'Erro ao carregar dados');
            setUser(json);
            return { response, json };
        }catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        loading,
        error,
        request
    }
}

export default useFetch;
