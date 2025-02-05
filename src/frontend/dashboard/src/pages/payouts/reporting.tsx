import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type PayoutsReportingProps = object

export const PayoutsReporting: React.FC<PayoutsReportingProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('PayoutsReporting')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default PayoutsReporting;