import React from 'react';
import { Text, View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type ReconSettlementsProps = object

export const ReconSettlements: React.FC<ReconSettlementsProps> = () => {


    return (
        <View>
            <AppTopBar title={'settlements'} />
        </View>
    );
};

export default ReconSettlements;
