import { ColDef } from "ag-grid-community";
import { CardPayin } from "../../../models/finance";
import StatusCellRenderer from "../../../components/Core/DataGrid/CellRenderers/StatusRenderer";

export const rowData: (CardPayin & { children: any[] })[] = [
    {
        id: '1',
        referenceNumber: 'PAY12345',
        authStatus: 'Approved',
        status: 'Completed',
        dateCreated: '2025-01-01',
        amount: 100.0,
        currency: 'USD',
        cardHolderName: 'John Doe',
        cardLastFour: '1234',
        children: []
    },
    {
        id: '2',
        referenceNumber: 'PAY12346',
        authStatus: 'Pending',
        status: 'Processing',
        dateCreated: '2025-01-02',
        amount: 250.0,
        currency: 'EUR',
        cardHolderName: 'Jane Doe',
        cardLastFour: '5678',
        children: []
    },
    {
        id: '3',
        referenceNumber: 'PAY12347',
        authStatus: 'Declined',
        status: 'Failed',
        dateCreated: '2025-01-03',
        amount: 320.0,
        currency: 'GBP',
        cardHolderName: 'Alex Green',
        cardLastFour: '9101',
        children: []
    },
    {
        id: '4',
        referenceNumber: 'PAY12348',
        authStatus: 'Approved',
        status: 'Completed',
        dateCreated: '2025-01-04',
        amount: 145.5,
        currency: 'USD',
        cardHolderName: 'Chris Blue',
        cardLastFour: '2345',
        children: []
    },
    {
        id: '5',
        referenceNumber: 'PAY12349',
        authStatus: 'Pending',
        status: 'Processing',
        dateCreated: '2025-01-05',
        amount: 500.0,
        currency: 'AUD',
        cardHolderName: 'Taylor Swift',
        cardLastFour: '6789',
        children: []
    },
    {
        id: '6',
        referenceNumber: 'PAY12350',
        authStatus: 'Approved',
        status: 'Completed',
        dateCreated: '2025-01-06',
        amount: 290.0,
        currency: 'CAD',
        cardHolderName: 'Morgan Red',
        cardLastFour: '3456',
        children: []
    },
    {
        id: '7',
        referenceNumber: 'PAY12351',
        authStatus: 'Declined',
        status: 'Failed',
        dateCreated: '2025-01-07',
        amount: 450.0,
        currency: 'JPY',
        cardHolderName: 'Jordan Yellow',
        cardLastFour: '7890',
        children: []
    },
    {
        id: '8',
        referenceNumber: 'PAY12352',
        authStatus: 'Approved',
        status: 'Completed',
        dateCreated: '2025-01-08',
        amount: 730.0,
        currency: 'INR',
        cardHolderName: 'Jamie White',
        cardLastFour: '5671',
        children: []
    },
    {
        id: '9',
        referenceNumber: 'PAY12353',
        authStatus: 'Pending',
        status: 'Processing',
        dateCreated: '2025-01-09',
        amount: 810.0,
        currency: 'CNY',
        cardHolderName: 'Dana Black',
        cardLastFour: '4321',
        children: []
    },
    {
        id: '10',
        referenceNumber: 'PAY12354',
        authStatus: 'Approved',
        status: 'Completed',
        dateCreated: '2025-01-10',
        amount: 600.0,
        currency: 'USD',
        cardHolderName: 'Casey Orange',
        cardLastFour: '1111',
        children: []
    }
];




export const colDefs: ColDef<CardPayin, any>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
    },
    {
        field: "referenceNumber",
        headerName: "Reference Number",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        cellRenderer: StatusCellRenderer, // Use the React component here
    },
    {
        field: "authStatus",
        headerName: "Auth Status",
        width: 150,
        cellRenderer: StatusCellRenderer, // Use the React component here
    },
    {
        field: "currency",
        headerName: "Currency",
        width: 100,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 120,
        valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
        field: "dateCreated",
        headerName: "Date Created",
        width: 150,
    },
];