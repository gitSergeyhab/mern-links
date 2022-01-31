import { useCallback, useState } from "react"

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const res = await fetch(url, {method, body, headers});
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'response is not OK');
            }

            setLoading(false);
            // setError(false);

            return data;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            throw err;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}