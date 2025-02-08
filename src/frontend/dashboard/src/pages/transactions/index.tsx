import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters, DataViewType } from '../../components/App/ContentFilters/ContentFilters';
import { BoxWhiskerPlot, Modal, Text, View } from '../../components/Core'
import { Async } from '../../components/Core/Async';
import { Table } from '../../components/Core/Table';
import { ITransaction } from '../../models/transaction';
import { getFilterOptions } from '../../components/App/ContentFilters/filterOptions';
import { payins as mockData } from '../../data/mockData'
import { ColumnDef } from '@tanstack/react-table';
import { downloadCSV } from '../../utils/download';
import { useTheme } from '../../context/ThemeContext';
import BarChart from '../../components/Core/Charts/recharts/BarChart';
import PieChart, { getPieData, palette } from '../../components/Core/Charts/recharts/PieChart';
import { Card } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { getStats } from '../../utils/stats';
import Icon from '../../components/Core/Icon';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

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

    const [activeView, setActiveView] = useState<DataViewType>('table');
    const [showModal, setShowModal] = useState<boolean>(false);
    const filterOptions = getFilterOptions<ITransaction>(mockData[0]);

    const stats = getStats<ITransaction>(mockData, 'amount')

    console.log({ stats })

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
            <AppTopBar
                title={t('Transactions')}
                hasBreadcrumbs
            />


            <View isPadded className='mt-12'>

                <GlobalFilters value={globalFilters} />

                <ContentFilters<ITransaction>
                    value={contentFilters}
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
                                    <Card className='flex flex-row w-full'>
                                        <View flex flexCol className='w-full'>
                                            <View flex flexRow className='mb-4 gap-4 w-full'>
                                                <View className='w-full md:w-1/3'>
                                                    <Text className='text-3xl'>
                                                        <Text className='font-bold mr-2'>{t('Total')}</Text>
                                                        <br />
                                                        <br />
                                                        {stats.total?.toString()}
                                                    </Text>
                                                </View>

                                                <View className='w-full md:w-1/3'>
                                                    <View flex flexRow className='my-6'>
                                                        <Icon name='ChevronDoubleUp' className='mr-2 size-8' color={theme.success} />
                                                        <Text className='text-xl'><strong>Max</strong>: {stats.max?.toFixed(2)}</Text>
                                                    </View>
                                                    <View flex flexRow>
                                                        <Icon name='ChevronDoubleDown' className='mr-2 size-8' color={theme.error} />
                                                        <Text className='text-xl'><strong>Min</strong>: {stats.min?.toFixed(2)}</Text>
                                                    </View>
                                                </View>

                                                <View className='w-full md:w-1/3'>
                                                    <View flex flexRow className='mb-2'>
                                                        <Text><strong>Average</strong>: {stats.avg?.toFixed(2)}</Text>
                                                    </View>

                                                    <View flex flexRow className='my-2'>
                                                        <Text><strong>Median</strong>: {stats.median?.toFixed(2)}</Text>
                                                    </View>

                                                    <View flex flexRow className='my-2'>
                                                        <Text><strong>Std. Deviation</strong>: {stats.min?.toFixed(2)}</Text>
                                                    </View>

                                                    <View flex flexRow className='mt-2'>
                                                        <Text><strong>Variance</strong>: {stats.sampleVariance?.toFixed(2)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View className='w-full md:w-1/4'>

                                            <BoxWhiskerPlot
                                                stats={{
                                                    min: stats.min as number,
                                                    max: stats.max as number,
                                                    lowerQuartile: stats.lowerQuartile as number,
                                                    upperQuartile: stats.upperQuartile as number,
                                                    interquartileRange: stats.interquartileRange as number,
                                                    median: stats.median as number,
                                                    lowerWhisker: stats.lowerWhisker as number,
                                                    upperWhisker: stats.upperWhisker as number,
                                                }}
                                            />
                                        </View>
                                    </Card>
                                </View>

                                <Card>
                                    <BarChart
                                        data={mockData?.map((item: ITransaction) => ({
                                            name: item?.date,
                                            x: item?.date,
                                            y: item?.amount,
                                            ...item
                                        }))}
                                        bars={[
                                            { key: 'amount', color: theme?.primary }, // Red
                                            // { key: 'revenue', color: '#008000' }, // Green
                                        ]}
                                        xAxisKey="date"
                                    />
                                </Card>

                                <View className='flex flex-row mt-2 -mx-2'>
                                    <Card className='w-full md:w-1/2 m-2'>
                                        <Text className='text-lg font-bold'>Bank</Text>
                                        <PieChart
                                            data={getPieData(mockData, 'bank')}
                                            colors={palette}
                                            className='card'
                                        />
                                    </Card>
                                    <Card className='w-full md:w-1/2 m-2'>
                                        <Text className='text-lg font-bold'>Status</Text>
                                        <PieChart
                                            data={getPieData(mockData, 'status')}
                                            colors={palette}
                                        />
                                    </Card>
                                    <Card className='w-full md:w-1/2 m-2'>
                                        <View>
                                            <Text className='text-lg font-bold'>Type</Text>
                                        </View>
                                        <PieChart
                                            data={getPieData(mockData, 'type')}
                                            colors={palette}
                                        />
                                    </Card>
                                    <Card className='w-full md:w-1/2 m-2'>
                                        <View>
                                            <Text className='text-lg font-bold'>PaymentType</Text>
                                        </View>
                                        <PieChart
                                            data={getPieData(mockData, 'paymentType')}
                                            colors={palette}
                                        />
                                    </Card>
                                </View>
                            </View>
                        ) : null}

                        {/* <Charts /> */}
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
