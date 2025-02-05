import React from 'react';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui"

interface NxResizableProps {
    sections?: unknown
}

const NxResizable: React.FC<NxResizableProps> = () => {
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>One</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>Two</ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default NxResizable;