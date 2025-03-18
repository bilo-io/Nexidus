import React from 'react'; import { KeyValueView } from '../../components/Core/KeyValueView/KeyValueView';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import AppTopBar from '../../components/App/TopBar';
import { Async, View } from '../../components/Core';
import { useNexidusApi } from '../../hooks/useNexidusApi';
import { ICard, IPayer, ITransaction } from '../../../../../api/gateway/src/models/finance';

interface TransactionDetailsProps {

}

export const TransactionDetails: React.FC<TransactionDetailsProps> = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: transactionData,
        error: transactionError,
        loading: transactionLoading,
        retry: transactionsRetry
    } = useNexidusApi<ITransaction>({
        path: `/api/transactions/${id}`,
    });

    // @ts-ignore
    const { cardId, payerId } = (transactionData as ITransaction) || {};

    const {
        data: cardData,
        error: cardError,
        loading: cardLoading,
        retry: cardRetry
    } = useNexidusApi<ICard>({
        path: `/api/cards/${id}`,
    });

    const {
        data: payerData,
        error: payerError,
        loading: payerLoading,
        retry: payerRetry
    } = useNexidusApi<IPayer>({
        path: `/api/payers/${id}`,
    });

    // console.log({ cardId, payerId })

    return (
        <View isPage>
            <AppTopBar />

            <View className='pb-20' />

            <View isPageContent className='flex flex-row gap-12'>
                <View className='w-2/3'>
                    <Async loading={transactionLoading} error={transactionError} onRetry={transactionsRetry}>
                        <KeyValueView
                            data={transactionData as ITransaction}
                            heading='Transaction Details'
                            viewType={'table'}
                        />
                    </Async>
                </View>

                <View className='flex flex-col w-1/3 gap-12'>
                    <Async loading={cardLoading} error={cardError} onRetry={cardRetry}>
                        <KeyValueView
                            data={cardData as unknown as ICard}
                            heading='Card Details'
                            viewType={'table'}
                        />
                    </Async>
                    <Async loading={payerLoading} error={payerError} onRetry={payerRetry}>
                        <KeyValueView
                            data={payerData as IPayer}
                            heading='Payer Details'
                            viewType={'table'}
                        />
                    </Async>
                </View>
            </View>
        </View>
    )
}

export default TransactionDetails;
