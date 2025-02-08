import React from 'react';

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    isPage?: boolean;
    isPageContent?: boolean;
    isPadded?: boolean;
    flex?: boolean;
    flexRow?: boolean;
    flexCol?: boolean;
    flexWrap?: 'wrap' | 'wrap-reverse';
    justify?: 'between' | 'around' | 'start' | 'center' | 'end' | null;
    items?: 'start' | 'end' | 'center' | null;
    wFull?: boolean;
}

// Use forwardRef to allow refs to be passed to the component
export const View = React.forwardRef<HTMLDivElement, ViewProps>(({
    children,
    className,
    style,
    isPage,
    isPageContent,
    isPadded,
    flex,
    flexRow,
    flexCol,
    flexWrap,
    justify,
    wFull,
    items: alignItems,
    ...props
}, ref) => {

    return (
        <div
            ref={ref} // Attach the ref to the div
            style={style}
            className={
                `${isPage ? `h-[100vh] overflow-y-auto` : ''}
                ${isPadded ? 'p-4' : ''}
                ${isPageContent ? `page-content` : ''}
                ${flex ? 'flex' : ''}
                ${flexRow ? 'flex flex-row' : ''}
                ${flexCol ? 'flex flex-col' : ''}
                ${flexWrap ? `flex-${flexWrap}` : ''}
                ${justify ? `justify-${justify}` : ''}
                ${alignItems ? `items-${alignItems}` : ''}
                ${wFull ? 'w-full' : ''}
                ${className || ''}`.trim()
            }
            {...props} // Spread other props like onClick, etc.
        >
            {children}
        </div>
    );
});

// Optional: Give the component a display name for better debugging
View.displayName = 'View';

export default View;
