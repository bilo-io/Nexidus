/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

// Transactions
const Transactions = lazy(() => import('./transactions'));
const TransactionsOOB = lazy(() => import('./transactions/oob'));

// Payins
const Payins = lazy(() => import('./payins'));
const PayinsCard = lazy(() => import('./payins/card'));
const PayinsWallet = lazy(() => import('./payins/wallet'));
const PayinsRefunds = lazy(() => import('./payins/refunds'));

// Payouts
const Payouts = lazy(() => import('./payouts'));
const PayoutsReporting = lazy(() => import('./payouts/reporting'));

// Refunds
const Refunds = lazy(() => import('./refunds'));
const RefundsCard = lazy(() => import('./refunds/card'));
const RefundsWallet = lazy(() => import('./refunds/wallet'));

// Recon
const Recon = lazy(() => import('./recon'));
const ReconSettlements = lazy(() => import('./recon/settlements'));
const ReconUnallocatedFunds = lazy(() => import('./recon/unallocated-funds'));

// Other pages
const Settings = lazy(() => import('./settings'));
// const Support = lazy(() => import('./support'));
// const AccountManagement = lazy(() => import('./account'));
// const SwitchTenant = lazy(() => import('./switch-tenant'));
// const SignupInvites = lazy(() => import('./signup-invites'));
// const Logout = lazy(() => import('./logout'));

// Misc
const Currencies = lazy(() => import('./misc/currencies'));
const Charts = lazy(() => import('./misc/charts'));
const DataGrid = lazy(() => import('./misc/data-grid'));
const Trade = lazy(() => import('./misc/trade'));

// 404
const NotFound = lazy(() => import('./NotFound'));

export const routes = [
    { path: '/', element: <Dashboard /> },

    // Transactions
    { path: '/transactions', element: <Transactions /> },
    { path: '/transactions/all', element: <Transactions /> }, // Assuming this route
    { path: '/transactions/oob', element: <TransactionsOOB /> }, // Assuming this route

    // Payins
    { path: '/payins', element: <Payins /> },
    { path: '/payins/card', element: <PayinsCard /> },
    { path: '/payins/wallet', element: <PayinsWallet /> },
    { path: '/payins/refunds', element: <PayinsRefunds /> },

    // Payouts
    { path: '/payouts', element: <Payouts /> },
    { path: '/payouts/reporting', element: <PayoutsReporting /> },

    // Refunds
    { path: '/refunds', element: <Refunds /> },
    { path: '/refunds/card', element: <RefundsCard /> },
    { path: '/refunds/wallet', element: <RefundsWallet /> },

    // Recon
    { path: '/recon', element: <Recon /> },
    { path: '/recon/settlements', element: <ReconSettlements /> },
    { path: '/recon/unallocated-funds', element: <ReconUnallocatedFunds /> },

    // Misc
    { path: '/currencies', element: <Currencies /> },
    { path: '/trade', element: <Trade /> },
    { path: '/charts', element: <Charts /> },
    { path: '/data-grid', element: <DataGrid /> },

    // Settings & Account
    { path: '/settings', element: <Settings /> },
    // { path: '/support', element: <Support /> },
    // { path: '/account', element: <AccountManagement /> },
    // { path: '/switch-tenant', element: <SwitchTenant /> },
    // { path: '/signup-invites', element: <SignupInvites /> },
    // { path: '/logout', element: <Logout /> },

    // Misc
    { path: '/misc/currencies', element: <Currencies /> },
    { path: '/misc/trade', element: <Trade /> },
    { path: '/misc/settings', element: <Settings /> },
    { path: '/misc/charts', element: <Charts /> },
    { path: '/misc/data-grid', element: <DataGrid /> },

    // Catch-all route
    { path: '*', element: <NotFound /> },
];


export default routes;