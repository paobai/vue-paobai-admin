export enum ApiCodeEnum {
    SUCCESS = 1,
    FAILED = 0
}

export interface ApiResponseBase<T> {
    code: ApiCodeEnum;
    data: T;
    msg?: string;
}