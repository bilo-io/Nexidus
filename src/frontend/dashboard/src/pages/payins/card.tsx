import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type PayinsCardProps = object

export const PayinsCard: React.FC<PayinsCardProps> = () => {


    return (
        <View>
            <AppTopBar title={'PayinsCard'} />
        </View>
    );
};

export default PayinsCard;
