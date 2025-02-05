import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../../components/Core'

type TradeProps = object

export const Trade: React.FC<TradeProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('trade')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default Trade;