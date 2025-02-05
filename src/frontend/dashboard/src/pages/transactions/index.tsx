import React, { useState } from 'react';
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
import Icon from '../../components/Core/Icon';
import { downloadCSV } from '../../utils/download';
import { useTheme } from '../../context/ThemeContext';
import Charts from '../misc/charts';

type TransactionsProps = object

export const Transactions: React.FC<TransactionsProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { globalFilters, contentFilters } = useNexidusPage<ITransaction>();
    const { loading, retry } = useNexidusApi<ITransaction>({
        path: '',
        params: {
            ...contentFilters
        }
    });
    // #endregion

    const [activeView, setActiveView] = useState<'table' | 'chart'>('table');
    const [showFilters, setShowFilters] = useState<boolean>(false);

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
            <View className='mb-10 w-full flex flex-row justify-between'>
                <View>
                    <Text className="text-xl font-semibold">{t('Transactions')}</Text>
                </View>

                <View flex flexRow className='gap-4 my-4'>
                    <Icon name='MagnifyingGlass' className='size-6' />
                    <Icon name='Plus' className='size-6' onClick={() => alert('Create new entry')} />
                    <Icon name='AdjustmentsVertical' className='size-6' onClick={() => setShowFilters((prev) => !prev)} />
                    <Icon name='ArrowDownTray' className='size-6' onClick={() => downloadCSV(mockData, `Transactions_${new Date().toISOString()}.csv`)} />
                </View>
            </View>

            <View className={`transition ${showFilters ? 'h-fit' : 'h-0 overflow-hidden'}`}>
                <GlobalFilters value={globalFilters} />

                <ContentFilters<ITransaction>
                    value={contentFilters}
                    options={filterOptions}
                    onChange={handleFilterChange}
                />
            </View>

            <View className='my-12'>
                <Async loading={loading} error={null} onRetry={retry}>
                    <View flex flexRow className='gap-2'>
                        <Icon
                            name='TableCells'
                            onClick={() => setActiveView('table')}
                            className='size-8'
                            style={{
                                color: activeView === 'table' ? theme?.primary : theme?.text,
                            }}
                        />
                        <Icon
                            name='ChartBar'
                            onClick={() => setActiveView('chart')}
                            className='size-8'
                            style={{
                                color: activeView === 'chart' ? theme?.primary : theme?.text,
                            }}
                        />
                    </View>
                    {activeView === 'table' ? (
                        <Table
                            data={mockData}
                            columns={columns}
                        />
                    ) : null}

                    {activeView === 'chart' ? (
                        <Charts
                            // data={mockData}
                            // columns={columns}
                        />
                    ) : null}
                </Async>
            </View>
        </View>
    );
};

export default Transactions;
