export default  interface IToggleSectionProps extends React.HTMLAttributes<HTMLElement> {
    headerClassName?: string;
    options: any[];
    optLabelProp: string;
    optDefaultCheckedProp: string;
    toggleOptionHandler: (opt, checked: boolean) => void;
}
