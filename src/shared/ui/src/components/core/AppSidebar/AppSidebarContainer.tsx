import {
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { AppSidebar, AppSidebarGroup, AppSidebarItem } from "./AppSidebar"
import { CoinsIcon, HandCoinsIcon, HandshakeIcon, LayoutDashboardIcon, ListCheckIcon, ReceiptIcon, WalletIcon } from "lucide-react"

export default function AppSidebarContainer({ children }: { children: React.ReactNode }) {
    const items: AppSidebarItem[] = [
        {
            title: "Dashboard",
            url: "",
            icon: LayoutDashboardIcon
        }
    ]

    const sidebarGroups: AppSidebarGroup[] = [
        {
            name: '-',
            items: [
                {
                    title: 'Dashboard',
                    url: '#',
                    icon: LayoutDashboardIcon
                }
            ]
        },
        {
            name: 'Features',
            items: [
                {
                    title: 'Transactions',
                    url: 'transactions',
                    icon: ReceiptIcon
                },
                {
                    title: 'Payins',
                    url: '',
                    icon: CoinsIcon
                },
                {
                    title: 'Payouts',
                    url: '',
                    icon: WalletIcon
                },
                {
                    title: 'Refunds',
                    url: '',
                    icon: HandCoinsIcon
                },
                {
                    title: 'Reconciliation',
                    url: '',
                    icon: ListCheckIcon
                },
                {
                    title: 'Settlements',
                    url: '',
                    icon: HandshakeIcon
                }
            ]
        },
        {
            name: 'Config',
            items: [

            ]
        }
    ]

    return (
        <SidebarProvider>
            <AppSidebar
                items={items}
                groups={sidebarGroups}
            />
            <main>
                <SidebarTrigger className="absolute top-4 left-4 z-10" />
                {children}
            </main>
        </SidebarProvider>
    )
}