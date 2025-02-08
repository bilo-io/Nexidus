import React, { useEffect, useRef } from 'react';
import './Modal.css';


import { useTheme } from '../../../context/ThemeContext';
import Icon from '../Icon';

export interface ModalProps {
    isOpen: boolean;
    onClose?: Function;
    children: any;
    isCloseButtonInverted?: boolean
}

export const modalStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minHeight: '16rem',
    width: '24rem',
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    isCloseButtonInverted,
}) => {
    const modalRef = useRef<any>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (isOpen) {
            modalRef?.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className={'modal'} style={{
            backgroundColor: theme?.background,
            color: theme?.text,
        }}>
            {children}
            <button className={'close-button px-2 pt-0 rounded-full'} onClick={() => onClose?.()}>
                <Icon
                    name="XMark"
                    className='-mt-2 size-6'
                    color={isCloseButtonInverted ? '#FFF' : theme?.text}
                />
            </button>
        </dialog>
    );
};

export default Modal;