import React from 'react';
import { Card, View, Text } from '../';
import BarChart from '../Charts/recharts/BarChart';
import PieChart, { getPieData, palette } from '../Charts/recharts/PieChart';
import { useTheme } from '../../../context/ThemeContext';
import { ITransaction } from '../../../models/transaction';

interface ChartsViewProps {
    data: any[]
}

export const ChartsView: React.FC<ChartsViewProps> = ({ data }) => {
    const { theme } = useTheme();
    
    return (
        <>
            <Card>
                <BarChart
                    data={data?.map((item: ITransaction) => ({
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
                        data={getPieData(data, 'bank')}
                        colors={palette}
                        className='card'
                    />
                </Card>
                <Card className='w-full md:w-1/2 m-2'>
                    <Text className='text-lg font-bold'>Status</Text>
                    <PieChart
                        data={getPieData(data, 'status')}
                        colors={palette}
                    />
                </Card>
                <Card className='w-full md:w-1/2 m-2'>
                    <View>
                        <Text className='text-lg font-bold'>Type</Text>
                    </View>
                    <PieChart
                        data={getPieData(data, 'type')}
                        colors={palette}
                    />
                </Card>
                <Card className='w-full md:w-1/2 m-2'>
                    <View>
                        <Text className='text-lg font-bold'>PaymentType</Text>
                    </View>
                    <PieChart
                        data={getPieData(data, 'paymentType')}
                        colors={palette}
                    />
                </Card>
            </View>
        </>

    );
};

export default ChartsView;