import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useAxios = <T>(
    config: AxiosRequestConfig<any>,
    loadOnStart: boolean = true,
    mapResponse: (data: any) => T = (data) => data as T
): [boolean, T | undefined, string, () => void] => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState('');

    useEffect(() => {
        if (loadOnStart) sendRequest();
        else setLoading(false);
    }, []);

    const sendRequest = () => {
        setLoading(true);

        axios(config)
            .then((response: AxiosResponse) => {
                setError('');
                setData(mapResponse(response.data));
            })
            .catch((error: AxiosError) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return [loading, data, error, sendRequest];
};

export default useAxios