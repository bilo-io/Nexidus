import { useState } from 'react';
import { Card, View, Text, Button } from '..';
import PieChart, { getPieData, palette } from '../Charts/recharts/PieChart';
import BarChart from '../Charts/recharts/BarChart';
import Dropdown from '../Dropdown/v2';
import { toSentenceCase } from '../../../utils/casing';
import { useTranslation } from 'react-i18next';

interface CustomChartsProps<T> {
    data: T[];
}

export const CustomCharts = <T,>({ data }: CustomChartsProps<T>) => {
    const { t } = useTranslation();
    const [barKeys, setBarKeys] = useState<(keyof T)[]>([]);
    const [pieKeys, setPieKeys] = useState<(keyof T)[]>([]);

    const removePieKey = (key: keyof T) => {
        setPieKeys((prev) => prev.filter((k) => k !== key));
    };

    const numericKeys = Object.keys(data[0] || {}).filter((key) =>
        typeof (data[0] as any)[key] === 'number'
    );
    const nonNumericKeys = Object.keys(data[0] || {}).filter((key) =>
        typeof (data[0] as any)[key] !== 'number'
    );

    return (
        <>
            <Card>
                <Text className="text-lg font-bold">Charts</Text>
                <View className="flex flex-col space-x-2 mt-2">

                    <View className='w-fit'>
                        <View>
                            <Text>{t('barchart')}</Text>
                        </View>
                        <Dropdown
                            isMulti
                            options={numericKeys.map((key) => ({ label: toSentenceCase(key), value: key }))}
                            onChange={(selected) => setBarKeys(selected.map((option: { value: keyof T; }) => option.value as keyof T))}
                            value={barKeys.map((key) => ({ label: toSentenceCase(key as string), value: key }))}
                            placeholder="Select Bar Chart Keys"
                        />
                    </View>

                    <View className='w-fit'>
                        <View>
                            <Text>{t('piechart')}</Text>
                        </View>
                        <Dropdown
                            isMulti
                            options={nonNumericKeys.map((key) => ({ label: toSentenceCase(key), value: key }))}
                            onChange={(selected) => setPieKeys(selected.map((option: { value: keyof T; }) => option.value as keyof T))}
                            value={pieKeys.map((key) => ({ label: toSentenceCase(key as string), value: key }))}
                            placeholder="Select Pie Chart Keys"
                        />
                    </View>
                </View>
            </Card>

            {
                barKeys?.length > 0 ? (
                    <Card className="mt-4">
                        <BarChart
                            data={data.map((item) => ({
                                name: (item as any)?.date,
                                x: (item as any)?.date,
                                ...item,
                            }))}
                            bars={barKeys.map((key) => ({ key: key as string, color: '#ff0000' }))}
                            xAxisKey="date"
                        />
                    </Card>
                ) : null
            }

            <View className="flex flex-row flex-wrap gap-0 mt-4">
                {pieKeys.map((key, index) => (
                    <View key={index} className="w-1/4 p-2">
                        <Card>
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-lg font-bold">{key.toString()} (Pie)</Text>
                                <Button onClick={() => removePieKey(key)}>Remove</Button>
                            </View>
                            <PieChart
                                data={getPieData(data as any[], key as string)}
                                colors={palette}
                            />
                        </Card>
                    </View>
                ))}
            </View>
        </>
    );
};

export default CustomCharts;
