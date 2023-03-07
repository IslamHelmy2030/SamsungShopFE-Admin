export interface IDataResponseDto<T>{
        data?:T;
        isSuccess :boolean;
        message:string;
}

export interface IListDataResponseDto<T> extends IDataResponseDto<T> {
    TotalDataCount:number;
}

export interface IPaginationDto{
    pageSize:number,
    totalRowsCount:number,
    currentPage:number,
    rotate:boolean,
    boundaryLinks:boolean,
    maxSizePagesLinks:number,
    ellipses:boolean
}

export interface IUserData{
    name:string,
    message:string,
    isSuccess:boolean,
    expireDate:Date
    data:any;
}