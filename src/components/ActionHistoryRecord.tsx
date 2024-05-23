import React, {useState} from 'react';
import {Observation} from "../types/Observation";
import {OracleResponse} from "../types/OracleResponse";


interface ActionHistoryRecordProps {
    oracleResponse: OracleResponse;
}

const ActionsHistoryRecord: React.FC<ActionHistoryRecordProps> = (props) => {

    const mapToObservations = (obs: number[]): Observation => {
        if (obs.length !== 7) {
            throw new Error("obs array must have exactly 7 elements");
        }

        return {
            vmAllocatedRatioHistory: obs[0],
            avgCPUUtilizationHistory: obs[1],
            p90CPUUtilizationHistory: obs[2],
            avgMemoryUtilizationHistory: obs[3],
            p90MemoryUtilizationHistory: obs[4],
            waitingJobsRatioGlobalHistory: obs[5],
            waitingJobsRatioRecentHistory: obs[6],
        }
    };

    const [observations, setObservations] = useState<Observation>(mapToObservations(props.oracleResponse.input.obs));


    return (
        <div>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#007BFF' }}>Action: {props.oracleResponse.action}</p>
            <div style={{ fontFamily: 'Arial', padding: '1em' }}>
                <h3>Observations:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {Object.entries(observations).map(([key, value], index) => (
                        <div key={index} style={{ marginBottom: '0.5em', background: '#f8f9fa', borderRadius: '5px' }}>
                            {key}: {value}
                        </div>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default ActionsHistoryRecord;