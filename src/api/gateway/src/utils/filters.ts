export type FilterFunction<T> = (item: T, filterValue: any) => boolean;

export const applyFilters = <T>(items: T[], filters: Record<string, any>, filterFunctions: Record<string, FilterFunction<T>>): T[] => {
    return items.filter(item =>
        Object.keys(filters).every(key =>
            filterFunctions[key] ? filterFunctions[key](item, filters[key]) : true
        )
    );
};

export type SortDirection = 'asc' | 'desc';

export const sortItems = <T>(items: T[], key: keyof T, direction: SortDirection = 'asc'): T[] => {
    return items.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};
