import React from 'react';
import { Text, View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type UnallocatedFundsProps = object

export const UnallocatedFunds: React.FC<UnallocatedFundsProps> = () => {


    return (
        <View>
            <AppTopBar title={'unallocatedFunds'} />
        </View>
    );
};

export default UnallocatedFunds;
