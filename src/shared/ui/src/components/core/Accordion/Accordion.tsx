import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui";

export interface NxAccordionItem {
    value: string;
    title: string;
    content: React.ReactNode;
}

// Define separate types for 'single' and 'multiple' accordions
interface SingleAccordionProps {
    type?: "single";
    defaultValue?: string; // Single accordion expects a string
}

interface MultipleAccordionProps {
    type: "multiple";
    defaultValue?: string[]; // Multiple accordion expects an array
}

export type NxAccordionProps = {
    items: NxAccordionItem[];
    collapsible?: boolean;
} & (SingleAccordionProps | MultipleAccordionProps);

export const NxAccordion: React.FC<NxAccordionProps> = ({
    items,
    type = "single",
    collapsible = false,
    defaultValue
}) => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Accordion
            type={type}
            collapsible={collapsible}
            defaultValue={defaultValue} // This now has correct typing
        >
            {items?.map(({ value, title, content }) => (
                <AccordionItem key={value} value={value}>
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent>{content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default NxAccordion;
