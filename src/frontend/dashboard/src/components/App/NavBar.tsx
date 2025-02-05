import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import logoSvg from '../../assets/portfolio-case.svg';
import { useTranslation } from 'react-i18next';
import Icon from '../Core/Icon';
import { useHover } from '../../hooks/useHover';

interface INavLink {
    name: string;
    path?: string;
    icon?: string;
    children?: INavLink[];
    action?: () => void; // Added to support bottom items with actions
}

export const AppNavBar: React.FC = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { isHovered, onHoverStart, onHoverEnd } = useHover();
    const [isLocked, setIsLocked] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);
    const isOpen = isHovered || isLocked;

    const hoverStyle = 'hover:bg-black bg-opacity-';

    const links: INavLink[] = [
        {
            name: t('transactions'),
            icon: 'ListBullet',
            children: [
                { name: t('All'), path: '/transactions' },
                { name: t('OOB'), path: '/transactions/oob' },
            ],
        },
        {
            name: t('payins'),
            icon: 'ArrowLeftEndOnRectangle',
            children: [
                { name: t('All'), path: '/payins' },
                { name: t('Card'), path: '/payins/card' },
                { name: t('Wallet'), path: '/payins/wallet' },
                { name: t('Refunds'), path: '/payins/refunds' },
            ],
        },
        {
            name: t('payouts'),
            icon: 'ArrowRightEndOnRectangle',
            children: [
                { name: t('All'), path: '/payouts' },
                { name: t('Reporting'), path: '/payouts/reporting' },
            ],
        },
        {
            name: t('refunds'),
            icon: 'ArrowPath',
            children: [
                { name: t('All'), path: '/refunds' },
                { name: t('Card'), path: '/refunds/card' },
                { name: t('Wallet'), path: '/refunds/wallet' },
            ],
        },
        {
            name: t('recon'),
            icon: 'ClipboardDocumentCheck',
            children: [
                { name: t('Reconciliation'), path: '/recon' },
                { name: t('Settlements'), path: '/recon/settlements' },
                { name: t('Unallocated Funds'), path: '/recon/unallocated-funds' },
            ],
        },
    ];

    const bottomItems: INavLink[] = [
        {
            icon: isLocked ? 'LockOpen' : 'LockClosed',
            name: isOpen ? (isLocked ? 'Unlock sidebar' : 'Lock sidebar') : '',
            action: () => setIsLocked((prev) => !prev),
        },
        {
            icon: 'Cog',
            name: 'Settings',
            action: () => navigate('/settings'),
        },
        // {
        //     icon: 'QuestionMarkCircle',
        //     name: 'Support',
        //     action: () => navigate('/support'),
        // },
        // {
        //     icon: 'User',
        //     name: 'Account Management',
        //     action: () => navigate('/account'),
        // },
        {
            icon: 'QueueList',
            name: 'Switch Tenant',
            action: () => navigate('/switch-tenant'),
        },
        {
            icon: 'UserPlus',
            name: 'Signup Invites',
            action: () => navigate('/signup-invites'),
        },
        {
            icon: 'Power',
            name: 'Log Out',
            action: () => navigate('/logout'),
        },
    ];

    const handleNavClick = (item: INavLink) => {
        if (item.children) {
            setExpanded(expanded === item.name ? null : item.name);
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div
            className={`${isOpen ? 'w-80' : 'w-16'} hover:w-80 transition-all duration-200 ease-in-out flex flex-col items-start`}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            style={{
                height: '100vh',
                backgroundColor: theme.primary,
                boxShadow: "3px 5px 18px #0000005A",
            }}
        >
            {/* Header */}
            <div className={`flex flex-row items-center w-full mb-12 ${hoverStyle}`} onClick={() => navigate('/')} style={{ color: '#FFF' }}>
                {/* <img src={logoSvg} width="24" className="m-4 cursor-pointer" alt="Logo" /> */}
                <Icon name={'SquaresPlus'} className='size-6 m-4' />
                {isOpen ? t('dashboard') : ''}
            </div>

            <div className='flex flex-col justify-between items-start h-full w-full'>
                {/* Main Content */}
                <div className="flex flex-col justify-between items-start w-full">
                    {links.map((item) => (
                        <div key={item.name} className="w-full">
                            <div
                                onClick={() => handleNavClick(item)}
                                className={`flex flex-row items-center w-full cursor-pointer ${hoverStyle}`}
                                style={{ color: '#FFF' }}
                            >
                                <Icon name={item.icon as string} className='size-6 m-4' />
                                {isOpen ? item.name : ''}
                            </div>
                            {item.children && (
                                <div
                                    className={`ml-8 flex flex-col transition-all duration-300 ease-in-out ${isOpen && expanded === item.name ? 'h-auto opacity-100' : 'h-0 opacity-20 overflow-hidden'
                                        }`}
                                >
                                    {item.children.map((child) => (
                                        <div
                                            key={child.path}
                                            onClick={() => navigate(child.path!)}
                                            className={`flex flex-row items-center w-11/12 rounded-lg cursor-pointer ${hoverStyle} mr-2`}
                                            style={{ color: '#FFF' }}
                                        >
                                            <Icon name="StopCircle" className='ml-4 size-4' />
                                            <div className='m-2 ml-4'>{child.name}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {/* Footer */}
                <div className="flex flex-col justify-start items-center w-full">
                    {bottomItems.map((item) => (
                        <NavItem
                            key={item.name}
                            onClick={item.action}
                            item={{
                                name: item.name,
                                action: item.action
                            }}
                        >
                            <Icon name={item.icon as string} className='size-6 m-4' />
                            {isOpen ? item.name : ''}
                        </NavItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

const NavItem = ({
    item,
    children,
    onClick,
}: {
    children: React.ReactElement | React.ReactElement[] | undefined | any[],
    onClick?: () => void,
    item: {
        name: string,
        action?: () => void,
    }
    }) => {
    const { isHovered, onHoverStart, onHoverEnd } = useHover();
    const { theme } = useTheme();

    return (
        <div
            key={item.name}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            className={`flex flex-row items-center w-full cursor-pointer`}
            onClick={item.action}
            style={{
                color: '#FFF',
                backgroundColor: isHovered ?  theme?.warning : 'transparent'
            }}
        >
            {children}
        </div>
    )
}

export default AppNavBar;
