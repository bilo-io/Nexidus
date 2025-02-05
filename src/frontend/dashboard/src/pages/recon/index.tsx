import React from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters } from '../../components/App/ContentFilters/ContentFilters';
import { Text, View } from '../../components/Core'
import { Async } from '../../components/Core/Async';
import { Table } from '../../components/Core/Table';
import { ITransaction } from '../../models/transaction';
import { getFilterOptions } from '../../components/App/ContentFilters/filterOptions';
import { payins as mockData } from '../../data/mockData'
import { ColumnDef } from '@tanstack/react-table';

type ReconProps = object

export const Recon: React.FC<ReconProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { globalFilters, contentFilters } = useNexidusPage<ITransaction>();
    const { loading, retry } = useNexidusApi<ITransaction>({
        path: '',
        params: {
            ...contentFilters
        }
    });
    // #endregion

    // Define filter options dynamically based on ITransaction properties
    const filterOptions = getFilterOptions<ITransaction>(mockData[0]);

    // #region TABLE
    const columns: ColumnDef<ITransaction>[] = [
        {
            accessorKey: 'id',
            header: t('Transaction ID'),
        },
        {
            accessorKey: 'date',
            header: t('Date'),
            // You can add custom formatting for date, if needed, like:
            // cell: ({ row: { original } }) => formatDate(original.date)
        },
        {
            accessorKey: 'amount',
            header: t('Amount'),
            // You can also format the amount (e.g., adding currency symbol)
            cell: ({ row: { original } }) => `$${original.amount.toFixed(2)}`,
        },
        {
            accessorKey: 'status',
            header: t('Status'),
            // You can also add conditional formatting for status
            cell: ({ row: { original } }) => {
                switch (original.status) {
                    case 'pending':
                        return t('Pending');
                    case 'success':
                        return t('Success');
                    case 'failed':
                        return t('Failed');
                    default:
                        return t('Unknown');
                }
            },
        },
        {
            accessorKey: 'type',
            header: t('Type'),
            // If needed, you can add custom formatting for type
            cell: ({ row: { original } }) => t(original.type.charAt(0).toUpperCase() + original.type.slice(1)),
        },
        {
            accessorKey: 'currency',
            header: t('Currency'),
            cell: ({ row: { original } }) => original.currency.toUpperCase(),
        },
        {
            accessorKey: 'paymentType',
            header: t('Payment Type'),
            cell: ({ row: { original } }) => t(original.paymentType),
        },
        {
            accessorKey: 'externalRef',
            header: t('External Reference'),
            cell: ({ row: { original } }) => original.externalRef ?? t('N/A'),
        },
        {
            accessorKey: 'rrn',
            header: t('RRN'),
            cell: ({ row: { original } }) => original.rrn ?? t('N/A'),
        },
        {
            accessorKey: 'sender',
            header: t('Sender'),
            cell: ({ row: { original } }) => original.sender ?? t('Unknown'),
        },
        {
            accessorKey: 'receiver',
            header: t('Receiver'),
            cell: ({ row: { original } }) => original.receiver ?? t('Unknown'),
        },
        {
            accessorKey: 'transactionFee',
            header: t('Transaction Fee'),
            // @ts-ignore
            cell: ({ row: { original } }) => `$${original.transactionFee.toFixed(2)}`,
        },
        {
            accessorKey: 'merchantId',
            header: t('Merchant ID'),
            cell: ({ row: { original } }) => original.merchantId ?? t('N/A'),
        },
        {
            accessorKey: 'bank',
            header: t('Bank'),
            cell: ({ row: { original } }) => original.bank ?? t('N/A'),
        },
    ];
    //#endregion

    const handleFilterChange = (key: keyof ITransaction, value: any) => {
        console.log(`Filter changed: ${key} = ${value}`);
        // TODO: Implement state update logic
    };

    return (
        <View isPage className="w-full">
            <View className='mb-10'>
                <Text className="text-xl font-semibold">{t('Recon')}</Text>
            </View>

            <GlobalFilters value={globalFilters} />

            <ContentFilters<ITransaction>
                value={contentFilters}
                options={filterOptions}
                onChange={handleFilterChange}
            />

            <View className='my-12'>
                <Async loading={loading} error={null} onRetry={retry}>
                    <Table
                        data={mockData}
                        columns={columns}
                    />
                </Async>
            </View>
        </View>
    );
};

export default Recon;
