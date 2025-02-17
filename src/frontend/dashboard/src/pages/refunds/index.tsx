import React from 'react';
import { View } from '../../components/Core';
import AppTopBar from '../../components/App/TopBar';
import { useTranslation } from 'react-i18next';
// import Charts from '../misc/charts';
// import BarChart from '../../components/Core/Charts/react-chartjs-2/BarChart';

type RefundsProps = object

export const Refunds: React.FC<RefundsProps> = () => {
    const { t } = useTranslation();

    return (
        <View>
            <AppTopBar title={t('refunds')} />
        </View>
    );
};

export default Refunds;
