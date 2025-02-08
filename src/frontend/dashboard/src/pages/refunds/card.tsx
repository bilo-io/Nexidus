import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters, DataViewType } from '../../components/App/ContentFilters/ContentFilters';
import { Modal, Text, View } from '../../components/Core'
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
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type RefundsCardProps = object

export const RefundsCard: React.FC<RefundsCardProps> = () => {
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
                title={t('RefundsCard')}
                hasBreadcrumbs
            />


            <View isPadded className='mt-12'>

                <GlobalFilters value={globalFilters} />

                <ContentFilters<ITransaction>
                    value={contentFilters}
                    options={filterOptions}
                    onChange={handleFilterChange}
                    onReload={retry}
                    onDownload={() => downloadCSV(mockData, `RefundsCard_${new Date().toISOString()}.csv`)}
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
                            <View className='flex flex-col'>
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

                                <View className='flex flex-row'>
                                    <Card className='w-full md:w-1/2 m-2'>
                                        <View>
                                            <Text className='text-lg font-bold'>Bank</Text>
                                        </View>
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

export default RefundsCard;
