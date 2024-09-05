import React, { useState } from 'react';
import {fetchAction, fetchHistory} from '../api/api';
import {OracleResponse} from "../types/OracleResponse";
import ActionsHistoryRecord from "./ActionHistoryRecord";
import {Observation} from "../types/Observation";

const Actions: React.FC = () => {
    const [action, setAction] = useState<number | null>(null);
    const [history, setHistory] = useState<OracleResponse[]>([]);

    const generateRandomNumbers = () => {
        return Array.from({ length: 7 }, () => Math.random());
    };



    return (
        <div style={{ fontFamily: 'Arial', padding: '1em' }}>
            <button style={{ padding: '1em', margin: '1em', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={() => {
                        fetchAction({obs: generateRandomNumbers()})
                            .then((response) => {
                                setAction(response.action)
                                console.log(response)
                            })
                            .catch(error => {
                                console.error('Failed to fetch action', error);
                            });
                    }}> Fetch action
            </button>
            <button style={{ padding: '1em', margin: '1em', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={() => {
                        fetchHistory()
                            .then((response) => {
                                setHistory(response)
                                console.log(response)
                            })
                            .catch(error => {
                                console.error('Failed to fetch history', error);
                            });
                    }}> Reload history
            </button>
            <div style={{ margin: '1em 0' }}>
                <h2 style={{ color: '#007BFF' }}>{action === null ? 'Loading...' : `Policy chose: ${action}`}</h2>
            </div>
            <div>
                {
                    history &&
                        <div>
                            <h3>Action History:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {history.sort((a, b) => (a.datetime < b.datetime) ? 1 : (b.datetime < a.datetime) ? -1 : 0).map((oracleResponse, index) => (
                                    <li key={index} style={{
                                        marginBottom: '1em',
                                        background: '#f8f9fa',
                                        padding: '1em',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <ActionsHistoryRecord oracleResponse={oracleResponse}/>
                                        {/*<p style={{ margin: 0, color: '#333', wordBreak: 'break-all' }}>Observations: {oracleResponse.input.obs.join(', ')}</p>*/}
                                    </li>
                                ))}
                            </ul>
                        </div>
                }
            </div>
        </div>
    );
};

export default Actions;