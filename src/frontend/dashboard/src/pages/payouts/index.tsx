import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type PayoutsProps = object

export const Payouts: React.FC<PayoutsProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('Payouts')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default Payouts;