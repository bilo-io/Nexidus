import React from "react";
import MastercardIcon from "../../../assets/icons/Mastercard.svg";
import VisaIcon from "../../../assets/icons/Visa.svg";
import AmericanExpressIcon from "../../..//assets/icons/AmericanExpress.svg";
import DiscoverIcon from "../../../assets/icons/Discover.svg";
import ApplePayIcon from "../../../assets/icons/ApplePay.svg";
import GooglePayIcon from "../../../assets/icons/GooglePay.svg";
import BankCardIcon from "../../../assets/icons/BankCard.svg";
import BankTransferIcon from '../../../assets/icons/BankTransfer.svg';
import WalletIcon from "../../../assets/icons/Wallet.svg";
import CryptoIcon from "../../../assets/icons/Crypto.svg";

export type FintechType =
    | "Mastercard"
    | "Visa"
    | "AmericanExpress"
    | "Discover"
    | "ApplePay"
    | "GooglePay"
    | "Card"
    | "EFT"
    | "Wallet"
    | "Crypto"
    

interface CardIconProps {
    name: FintechType;
    size?: string; // Tailwind class for width & height
    className?: string; // Additional class names
}

export const icons = {
    Mastercard: MastercardIcon,
    Visa: VisaIcon,
    AmericanExpress: AmericanExpressIcon,
    Discover: DiscoverIcon,
    ApplePay: ApplePayIcon,
    GooglePay: GooglePayIcon,
    Card: BankCardIcon,
    Wallet: WalletIcon,
    Crypto: CryptoIcon,
    EFT: BankTransferIcon
};

export const FintechIcon: React.FC<CardIconProps> = ({
    name,
    size = "h-10",
    className = ""
}) => {
    const Icon = icons[name];

    if (!Icon) return null;

    return <img src={Icon} alt={`${name} icon`} className={`${size} ${className}`} />;
};

export default FintechIcon;
