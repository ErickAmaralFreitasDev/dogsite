import React from "react";

const useFetch = () => {
    const [user, setUser] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const request = React.useCallback(async (url: string, options: RequestInit) => {
        let response;
        let json;
        try {
            setError(null);
            setLoading(true);
            response = await fetch(url, options);
            json = await response.json();
            if (response.ok ===false) throw new Error (json.message);
        }catch (err) {
            json = null;
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setUser(json);
            setLoading(false);
            return { response, json };
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
