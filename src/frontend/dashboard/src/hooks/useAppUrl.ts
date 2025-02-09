import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

export const useAppUrl = (param: string): [string, SetURLSearchParams] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get(param) as string;

    return [value, setSearchParams];
};