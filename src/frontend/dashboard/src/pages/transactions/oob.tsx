import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type TransactionsOOBProps = object

export const TransactionsOOB: React.FC<TransactionsOOBProps> = () => {
    

    return (
        <View>
            <AppTopBar title={'TransactionsOOB'} />
        </View>
    );
};

export default TransactionsOOB;
