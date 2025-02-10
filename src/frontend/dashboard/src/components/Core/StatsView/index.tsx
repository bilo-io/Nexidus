import React from 'react';
import { Card, View, Text, Icon, BoxWhiskerPlot } from '../';
import { formatCurrency } from '../../../utils/format';
import { useTheme } from '../../../context/ThemeContext';
import { IFiatCurrency } from '../../App/GlobalFilters';
import { useTranslation } from 'react-i18next';

interface StatsViewProps {
    stats: any;
    currency: IFiatCurrency
}

export const StatsView: React.FC<StatsViewProps> = ({
    stats,
    currency
}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <Card className='flex flex-row w-full'>
            <View flex flexCol className='w-full'>
                <View flex flexRow className='mb-4 gap-4 w-full'>
                    <View className='w-full md:w-1/3'>
                        <Card className='w-full h-full'>
                            <Text className='text-3xl'>
                                <Text className='font-bold mr-2'>{t('Total')}</Text>
                                <br />
                                <br />
                                {stats.total?.toString()}
                            </Text>
                        </Card>
                    </View>

                    <View className='w-full md:w-1/3'>
                        <Card className='w-full h-full'>
                            <View flex flexRow className='my-6'>
                                <Icon name='ChevronDoubleUp' className='mr-2 size-8' color={theme.success} />
                                <Text className='text-xl'><strong>Max</strong>: {formatCurrency(stats.max, currency)}</Text>
                            </View>
                            <View flex flexRow>
                                <Icon name='ChevronDoubleDown' className='mr-2 size-8' color={theme.error} />
                                <Text className='text-xl'><strong>Min</strong>: {formatCurrency(stats.min, currency)}</Text>
                            </View>
                        </Card>
                    </View>

                    <View className='w-full md:w-1/3'>
                        <Card className='w-full h-full'>
                            <View flex flexRow className='mb-2 justify-between'>
                                <Text><strong>Average</strong>:</Text>
                                <Text>{formatCurrency(stats.avg, currency)}</Text>
                            </View>

                            <View flex flexRow className='my-2 justify-between'>
                                <Text><strong>Median</strong>:</Text>
                                <Text>{formatCurrency(stats.median, currency)}</Text>
                            </View>

                            <View flex flexRow className='my-2 justify-between'>
                                <Text><strong>Std. Deviation</strong>:</Text>
                                <Text>{formatCurrency(stats.min, currency)}</Text>
                            </View>

                            <View flex flexRow className='mt-2 justify-between'>
                                <Text><strong>Variance</strong>:</Text>
                                <Text>{formatCurrency(stats.sampleVariance, currency)}</Text>
                            </View>
                        </Card>
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
    );
};

export default StatsView;