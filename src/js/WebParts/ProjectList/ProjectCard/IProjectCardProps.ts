import ProjectListModel from "../ProjectListModel";

interface IProjectCardProps {
    project: ProjectListModel;
    fields: { [key: string]: string };
    className?: string;
    tileWidth?: number;
    tileImageHeight?: number;
    onClickHref?: string;
    showProjectInfo?: (evt: any) => void;
    customProperties?: string[];
}

export default IProjectCardProps;
