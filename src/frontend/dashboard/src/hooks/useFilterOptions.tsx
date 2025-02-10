import { useTranslation } from 'react-i18next';
import { ISelectOption } from '../components/Core';
import { ColumnDef } from '@tanstack/react-table';

export function getDynamicFilterOptions<T extends object>(mockData: T[]) {
    if (mockData.length === 0) {
        return {}; // Return an empty object if the array is empty
    }

    const keys = Object.keys(mockData[0]); // Now safe because T extends object

    let filterOptions: Record<string, ISelectOption[]> = {}; // Use ISelectOption[]

    keys.forEach((key) => {
        const uniqueValues = new Set<string>(); // Collect unique values

        mockData.forEach((row) => {
            const value = String(row[key as keyof T]); // Ensure value is a string
            uniqueValues.add(value);
        });

        filterOptions[key] = Array.from(uniqueValues).map((value) => ({
            label: value,
            value: value,
        }));
    });

    return filterOptions;
}


// Function to get filter options based on key
export function getFilterStaticOptions(key: string, t: (key: string) => string): ISelectOption[] {
    switch (key) {
        case 'amount':
            return [
                { label: t('low'), value: 0 },
                { label: t('medium'), value: 100 },
                { label: t('high'), value: 1000 },
            ];

        case 'date':
            return [
                { label: t('last_week'), value: 'last_week' },
                { label: t('last_month'), value: 'last_month' },
                { label: t('this_year'), value: 'this_year' },
                { label: t('all_time'), value: 'all_time' },
            ];

        case 'status':
            return [
                { label: t('pending'), value: 'pending' },
                { label: t('success'), value: 'success' },
                { label: t('failed'), value: 'failed' },
            ];

        case 'authStatus':
            return [
                { label: t('pending'), value: 'pending' },
                { label: t('authenticated'), value: 'authenticated' },
                { label: t('unauthenticated'), value: 'unauthenticated' }
            ]

        case 'type':
            return [
                { label: t('credit'), value: 'Credit' },
                { label: t('debit'), value: 'Debit' },
            ];

        case 'currency':
            return [
                { label: 'USD', value: 'USD' },
                { label: 'EUR', value: 'EUR' },
                { label: 'GBP', value: 'GBP' },
                { label: 'ZAR', value: 'ZAR' },
            ];

        case 'paymentType':
            return [
                { label: t('eft'), value: 'EFT' },
                { label: t('crypto'), value: 'Crypto' },
                { label: t('card'), value: 'Card' },
                { label: t('apple_wallet'), value: 'AppleWallet' },
                { label: t('paypal'), value: 'PayPal' },
                { label: t('other'), value: 'Other' },
            ];

        case 'transactionFee':
            return [
                { label: t('no_fee'), value: 0 },
                { label: t('low_fee'), value: 1 },
                { label: t('high_fee'), value: 10 },
            ];

        case 'bank':
            return [
                { label: t('FNB'), value: 'FNB' },
                { label: t('ABSA'), value: 'ABSA' },
                { label: t('StandardBank'), value: 'StandardBank' },
                { label: t('FNB'), value: 'FNB' },
                { label: t('Capitec'), value: 'Capitec' },
                { label: t('Discovery'), value: 'Discovery' },
            ]

        case 'cardNetwork':
            return [
                { label: t('Visa'), value: 'Visa' },
                { label: t('Mastercard'), value: 'Mastercard' },
                { label: t('AmericanExpress'), value: 'AmericanExpress' },
                { label: t('Discover'), value: 'Discover' },
            ]

        default:
            return [];
    }
}

export function getFilterOptionsArray<T extends object>(
    mockData: T[],
    columns: (ColumnDef<T> & {
            options?: ISelectOption[],
            accessorKey: string
        })[]
): { key: string; options: ISelectOption[] }[] {
    const dynamicFilterOptions = getDynamicFilterOptions<T>(mockData);

    const staticFilterOptions = columns
        .filter((item: ColumnDef<T> & {
            options?: ISelectOption[],
            accessorKey: string
        }) => item.options?.length)
        .reduce((acc, item) => {
            acc[item.accessorKey] = item.options!;
            return acc;
        }, {} as Record<string, ISelectOption[]>);

    // Merge staticFilterOptions into dynamicFilterOptions (static overrides dynamic)
    const filterOptionsObject = {
        ...dynamicFilterOptions,
        ...staticFilterOptions, // Static will override dynamic
    };

    // Convert to the correct format: [{ key: string, options: ISelectOption[] }]
    return Object.entries(filterOptionsObject).map(([key, options]) => ({
        key,
        options,
    }));
}


// Custom hook to provide filter options
export function useFilterOptions() {
    const { t } = useTranslation();

    return {
        getStaticFilterOptions: (key: string) =>
            getFilterStaticOptions(key, t),
        getDynamicFilterOptions: <T extends object>(mockData: T[]) =>
            getDynamicFilterOptions(mockData),
    };
}
