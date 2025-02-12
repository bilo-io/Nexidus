import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Icon from '../Core/Icon';
import { useHover } from '../../hooks/useHover';
import nexidusIcon from '../../assets/nexidus.svg'

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

    const links: INavLink[] = [
        {
            name: t('dashboard'),
            icon: 'SquaresPlus',
            path: '/',
        },
        {
            name: t('transactions'),
            icon: 'ListBullet',
            path: '/transactions',
            children: [
                { name: t('All'), path: '/transactions' },
                { name: t('OOB'), path: '/transactions/oob' },
            ],
        },
        {
            name: t('payins'),
            icon: 'ArrowLeftEndOnRectangle',
            path: '/payins',
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
            path: '/payouts',
            children: [
                { name: t('All'), path: '/payouts' },
                { name: t('Reporting'), path: '/payouts/reporting' },
            ],
        },
        {
            name: t('refunds'),
            icon: 'ArrowPath',
            path: '/refunds',
            children: [
                { name: t('All'), path: '/refunds' },
                { name: t('Card'), path: '/refunds/card' },
                { name: t('Wallet'), path: '/refunds/wallet' },
            ],
        },
        {
            name: t('recon'),
            icon: 'ClipboardDocumentCheck',
            path: '/recon',
            children: [
                { name: t('Reconciliation'), path: '/recon' },
                { name: t('Settlements'), path: '/recon/settlements' },
                { name: t('Unallocated Funds'), path: '/recon/unallocated-funds' },
            ],
        },
        {
            name: t('rates'),
            icon: 'CurrencyDollar',
            path: '/rates'
        }
    ];

    const bottomItems: INavLink[] = [
        {
            icon: isLocked ? 'LockOpen' : 'LockClosed',
            name: isOpen ? (isLocked ? 'Unlock sidebar' : 'Lock sidebar') : '',
            action: () => setIsLocked((prev) => !prev),
        },
        {
            icon: 'Cog',
            name: t('settings'),
            action: () => navigate('/settings'),
        },
        {
            icon: 'QuestionMarkCircle',
            name: t('support'),
            action: () => navigate('/support'),
        },
        {
            icon: 'User',
            name: t('accountManagement'),
            action: () => navigate('/account'),
        },
        {
            icon: 'QueueList',
            name: t('switchTenant'),
            action: () => navigate('/switch-tenant'),
        },
        {
            icon: 'UserPlus',
            name: t('SignupInvites'),
            action: () => navigate('/signup-invites'),
        },
        {
            icon: 'Power',
            name: t('LogOut'),
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
            }}
        >
            {/* Header */}
            <div className={`flex flex-row items-center w-full mb-12`} onClick={() => navigate('/')} style={{ color: '#FFF' }}>
                <img src={nexidusIcon} className='size-8 mx-4 my-2' />
                {isOpen ? <div className='grow font-bold'>Nexidus</div> : null}
            </div>

            <div className='flex flex-col justify-between items-start h-full w-full'>
                {/* Main Content */}
                <div className="flex flex-col justify-between items-start w-full z-10">
                    {links.map((item) => (
                        <div key={item.name} className="w-full">
                            <NavItem
                                onClick={() => {
                                    handleNavClick(item)
                                    item?.path && navigate(item.path)
                                }}
                                item={{
                                    name: item.name,
                                    action: item.action,
                                }}
                            >
                                <Icon name={item.icon as string} className='size-6 m-4' />
                                {isOpen ? item.name : ''}
                            </NavItem>

                            {item.children && (
                                <div
                                    className={`pl-8 flex flex-col transition-all duration-300 ease-in-out ${isOpen && expanded === item.name ? 'h-auto opacity-100' : 'h-0 opacity-20 overflow-hidden'
                                        }`}
                                >
                                    {item.children.map((child) => (
                                        <NavItem
                                            key={child.path}
                                            onClick={() => navigate(child.path!)}
                                            isRoundedLeft
                                            item={{
                                                name: child.name,
                                                action: child.action
                                                    ? child.action
                                                    : () => navigate(child.path as string)
                                            }}
                                        >
                                            <Icon name={child.icon ?? 'StopCircle' as string} className={child?.icon ? 'size-6 m-4' : 'size-4 ml-4'} />
                                            <div className='m-2 ml-4'>{child.name}</div>
                                        </NavItem>
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
                            <Icon name={item.icon ?? 'StopCircle' as string} className={item?.icon ? 'size-6 m-4' : 'size-4 ml-4'} />
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
    isRoundedLeft,
}: {
    children: React.ReactElement | React.ReactElement[] | undefined | any[],
    onClick?: () => void,
    item: {
        name: string,
        action?: () => void,
    },
    isRoundedLeft?: boolean,
}) => {
    const { isHovered, onHoverStart, onHoverEnd } = useHover();
    const { theme } = useTheme();

    return (
        <div
            key={item.name}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            className={`flex flex-row items-center w-full cursor-pointer z-10 ${isRoundedLeft ? 'rounded-l-full' : ''}`}
            onClick={item.action || onClick}
            style={{
                color: isHovered ? theme?.primary : '#FFF',
                backgroundColor: isHovered ? theme?.background : 'transparent',
                // boxShadow: isHovered ? '3px 5px 18px #0000005A' : undefined
            }}
        >
            {children}
        </div>
    )
}

export default AppNavBar;
