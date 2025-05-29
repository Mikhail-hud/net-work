import {
    RESULT_CODE_SUCCESS,
    RESULT_CODE_REJECT_WITH_SECURITY,
    RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL,
} from "@app/constants/apiResultCodeConstans";

export type ResultCodeTypes =
    | typeof RESULT_CODE_SUCCESS
    | typeof RESULT_CODE_REJECT_WITH_SECURITY
    | typeof RESULT_CODE_REJECT_WITH_WRONG_CREDENTIAL;

export interface BaseResponse<T> {
    data: T;
    messages: string[];
    fieldsErrors: string[];
    resultCode: ResultCodeTypes;
}
