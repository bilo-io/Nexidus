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
import { toSentenceCase } from '../../utils/casing';
import { useAppUrl } from '../../hooks/useAppUrl';
import { getFilterOptionsArray, useFilterOptions } from '../../hooks/useFilterOptions';

import StatsView from '../../components/Core/StatsView';
import ChartsView from '../../components/Core/ChartsView';
import { copyToClipboard } from '../../utils/clipboard';
import {
    renderAuthStatus,
    renderPaymentType,
    renderTransactionStatus,
    renderFintechIcon,
} from '../../components/Core/Table/CellRenderers';
import CustomCharts from '../../components/Core/CustomCharts';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/format';

type TransactionsProps = object

export const Transactions: React.FC<TransactionsProps> = () => {
    // #region HOOKS
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { getStaticFilterOptions } = useFilterOptions();
    const [, setSearchParams] = useAppUrl('');
    const [params,] = useAppUrl(null);
    const [query, setQuery] = useState<any>({
        ...(params as object)
    })

    const { data: transactionData, error, loading, retry } = useNexidusApi<ITransaction>({
        path: '/api/transactions',
        params: params as { [key in string]: string },
        enabled: true
    });
    const { globalFilters, setGlobalFilters, } = useNexidusPage<ITransaction>();

    const data: ITransaction[] = transactionData ?? [];
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
                    <View className='ml-2 w-fit'>
                        <Text className='text-left mr-2 cursor-pointer' style={{
                            color: theme.primary,
                            textDecoration: 'underline',
                            textWrap: 'nowrap',
                            textOverflow: 'ellipses',
                        }}>
                            {original.id}
                        </Text>
                    </View>
                )
            },
            {
                accessorKey: 'date',
                header: t('Date'),
                cell: ({ row: { original } }) => (
                    <View className='w-24'>
                        <Text>
                            {formatDate(original.date)}
                        </Text>
                    </View>
                )
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
                accessorKey: 'externalRef',
                header: t('External Reference'),
                options: [],
                cell: ({ row: { original } }) => original.externalRef ?? t('N/A'),
            },
            {
                accessorKey: 'paymentType',
                header: t('Payment Type'),
                options: getStaticFilterOptions('paymentType'),
                cell: renderPaymentType({ t, theme })
            },
            {
                accessorKey: 'cardNetwork',
                header: t('Network'),
                options: getStaticFilterOptions('cardNetwork'),
                cell: renderFintechIcon({ t, theme })
            },
            {
                accessorKey: 'transactionFee',
                header: t('Transaction Fee'),
                // @ts-ignore
                cell: ({ row: { original } }) => `$${original.transactionFee?.toFixed(2)}`,
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
                        {/* Table */}
                        {activeView === 'table' ? (
                            <Card>
                                <Table
                                    data={data}
                                    columns={columns}
                                    onClickRow={(row: ITransaction) => {
                                        navigate(`/transactions/${row.id}`)
                                    }}
                                />
                            </Card>
                        ) : null}

                        {/* Charts */}
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

                        {/* Custom Charts */}
                        {activeView === 'custom' ? (
                            <View className='flex flex-col w-full'>
                                <View>
                                    <CustomCharts<ITransaction>
                                        data={data}
                                    />
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
