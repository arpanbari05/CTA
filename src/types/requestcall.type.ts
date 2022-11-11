export default interface RequestcallParametersType {
  userId: number;
  InputOfCustomer: {
    LeadID: string;
    CustomerName: string;
    CustomerMobileNumber: string;
    CustomerEmailID: string;
    StoreCode: string;
    CampaignName: string;
    LeadCreationDate: Date;
    LeadCategory: string;
    RequestType: 1;
    PinCode: number;
  };
}
