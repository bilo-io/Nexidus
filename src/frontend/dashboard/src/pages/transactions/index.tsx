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
import { copyToClipboard } from '../../utils/clipboard';
import {
    renderAuthStatus,
    renderPaymentType,
    renderTransactionStatus
} from '../../components/Core/Table/CellRenderers';

type TransactionsProps = object

export const Transactions: React.FC<TransactionsProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { getStaticFilterOptions } = useFilterOptions();
    const [, setSearchParams] = useAppUrl('');
    const [params,] = useAppUrl(null);
    const [query, setQuery] = useState<any>({
        ...(params as object)
    })

    const { globalFilters, setGlobalFilters, } = useNexidusPage<ITransaction>();
    const { data, meta, error, loading, retry } = useNexidusApi<ITransaction>({
        path: '/api/transactions',
        params: params as { [key in string]: string }
    });

    console.log(data, meta)
    // #endregion

    const stats = getStats<ITransaction>(data, 'amount')
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
                cell: ({ row: { original } }) => (
                    <View className='mx-auto w-fit'>
                        <Text># {original.id}</Text>
                    </View>
                )
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
                cell: renderTransactionStatus({ t, theme })
            },
            {
                accessorKey: 'authStatus',
                header: t('authStatus'),
                options: getStaticFilterOptions('authStatus'),
                cell: renderAuthStatus({ t, theme })
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
                cell: renderPaymentType({ t, theme })
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
                    <View className='flex flex-row items-center'>
                        <FintechIcon name={original.cardNetwork as FintechType} />
                        <Text className='ml-2 opacity-50 text-sm'>({original.cardNetwork as string})</Text>
                    </View>
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

    const filterOptions = getFilterOptionsArray<ITransaction>(data, columns)

    const handleFilterChange = (key: keyof ITransaction, item: ISelectOption) => {
        setQuery((prev: any) => ({
            ...prev,
            [key]: item.value,
        }));

        setSearchParams({
            ...query,
            [key]: item.value,
        })
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
                    onDownload={() => downloadCSV(data, `Transactions_${new Date().toISOString()}.csv`)}
                    onAdd={() => setShowModal(true)}
                    onCopyLink={() => {
                        copyToClipboard(window.location.href)
                    }}
                    onClear={() => {
                        setQuery({})
                        setSearchParams({})

                        // setTimeout(() => retry())
                        window.location.reload()
                    }}
                    onActiveView={(view: DataViewType) => setActiveView(view)}
                    activeView={activeView}
                />

                <View className='my-4'>
                    <Async loading={loading} error={error} onRetry={retry}>
                        {activeView === 'table' ? (
                            <Card>
                                <Table
                                    data={data}
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
                                    <ChartsView data={data} />
                                </View>
                            </View>
                        ) : null}
                    </Async>
                </View>

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    position='bottom'
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