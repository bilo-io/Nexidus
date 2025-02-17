import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Icon } from "../Core";
import { toSentenceCase } from "../../utils/casing";

interface AppBreadCrumbsProps {
    separator?: string;
}

export const AppBreadCrumbs: React.FC<AppBreadCrumbsProps> = ({ separator = "/" }) => {
    const location = useLocation();
    const { theme } = useTheme();

    const paths = location.pathname.split("/").filter(Boolean); // Split and remove empty strings

    return (
        <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="hover:underline" style={{
                        color: theme?.primary
                    }}>
                        <Icon name='Home' className="size-4" />
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const routeTo = "/" + paths.slice(0, index + 1).join("/");
                    const isLast = index === paths.length - 1;
                    const pathLabel = toSentenceCase(decodeURIComponent(path))

                    return (
                        <li key={routeTo} className="flex items-center">
                            <span className="mx-2">{separator}</span>
                            {isLast ? (
                                <span className="" style={{
                                    color: theme?.textLight
                                }}>{pathLabel}</span>
                            ) : (
                                    <Link to={routeTo} className="hover:underline" style={{
                                        color: theme?.primary
                                    }}>
                                    {pathLabel}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
