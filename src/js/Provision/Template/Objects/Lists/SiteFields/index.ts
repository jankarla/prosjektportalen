export const GtCommunicationTarget = `<Field Type="LookupMulti" DisplayName="${__("SiteFields_GtCommunicationTarget_DisplayName")}" List="{listid:${__("Lists_Stakeholders_Title")}}" ShowField="Title" ID="{d685f33f-51b5-4e9f-a314-4b3d9467a7e4}" Name="GtCommunicationTarget" StaticName="GtCommunicationTarget" InternalName="GtCommunicationTarget" Mult="TRUE" />`;
export const GtProjectLogEventLookup = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectLogEventLookup_DisplayName")}" List="{listid:${__("Lists_MeetingCalendar_Title")}}" ShowField="GtProjectEventDateAndTitle" ID="{20731fb1-e98e-4fdc-b3d6-941b41b8fd6e}" StaticName="GtProjectLogEventLookup" InternalName="GtProjectLogEventLookup" />`;
export const GtProjectLogProductLookup = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectLogProductLookup_DisplayName")}" List="{listid:${__("Lists_ProjectProducts_Title")}}" ShowField="Title" ID="{022cc93f-13df-4420-bd47-55e4fdae5d18}" StaticName="GtProjectLogProductLookup" InternalName="GtProjectLogProductLookup" />`;
export const GtProductInteressent = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProductInteressent_DisplayName")}" List="{listid:${__("Lists_Stakeholders_Title")}}" ShowField="Title" ID="{6d90e0b6-73e6-48fb-aa1e-b897b214f934}" StaticName="GtProductInteressent" InternalName="GtProductInteressent" />`;
export const GtProjectTaskComElement = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskComElement_DisplayName")}" List="{listid:${__("Lists_CommunicationPlan_Title")}}" ShowField="Title" ID="{087dae25-b007-4e58-91b4-347dde464840}" StaticName="GtProjectTaskComElement" InternalName="GtProjectTaskComElement" />`;
export const GtProjectTaskRisk = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskRisk_DisplayName")}" List="{listid:${__("Lists_Uncertainties_Title")}}" ShowField="Title" ID="{920b385c-756f-49eb-98e7-4c3ebf15b7f4}" StaticName="GtProjectTaskRisk" InternalName="GtProjectTaskRisk" />`;
export const GtProjectTaskProduct = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskProduct_DisplayName")}" List="{listid:${__("Lists_ProjectProducts_Title")}}" ShowField="Title" ID="{a3ab9d99-78da-436d-a299-5854340a504f}" StaticName="GtProjectTaskProduct" InternalName="GtProjectTaskProduct" />`;
export const GtProjectTaskChange = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskChange_DisplayName")}" List="{listid:${__("Lists_ChangeAnalysis_Title")}}" ShowField="Title" ID="{2b55bfc2-44c5-4b67-92a7-9b43bffbceb4}" StaticName="GtProjectTaskChange" InternalName="GtProjectTaskChange" />`;
export const GtProjectTaskBenefit = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtProjectTaskBenefit_DisplayName")}" List="{listid:${__("Lists_BenefitsAnalysis_Title")}}" ShowField="Title" ID="{1149ce1e-bb07-4d3c-afe0-3242708b3c8e}" StaticName="GtProjectTaskBenefit" InternalName="GtProjectTaskBenefit" />`;
export const GtProjectEventDateAndTitle = `<Field ID="{7604dadc-d8e3-4f35-bc58-890d33d908b9}"  StaticName="GtProjectEventDateAndTitle"  InternalName="GtProjectEventDateAndTitle" DisplayName="${__("SiteFields_GtProjectEventDateAndTitle_DisplayName")}" Type="Calculated" Required="FALSE" ResultType="Text" ReadOnly="TRUE" EnforceUniqueValues="FALSE" Indexed="FALSE" Percentage="FALSE"><Formula>=TEXT(${__("SiteFields_EventDate_DisplayName")},"yyyy-mm-dd")&amp;" "&amp;${__("SiteFields_Title_DisplayName")}</Formula><FieldRefs><FieldRef Name="${__("SiteFields_Title_DisplayName")}" /><FieldRef Name="${__("SiteFields_EventDate_DisplayName")}" /></FieldRefs></Field>`;
export const GtChangeLookup = `<Field Type="LookupMulti" DisplayName="${__("SiteFields_GtChangeLookup_DisplayName")}" List="{listid:${__("Lists_ChangeAnalysis_Title")}}" ShowField="LinkTitleNoMenu" UnlimitedLengthInDocumentLibrary="FALSE" RelationshipDeleteBehavior="None" ID="{1d5752af-4d26-4aed-b20a-6229ac14ed5d}" StaticName="GtChangeLookup" InternalName="GtChangeLookup" Group="" Description="Foreslått endring fra endringsanalysen" Mult="TRUE" />`;
export const GtBenefitLookup = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtBenefitLookup_DisplayName")}" List="{listid:${__("Lists_BenefitsAnalysis_Title")}}" ShowField="Title" ID="{8d70fa93-b547-46f1-84e7-4982f8c9c675}" StaticName="GtBenefitLookup" InternalName="GtBenefitLookup" SourceID="{{listid:Gevinstsoppfølging}}" />`;
export const GtMeasureIndicatorLookup = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtMeasureIndicatorLookup_DisplayName")}" List="{listid:${__("Lists_BenefitsAnalysis_Title")}}" ShowField="GtMeasureIndicator" FieldRef="8d70fa93-b547-46f1-84e7-4982f8c9c675" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{92ae8541-f35e-4c05-8518-b9abce2d0860}" SourceID="{{listid:Gevinstsoppfølging}}" StaticName="GtMeasureIndicatorLookup" InternalName="GtMeasureIndicatorLookup" />`;
export const GtBenefitLookup_ID = `<Field Type="Lookup" DisplayName="${__("SiteFields_GtBenefitLookup_DisplayName")} ID" List="{listid:${__("Lists_BenefitsAnalysis_Title")}}" ShowField="ID" FieldRef="8d70fa93-b547-46f1-84e7-4982f8c9c675" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{c239539c-8672-46cc-be77-fb53322f71ae}" SourceID="{{listid:Gevinstsoppfølging}}" ShowInDisplayForm="FALSE" StaticName="GtBenefitLookup_ID" InternalName="GtBenefitLookup_ID" />`;
