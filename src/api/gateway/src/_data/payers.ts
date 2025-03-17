import { IPayer } from 'models/finance';

import { v4 as uuidv4 } from 'uuid';

export const payers: IPayer[] = [
    {
        id: uuidv4(),
        fullName: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1234567890"
    },
    {
        id: uuidv4(),
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        mobile: "+1987654321"
    },
    {
        id: uuidv4(),
        fullName: "Bob Johnson",
        email: "bob.johnson@example.com",
        mobile: "+1122334455"
    },
    {
        id: uuidv4(),
        fullName: "Alice Williams",
        email: "alice.williams@example.com",
        mobile: "+1444555666"
    },
    {
        id: uuidv4(),
        fullName: "Eve Brown",
        email: "evebrown@gmail.com",
        mobile: "+1777888999"
    },
    {
        id: uuidv4(),
        fullName: "Charlie Green",
        email: "charlie.green@gmail.com",
        mobile: "+1666777888"
    },
    {
        id: uuidv4(),
        fullName: "David White",
        email: "david.white@gmail.com",
        mobile: "+1999888777"
    },
    {
        id: uuidv4(),
        fullName: "Frank Black",
        email: "frank.black@gmail.com",
        mobile: "+1996788767"
    },
    {
        id: uuidv4(),
        fullName: "Grace Grey",
        email: "grace.grey@hotmail.com",
        mobile: "+1999988766"
    }
];