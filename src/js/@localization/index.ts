export default new class Localization {
    private _res = {
        1033: require("../Resources/en-US.json"),
        1044: require("../Resources/no-NB.json"),
    };

    /**
     * Get the resource with the specified key
     *
     * @param {string} resKey Resource key
     * @param {number} language Language
     */
    public getResource(resKey: string, lcid = _spPageContextInfo.webLanguage): string {
        const dict = this._res[lcid];
        return dict ? dict[resKey] : "";
    }
};

