import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNexidusPage } from '../../hooks/useNexidusPage';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { GlobalFilters } from '../../components/App/GlobalFilters';
import { ContentFilters, DataViewType } from '../../components/App/ContentFilters/ContentFilters';
import { ISelectOption, Modal, Text, View } from '../../components/Core'
import { Async } from '../../components/Core/Async';
import { Table } from '../../components/Core/Table';
import { IRate } from '../../models/rate';
import { ColumnDef } from '@tanstack/react-table';
import { downloadCSV } from '../../utils/download';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { getStats } from '../../utils/stats';
import { useAppUrl } from '../../hooks/useAppUrl';
import { getFilterOptionsArray, useFilterOptions } from '../../hooks/useFilterOptions';

import StatsView from '../../components/Core/StatsView';
import ChartsView from '../../components/Core/ChartsView';
import { copyToClipboard } from '../../utils/clipboard';
import {
    renderTransactionStatus
} from '../../components/Core/Table/CellRenderers';
import CustomCharts from '../../components/Core/CustomCharts';
import { formatCurrency } from '../../utils/format';

type RatesProps = object

export const Rates: React.FC<RatesProps> = () => {
    // #region HOOKS
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { getStaticFilterOptions } = useFilterOptions();
    const [, setSearchParams] = useAppUrl('');
    const [params,] = useAppUrl(null);
    const [query, setQuery] = useState<any>({
        ...(params as object)
    })

    const { globalFilters, setGlobalFilters, } = useNexidusPage<IRate>();
    const { data, meta, error, loading, retry } = useNexidusApi<IRate>({
        path: '/api/rates',
        params: params as { [key in string]: string }
    });

    console.log(data, meta)
    // #endregion

    const stats = getStats<IRate>(data, 'id')
    const [activeView, setActiveView] = useState<DataViewType>('table');
    const [showModal, setShowModal] = useState<boolean>(false);

    // #region TABLE
    const columns: (ColumnDef<IRate> & {
        options?: ISelectOption[],
        accessorKey: keyof IRate
    })[] = [
            {
                accessorKey: 'id',
                header: t('Rate ID'),
                cell: ({ row: { original } }) => (
                    <View className='mx-auto w-fit'>
                        <Text># {original.id}</Text>
                    </View>
                )
            },
            {
                accessorKey: 'id',
                header: t('id'),
            },
            {
                accessorKey: 'name',
                header: t('name'),
                cell: ({ row: { original } }) => (
                    <View className='p-4'>{original.name}</View>
                ),
            },
            {
                accessorKey: 'priceUsd',
                header: t('priceUsd'),
                cell: ({ row: { original } }) => original.priceUsd,
            },
            {
                accessorKey: 'priceBtc',
                header: t('priceBtc'),
                cell: ({ row: { original } }) => original.priceBtc,
            },
            {
                accessorKey: 'change24h',
                header: t('change24h'),
                cell: ({ row: { original } }) => `${formatCurrency(original.change24h, 'USD')}`,
            },
            {
                accessorKey: 'change7d',
                header: t('change7d'),
                cell: ({ row: { original } }) => `${formatCurrency(original.change7d, 'USD')}`,
            },
            {
                accessorKey: 'change30d',
                header: t('change30d'),
                cell: ({ row: { original } }) => `${formatCurrency(original.change30d, 'USD')}`,
            },
            {
                accessorKey: 'volume24h',
                header: t('volume24h'),
                cell: ({ row: { original } }) => `${formatCurrency(original.volume24h, 'USD')}`,
            },
            {
                accessorKey: 'marketCap',
                header: t('marketCap'),
                cell: ({ row: { original } }) => `${formatCurrency(original.marketCap, 'USD')}`,
            },
            {
                accessorKey: 'code',
                header: t('Status'),
                options: getStaticFilterOptions('status'),
                cell: renderTransactionStatus({ t, theme })
            },
        ];
    //#endregion

    const filterOptions = getFilterOptionsArray<IRate>(data, columns)

    const handleFilterChange = (key: keyof IRate, item: ISelectOption) => {
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
                title={t('Rates')}
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

                <ContentFilters<IRate>
                    value={query}
                    options={filterOptions}
                    onChange={handleFilterChange}
                    onReload={retry}
                    onDownload={() => downloadCSV(data, `Rates_${new Date().toISOString()}.csv`)}
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
                                    onClickRow={(row) => console.log(row)}
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

                        {activeView === 'custom' ? (
                            <View className='flex flex-col w-full'>
                                <View>
                                    <CustomCharts<IRate>
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

export default Rates;