import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text, View } from '../../components/Core'

type RefundsCardProps = object

export const RefundsCard: React.FC<RefundsCardProps> = () => {
    const { t } = useTranslation();

    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>{t('RefundsCard')}</Text>
            <View flexRow className=''>
            </View>
        </View>
    );
};

export default RefundsCard;