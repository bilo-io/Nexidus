import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";

export interface NxAlertProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const NxAlert: React.FC<NxAlertProps> = ({ title, description, icon }) => {
    return (
        <Alert>
            {icon && <div className="mr-2">{icon}</div>}
            <div>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </div>
        </Alert>
    );
};

export default NxAlert;
