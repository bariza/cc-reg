/**
 * Challenge Answer Api 
 * API payload
 * @export
 */
export interface VerificationRequest {
    businessPhone: string;
    businessPhoneExt?: string;
    cardNumber: string;
    challengeToken: string;
    dob: string; //yyyy-mm-dd;
    homePhone: string;
    postalCode: string;
}

/**
 * Challenge Error Response Api structure 
 * Same for both 404 and 500 error response
 * @export
 * 
 */
export interface VerificationErrorResponse{
    additionalData:any,
    code:string,
    detailMessage:string,
    source:string,
    type:string
}
