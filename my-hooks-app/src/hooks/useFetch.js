import { useState, useEffect } from 'react';

const cache = {};
export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cache[url]) {
            setData(cache[url]);
            setLoading(false);
            return;
        }

        let retryCount = 3;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                cache[url] = result;
                setData(result);
            } catch (err) {
                if (retryCount > 0) {
                    retryCount--;
                    fetchData();
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}
