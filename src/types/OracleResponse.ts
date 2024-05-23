import {FetchActionRequestBody} from "./FetchActionRequestBody";

export type OracleResponse = {
    status: string;
    input: FetchActionRequestBody;
    action: number;
};