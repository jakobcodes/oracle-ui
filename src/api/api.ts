import {FetchActionRequestBody} from "../types/FetchActionRequestBody";
import {OracleResponse} from "../types/OracleResponse";

export const fetchAction = async (body: FetchActionRequestBody) : Promise<OracleResponse> => {
    const response = await fetch('http://localhost:8080/oracle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

export const fetchHistory = async () : Promise<OracleResponse[]> => {
    const response = await fetch('http://localhost:8080/get_actions_history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}