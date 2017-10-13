import { PermissionKind } from "sp-pnp-js";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";

export default interface IModalLinkProps extends React.HTMLAttributes<HTMLElement> {
    label?: string;
    showLabel?: boolean;
    url: string;
    options?: IModalLinkOptions;
    onDialogReturnValueCallback?: (result) => void;
    reloadOnSubmit?: boolean;
    reloadOnCancel?: boolean;
    width?: number;
    height?: number;
    icon?: IModalLinkIconProps;
    id?: string;
    permissionKind?: PermissionKind;
}

export const ModalLinkDefaultProps: Partial<IModalLinkProps> = {
    showLabel: true,
    reloadOnSubmit: false,
    reloadOnCancel: false,
    className: "",
};

