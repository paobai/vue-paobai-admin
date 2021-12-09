export enum ApiCodeEnum {
    SUCCESS = 1,
    FAILED = 0
}

export interface ApiResponseBase {
    code: ApiCodeEnum;
    data: any;
    msg?: string;
}