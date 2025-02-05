import React from 'react';
import { View, Text } from '../components/Core';

type NotFoundProps = object

export const NotFound: React.FC<NotFoundProps> = () => {
    return (
        <View isPage className='w-full'>
            <Text className='text-xl font-semibold'>
                NotFound
            </Text>
        </View>
    );
};

export default NotFound;