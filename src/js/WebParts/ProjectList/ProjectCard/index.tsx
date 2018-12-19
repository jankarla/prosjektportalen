import * as React from "react";
import __ from "../../../Resources";
import { DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardLocation, DocumentCardActivity, DocumentCardActions, DocumentCardType } from "office-ui-fabric-react/lib/DocumentCard";
import { ImageFit } from "office-ui-fabric-react/lib/Image";
import * as Util from "../../../Util";
import IProjectCardProps from "./IProjectCardProps";

/**
 * Project Card
 *
 * @param {IProjectCardProps} props Props
 */
const ProjectCard = (props: IProjectCardProps): JSX.Element => {
    const fallbackIconProps = { iconName: "History", styles: { root: { fontSize: 50, color: "rgb(51, 51, 51)", opacity: 0.5 } } };
    const previewImage = {
        previewImageSrc: props.project.Logo,
        previewIconProps: props.project.Logo ? null : fallbackIconProps,
        imageFit: ImageFit.contain,
        accentColor: Util.stringToColour(props.project.Phase),
        width: props.tileWidth,
        height: props.tileImageHeight,
    };
    return (
        <DocumentCard
            className={props.className}
            type={DocumentCardType.normal}
            onClickHref={props.onClickHref} >
            <DocumentCardPreview previewImages={[previewImage]} />
            <DocumentCardTitle title={props.project.Title} shouldTruncate={false} />
            <DocumentCardLocation location={props.project.Phase || __.getResource("String_NotSet")} />
            <ProjectCardProperties fields={props.fields} project={props.project} customProperties={props.customProperties} />
            <DocumentCardActions
                actions={
                    [{
                        iconProps: { iconName: "AlignCenter" },
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            props.showProjectInfo(e);
                        },
                    },
                    ]}
                views={props.project.Views}
            />
        </DocumentCard>
    );
};

const ProjectCardProperties = ({ fields, project, customProperties }: IProjectCardProps): JSX.Element => {
    customProperties = ["GtProjectPhase"];
    if (customProperties) {
        return (
            <div>
                {customProperties.map((prop, idx) => {
                    return (
                        <div key={`ProjectCardProperties_${idx}`} className="pp-projectCardCustomProperty">
                            <div className="pp-projectCardCustomProperty-inner">
                                <div>
                                    <span className="pp-projectCardCustomProperty-value">{project.getProperty(prop)}</span>
                                    <span className="pp-projectCardCustomProperty-label">{fields[prop]}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div>
                <DocumentCardActivity
                    activity={fields["GtProjectOwner"]}
                    people={[project.getOwner()]} />
                <DocumentCardActivity
                    activity={fields["GtProjectManager"]}
                    people={[project.getManager()]} />
            </div>
        );
    }
};

export default ProjectCard;
