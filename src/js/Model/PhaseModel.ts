
import * as Util from "../Util";

export default class PhaseModel {
    public Id: string;
    public Name: string;
    public WssId?: number;
    public PhaseLevel?: string;
    public ShowOnFrontpage?: boolean;
    public Type: string;

    /**
     * Constructor
     *
     * @param {SP.Taxonomy.Term} term Term
     */
    constructor(term?: SP.Taxonomy.Term) {
        if (term) {
            const properties = term.get_localCustomProperties();
            this.Id = term.get_id().toString();
            this.Name = term.get_name();
            this.PhaseLevel = properties.PhaseLevel || "Default";
            this.ShowOnFrontpage = properties.ShowOnFrontpage !== "false";
            this.Type = properties.PhaseType || "Default";
        }
    }

    /**
    * Initialize safe using utility function getSafeTerm
    *
    * @param {any} termValue Term value
    */
    public initSafe(termValue): PhaseModel {
        const safe = Util.getSafeTerm(termValue);
        this.Id = safe.get_termGuid();
        this.Name = safe.get_label();
        this.WssId = safe.get_wssId();
        return this;
    }

    /**
     * Get phase level class name
     */
    public getPhasLevelClassName() {
        return `level-${this.PhaseLevel.trim().toLowerCase()}`;
    }

    /**
     * Get phase letter
     */
    public getPhaseLetter(): string {
        return this.Name[0];
    }
}