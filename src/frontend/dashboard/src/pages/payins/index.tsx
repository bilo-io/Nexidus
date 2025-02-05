import React from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters } from '../../components/App/ContentFilters';
import { Text, View } from '../../components/Core'
import { Async } from '../../components/Core/Async';
import { Table } from '../../components/Core/Table';
import { ITransaction } from '../../models/transaction';

import { payins as mockData } from '../../data/mockData'
import { ColumnDef } from '@tanstack/react-table';

type PayinsProps = object

export const Payins: React.FC<PayinsProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { globalFilters, contentFilters, columnDef } = useNexidusPage<ITransaction>();
    console.log({
        columnDef
    })
    const { loading, error, retry } = useNexidusApi<ITransaction>({
        path: '',
        params: {
            ...contentFilters
        }
    });
    const data = mockData;
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

    // #endregion

    // Define filter options dynamically based on ITransaction properties
    const filterOptions: Record<keyof ITransaction, { label: string; value: any }[]> = {
        status: [
            { label: t('Pending'), value: 'pending' },
            { label: t('Success'), value: 'success' },
            { label: t('Failed'), value: 'failed' },
        ],
        type: [
            { label: t('Credit'), value: 'credit' },
            { label: t('Debit'), value: 'debit' },
        ],
        date: [
            { label: t('Last 7 Days'), value: 'last-7-days' },
            { label: t('Last 30 Days'), value: 'last-30-days' },
            { label: t('Last 60 Days'), value: 'last-60-days' },  // Added option for 60 days
            { label: t('This Month'), value: 'this-month' },       // Added option for current month
        ],
        amount: [
            { label: t('Greater than $100'), value: '>100' },  // Example of filtering based on amount
            { label: t('Less than $50'), value: '<50' },
            { label: t('Between $50 and $100'), value: '50-100' },
        ],
        id: [],  // Optionally can be extended to allow filtering by transaction ID
        externalRef: [],  // Added option to filter by external reference
        rrn: [],  // Added option to filter by reference number
        currency: [
            { label: t('USD'), value: 'USD' },
            { label: t('EUR'), value: 'EUR' },
            { label: t('GBP'), value: 'GBP' },
            // Add more currencies as needed
        ],
        paymentType: [
            { label: t('EFT'), value: 'EFT' },
            { label: t('Crypto'), value: 'Crypto' },
            { label: t('Card'), value: 'Card' },
            { label: t('AppleWallet'), value: 'AppleWallet' },
            { label: t('PayPal'), value: 'PayPal' },
            { label: t('Other'), value: 'Other' },
        ],
        sender: [],  // Optionally can be extended to filter by sender
        receiver: [],  // Optionally can be extended to filter by receiver
        transactionFee: [
            { label: t('Greater than $5 fee'), value: '>5' },
            { label: t('Less than $1 fee'), value: '<1' },
            { label: t('No fee'), value: '0' },
        ],  // Example of filtering by transaction fee
        merchantId: [],  // Optionally can be extended to filter by merchant ID
        bank: [],  // Optionally can be extended to filter by bank/wallet used
    };


    const handleFilterChange = (key: keyof ITransaction, value: any) => {
        console.log(`Filter changed: ${key} = ${value}`);
        // TODO: Implement state update logic
    };

    return (
        <View isPage className="w-full">
            <Text className="text-xl font-semibold">{t('Payins')}</Text>

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

export default Payins;
