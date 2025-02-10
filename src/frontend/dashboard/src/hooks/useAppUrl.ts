import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

export const useAppUrl = (
    param: string | null
): [string | string[] | { [k: string]: string; } | null, SetURLSearchParams] => {
    const [searchParams, setSearchParams] = useSearchParams();

    let value: string | string[] | { [k: string]: string; } | null;

    if (param) {
        // Get single param value
        value = searchParams.getAll(param);
        // Return string if only one value, else return array
        value = value.length > 1 ? value : value[0] || null;
    } else {
        // Convert all query params to an object
        value = Object.fromEntries(searchParams.entries());
    }

    return [value, setSearchParams];
};
