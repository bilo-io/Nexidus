import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters, DataViewType } from '../../components/App/ContentFilters/ContentFilters';
import { ISelectOption, Modal, Text, View } from '../../components/Core'
import { Async } from '../../components/Core/Async';
import { Table } from '../../components/Core/Table';
import { ITransaction } from '../../models/transaction';
import { payins as mockData } from '../../data/mockData'
import { ColumnDef } from '@tanstack/react-table';
import { downloadCSV } from '../../utils/download';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { getStats } from '../../utils/stats';
import FintechIcon, { FintechType } from '../../components/Core/FintechIcon';
import { toSentenceCase } from '../../utils/casing';
import { useAppUrl } from '../../hooks/useAppUrl';
import { getFilterOptionsArray, useFilterOptions } from '../../hooks/useFilterOptions';

import StatsView from '../../components/Core/StatsView';
import ChartsView from '../../components/Core/ChartsView';

type TransactionsProps = object

export const Transactions: React.FC<TransactionsProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { getStaticFilterOptions } = useFilterOptions();
    const [params,] = useAppUrl(null);
    const [query,] = useState<any>({
        status: {
            key: 'status',
            // @ts-ignore
            options: params.status
        }
    })
    console.log({ query, params })
    const { globalFilters, setGlobalFilters, } = useNexidusPage<ITransaction>();
    const { loading, retry } = useNexidusApi<ITransaction>({
        path: '',
        params: params as { [key in string]: string }
    });
    // #endregion

    const stats = getStats<ITransaction>(mockData, 'amount')
    const [activeView, setActiveView] = useState<DataViewType>('table');
    const [showModal, setShowModal] = useState<boolean>(false);

    // #region TABLE
    const columns: (ColumnDef<ITransaction> & {
        options?: ISelectOption[],
        accessorKey: string
    })[] = [
            {
                accessorKey: 'id',
                header: t('Transaction ID'),
            },
            {
                accessorKey: 'date',
                header: t('Date'),
            },
            {
                accessorKey: 'amount',
                header: t('Amount'),
                cell: ({ row: { original } }) => `$${original.amount.toFixed(2)}`,
            },
            {
                accessorKey: 'status',
                header: t('Status'),
                options: getStaticFilterOptions('status'),
                cell: ({ row: { original } }) => {
                    const { status } = original;
                    switch (status) {
                        case 'pending':
                            return <StatusCircle status={status} color={theme.warning} />;
                        case 'success':
                            return <StatusCircle status={status} color={theme.success} />;
                        case 'failed':
                            return <StatusCircle status={status} color={theme.error} />;
                        default:
                            return t('Unknown');
                    }
                },
            },
            {
                accessorKey: 'authStatus',
                header: t('authStatus'),
                options: getStaticFilterOptions('authStatus'),
                cell: ({ row: { original } }) => {
                    const { authStatus } = original;
                    switch (authStatus) {
                        case 'authenticated':
                            return <StatusCircle status={authStatus} color={theme.success} />;
                        case 'unauthenticated':
                            return <StatusCircle status={authStatus} color={theme.error} />;
                        case 'pending':
                            return <StatusCircle status={authStatus} color={theme.warning} />;
                        default:
                            return <StatusCircle status={'N / A'} color={theme.textLight} />;
                    }
                },
            },
            {
                accessorKey: 'type',
                header: t('Type'),
                options: getStaticFilterOptions('type'),
                cell: ({ row: { original } }) => t(original.type.charAt(0).toUpperCase() + original.type.slice(1)),
            },
            {
                accessorKey: 'currency',
                header: t('Currency'),
                options: getStaticFilterOptions('currency'),
                cell: ({ row: { original } }) => original.currency.toUpperCase(),
            },
            {
                accessorKey: 'paymentType',
                header: t('Payment Type'),
                options: getStaticFilterOptions('paymentType'),
                cell: ({ row: { original } }) => (
                    <View className='flex flex-row items-center'>
                        <FintechIcon name={original.paymentType as FintechType} />
                        <Text className='ml-2 opacity-50 text-sm'>({original.paymentType})</Text>
                    </View>
                ),
            },
            {
                accessorKey: 'externalRef',
                header: t('External Reference'),
                options: [],
                cell: ({ row: { original } }) => original.externalRef ?? t('N/A'),
            },
            {
                accessorKey: 'cardNetwork',
                header: t('Network'),
                options: getStaticFilterOptions('cardNetwork'),
                cell: ({ row: { original } }) => (
                    <FintechIcon name={original.cardNetwork as FintechType} />
                ),
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
                options: getStaticFilterOptions('bank'),
                cell: ({ row: { original } }) => original.bank ?? t('N/A'),
            },
        ];
    //#endregion

    const filterOptions = getFilterOptionsArray<ITransaction>(mockData, columns)

    const handleFilterChange = (key: keyof ITransaction, value: any) => {
        console.log(`Filter changed: ${key} = ${value}`);
        // TODO: Implement state update logic
    };

    return (
        <View isPage className="w-full">
            <AppTopBar
                title={t('Transactions')}
                hasBreadcrumbs
            />

            <View isPadded className='mt-12'>
                <GlobalFilters
                    value={globalFilters}
                    onChange={(arg) => {
                        console.log("GlobalFilters.onChange", arg)
                        setGlobalFilters((prev) => ({
                            ...prev,
                            ...arg
                        }))
                    }}
                />

                <ContentFilters<ITransaction>
                    value={query}
                    options={filterOptions}
                    onChange={handleFilterChange}
                    onReload={retry}
                    onDownload={() => downloadCSV(mockData, `Transactions_${new Date().toISOString()}.csv`)}
                    onAdd={() => alert('TODO: show modal')}
                    onActiveView={(view: DataViewType) => setActiveView(view)}
                    activeView={activeView}
                />

                <View className='my-4'>
                    <Async loading={loading} error={null} onRetry={retry}>
                        {activeView === 'table' ? (
                            <Card>
                                <Table
                                    data={mockData}
                                    columns={columns}
                                />
                            </Card>
                        ) : null}

                        {activeView === 'charts' ? (
                            <View className='flex flex-col w-full'>
                                <View className='mb-4 w-full'>
                                    <StatsView stats={stats} currency={globalFilters?.currency} />
                                </View>

                                <View>
                                    <ChartsView data={mockData} />
                                </View>
                            </View>
                        ) : null}

                        {/* {activeView === 'custom'} */}
                    </Async>
                </View>

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    isCloseButtonInverted
                >
                    <View className="w-11/12 md:w-fit md:min-w-44 lg:min-w-56">
                        <Text className='text-lg'>Modal demo</Text>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default Transactions;

export const StatusCircle = ({ color, status }: { color: string, status: string }) => {
    return <View className='flex flex-row items-center'>
        <Circle color={color} />
        <Text className='ml-2'>{toSentenceCase(status)}</Text>
    </View>
}

export const Circle = ({ color }: { color: string }) => {
    return (
        <div className='w-2.5 h-2.5 rounded-full' style={{
            backgroundColor: color
        }}></div>
    )
}