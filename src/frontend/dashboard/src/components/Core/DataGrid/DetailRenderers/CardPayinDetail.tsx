import { CardPayin } from "../../../../models/finance";

export const CardPayinDetail: React.FC<{ data: CardPayin }> = ({ data }) => {
    return (
        <div style={{ padding: '10px' }}>
            <h3>Details for {data.referenceNumber}</h3>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Amount:</strong> {data.amount} {data.currency}</p>
            <p><strong>Date Created:</strong> {data.dateCreated}</p>
            <p><strong>Auth Status:</strong> {data.authStatus}</p>
            <p><strong>Card Holder:</strong> {data.cardHolderName}</p>
        </div>
    );
};
