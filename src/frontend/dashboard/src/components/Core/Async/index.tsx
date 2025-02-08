import { ReactNode } from 'react';
import Loader from '../Loader';
import { useTheme } from '../../../context/ThemeContext';

interface AsyncProps {
    loading: boolean;
    error: string | null;
    children: ReactNode;
    onRetry?: () => void;
    errorMessage?: string;
}

export const Async = ({ loading, error, children, onRetry, errorMessage }: AsyncProps) => {
    const { theme } = useTheme();

    if (loading) return (
        <p className='w-fit m-auto my-8'>
            <Loader color={theme?.primary} size='size-16' />
        </p>
    );

    if (error) return (
        <div className="w-fit mx-auto bg-red-100 opacity-80 p-4 px-6 rounded-lg">
            <p className="text-red-500">
                <strong>Error:</strong> {errorMessage || error}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="cursor-pointer mt-2 px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition focus:outline-none hover:border-red-500"
                >
                    Try again
                </button>
            )}
        </div>
    );

    return <>{children}</>;
};

export default Async;
