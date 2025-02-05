import { useEffect, useState, useCallback } from 'react';

interface FetchOptions {
    path: string;
    params?: Record<string, string | number | boolean>;
}

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export const useNexidusApi = <T,>({ path, params = {} }: FetchOptions) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        await sleep(2000)

        try {
            // Convert params object to query string
            const queryString = new URLSearchParams(params as Record<string, string>).toString();
            const url = queryString ? `${path}?${queryString}` : path;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [path, params]);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, retry: fetchData };
};
