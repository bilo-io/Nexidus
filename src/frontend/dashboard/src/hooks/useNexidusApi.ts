import { useEffect, useState, useCallback } from 'react';

interface FetchOptions {
    path: string;
    params?: Record<string, string | number | boolean>;
    enabled?: boolean;
}

interface ApiResponse<T> {
    data: T[];
    meta: {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    };
}

// @ts-ignore
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const API_BASE_URL = window.location.origin === 'http://localhost:8080'
    ? 'http://localhost:8001'
    : 'https://nexidus-api.vercel.app';

export const useNexidusApi = <T,>({ path, params = {}, enabled = true }: FetchOptions) => {
    const [meta, setMeta] = useState<ApiResponse<T>['meta'] | null>(null);

    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        await sleep(1000);

        try {
            // Convert params object to query string
            const queryString = new URLSearchParams(
                Object.entries(params).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {} as Record<string, string>)
            ).toString();

            const url = queryString ? `${API_BASE_URL}${path}?${queryString}` : `${API_BASE_URL}${path}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result: ApiResponse<T> = await response.json();

            setData((Array.isArray(result.data) ? result.data : result) as T[]);
            setMeta(result.meta);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [path, JSON.stringify(params), enabled]); // Stringify params to avoid unnecessary re-renders

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, meta, loading, error, retry: fetchData };
};
