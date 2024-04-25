import {Observation} from "./Observation";

export type OracleResponse = {
    status: string;
    input: Observation;
    action: number;
};