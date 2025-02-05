type FilterOption = {
    label: string;
    value: string | number | boolean;
};

export function getFilterOptions<T extends object>(sample: T): Record<keyof T, FilterOption[]> {
    const filterOptions: Record<keyof T, FilterOption[]> = {} as Record<keyof T, FilterOption[]>;

    const keys = Object.keys(sample) as (keyof T)[];

    // console.log('Object.keys(sample):', keys);

    // Dynamically generate filter options based on the type of T
    keys.forEach((key) => {
        switch (key) {
            case 'amount':
                filterOptions[key] = [
                    { label: 'Low', value: 0 },
                    { label: 'Medium', value: 100 },
                    { label: 'High', value: 1000 },
                ];
                break;

            case 'date':
                filterOptions[key] = [
                    { label: 'Last Week', value: 'last_week' },
                    { label: 'Last Month', value: 'last_month' },
                    { label: 'This Year', value: 'this_year' },
                    { label: 'All Time', value: 'all_time' },
                ];
                break;

            case 'status':
                filterOptions[key] = [
                    { label: 'Pending', value: 'pending' },
                    { label: 'Success', value: 'success' },
                    { label: 'Failed', value: 'failed' },
                ];
                break;

            case 'type':
                filterOptions[key] = [
                    { label: 'Credit', value: 'Credit' },
                    { label: 'Debit', value: 'Debit' },
                ];
                break;

            case 'currency':
                filterOptions[key] = [
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'GBP', value: 'GBP' },
                    { label: 'ZAR', value: 'ZAR' },
                ];
                break;

            case 'paymentType':
                filterOptions[key] = [
                    { label: 'EFT', value: 'EFT' },
                    { label: 'Crypto', value: 'Crypto' },
                    { label: 'Card', value: 'Card' },
                    { label: 'AppleWallet', value: 'AppleWallet' },
                    { label: 'PayPal', value: 'PayPal' },
                    { label: 'Other', value: 'Other' },
                ];
                break;

            case 'transactionFee':
                filterOptions[key] = [
                    { label: 'No Fee', value: 0 },
                    { label: 'Low Fee', value: 1 },
                    { label: 'High Fee', value: 10 },
                ];
                break;

            // Add more cases for other fields in your types
            default:
                break;
        }
    });

    return filterOptions;
}
