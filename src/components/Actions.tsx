import React, { useState } from "react";
import { fetchAction, fetchActionsHistory } from "@/api/api";
import { OracleResponse } from "@/types/OracleResponse";
import ActionsHistoryRecord from "./ActionHistoryRecord";
import Stats from "./Stats";
import CustomFetch from "./CustomFetch";
import Timeline from "./Timeline";

const Actions: React.FC = () => {
  const [seeCustomFetch, setSeeCustomFetch] = useState<boolean>(false);
  const [action, setAction] = useState<number | null>(null);
  const [history, setHistory] = useState<OracleResponse[]>([]);
  const [actionsHistory, setActionsHistory] = useState<Map<number, number>>(
    new Map()
  );

  const generateRandomNumbers = () => {
    return Array.from({ length: 7 }, () => Math.random());
  };

  const updateActionHistoryWithList = (actions: number[]) => {
    const newActionsHistory = new Map<number, number>();

    actions.forEach((action) => {
      if (newActionsHistory.has(action)) {
        newActionsHistory.set(action, (newActionsHistory.get(action) || 0) + 1);
      } else {
        newActionsHistory.set(action, 1);
      }
    });

    setActionsHistory(newActionsHistory);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "1em",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ position: "absolute", left: "45vw", bottom: 0 }}>
        <Stats actionsHistory={actionsHistory} />
      </div>
      <div style={{ position: "absolute", left: "45vw", top: 0 }}>
        <Timeline history={history} />
      </div>
      <button
        style={{
          padding: "1em",
          margin: "1em",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          fetchAction({ obs: generateRandomNumbers() })
            .then((response) => {
              setAction(response.action);
              fetchActionsHistory().then((response) => {
                setHistory(response);
                let tmpHistory: number[] = [];
                Object.entries(
                  response.map((r) => {
                    tmpHistory.push(r.action);
                  })
                );
                updateActionHistoryWithList(tmpHistory);
              });
            })
            .catch((error) => {
              console.error("Failed to fetch action", error);
            });
        }}
      >
        {" "}
        Random Observations
      </button>
      <button
        style={{
          padding: "1em",
          margin: "1em",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          fetchActionsHistory()
            .then((response) => {
              setHistory(response);
              let tmpHistory: number[] = [];
              Object.entries(
                response.map((r) => {
                  tmpHistory.push(r.action);
                })
              );
              updateActionHistoryWithList(tmpHistory);
            })
            .catch((error) => {
              console.error("Failed to fetch history", error);
            });
        }}
      >
        {" "}
        Reload history
      </button>
      <button
        style={{
          padding: "1em",
          margin: "1em",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          setSeeCustomFetch(!seeCustomFetch);
        }}
      >
        Custom Observations
      </button>
      {seeCustomFetch && <CustomFetch
        setAction={setAction}
        setHistory={setHistory}
        updateActionHistoryWithList={updateActionHistoryWithList}
        setSeeCustomFetch={setSeeCustomFetch}
      />}
      <div style={{ margin: "1em 0" }}>
        <h2 style={{ color: "#007BFF" }}>
          {action === null ? "Loading..." : `Policy chose: ${action}`}
        </h2>
      </div>
      <div>
        {history && (
          <div>
            <h3>Action History:</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                maxHeight: "75vh",
                maxWidth: "35em",
                overflowY: "auto",
              }}
            >
              {history
                .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : b.datetime < a.datetime ? -1 : 0
                )
                .map((oracleResponse, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "1em",
                      background: "#f8f9fa",
                      padding: "1em",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                      width: "32em",
                    }}
                  >
                    <ActionsHistoryRecord oracleResponse={oracleResponse} />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actions;
