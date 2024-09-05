import {FetchActionRequestBody} from "./FetchActionRequestBody";

export type OracleResponse = {
    status: string;
    obs: number[];
    action: number;
    datetime: string;
};