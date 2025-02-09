import { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

export const useNexidusPage = <T extends Record<string, any>>() => {
    const [globalFilters, setGlobalFilters] = useState<Record<string, any>>({
        currency: 'ZAR',
        startDate: new Date(),
        endDate: new Date()
    });
    const [contentFilters, setContentFilters] = useState<Record<string, any>>({});

    // Infer column definitions based on the type of T
    const columnDef: ColumnDef<T>[] = useMemo(() => {
        return Object.keys(globalFilters).map((key) => {
            return {
                accessorKey: key,
                header: key.charAt(0).toUpperCase() + key.slice(1),
            };
        });
    }, [globalFilters]);

    // Infer filters dynamically based on the properties of T
    const inferredFilters = useMemo(() => {
        const filters: Record<string, any> = {};
        Object.keys(globalFilters).forEach((key) => {
            const value = globalFilters[key];

            if (typeof value === 'number') {
                filters[key] = { type: 'range', min: 0, max: 100 };
            } else if (typeof value === 'string') {
                if (new Date(value).toString() !== 'Invalid Date') {
                    filters[key] = { type: 'date' };
                } else {
                    filters[key] = { type: 'text' };
                }
            } else if (typeof value === 'boolean') {
                filters[key] = { type: 'boolean' };
            }
        });
        return filters;
    }, [globalFilters]);

    return {
        globalFilters,
        setGlobalFilters,
        contentFilters,
        setContentFilters,
        columnDef,
        inferredFilters,
    };
};
