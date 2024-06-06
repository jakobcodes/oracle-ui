import React, { useState } from "react";
import { Observation } from "../types/Observation";
import { fetchAction, fetchHistory } from "../api/api";
import { OracleResponse } from "../types/OracleResponse";

interface CustomFetchProps {
  setAction: React.Dispatch<React.SetStateAction<number | null>>;
  setHistory: React.Dispatch<React.SetStateAction<OracleResponse[]>>;
  updateActionHistoryWithList: (actions: number[]) => void;
  setSeeCustomFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomFetch: React.FC<CustomFetchProps> = ({
                                                   setAction,
                                                   setHistory,
                                                   updateActionHistoryWithList,
                                                   setSeeCustomFetch,
                                                 }) => {
  const [observation, setObservation] = useState<Observation>({
    vmAllocatedRatioHistory: 0,
    avgCPUUtilizationHistory: 0,
    p90CPUUtilizationHistory: 0,
    avgMemoryUtilizationHistory: 0,
    p90MemoryUtilizationHistory: 0,
    waitingJobsRatioGlobalHistory: 0,
    waitingJobsRatioRecentHistory: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Observation
  ) => {
    const value = e.target.value;

    setObservation({
      ...observation,
      [key]: value === "" ? 0 : parseFloat(value),
    });
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties;

  const dialogStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "2em",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
  } as React.CSSProperties;

  const inputStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "0.5em",
    fontSize: "1em",
    width: "100%",
    marginBottom: "0.5em",
  } as React.CSSProperties;

  const inputFocusStyle = {
    borderColor: "#007bff",
    outline: "none",
  } as React.CSSProperties;

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <div style={{fontStyle: "bold", fontSize: "2em", marginBottom: ".7em"}}>Custom Observation Inputs</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <label htmlFor="vmAllocatedRatioHistory">
            VM Allocated Ratio History
            <input
              id="vmAllocatedRatioHistory"
              type="text"
              value={observation.vmAllocatedRatioHistory}
              onChange={(e) => handleChange(e, "vmAllocatedRatioHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="avgCPUUtilizationHistory">
            Avg CPU Utilization History
            <input
              id="avgCPUUtilizationHistory"
              type="text"
              value={observation.avgCPUUtilizationHistory}
              onChange={(e) => handleChange(e, "avgCPUUtilizationHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="p90CPUUtilizationHistory">
            P90 CPU Utilization History
            <input
              id="p90CPUUtilizationHistory"
              type="text"
              value={observation.p90CPUUtilizationHistory}
              onChange={(e) => handleChange(e, "p90CPUUtilizationHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="avgMemoryUtilizationHistory">
            Avg Memory Utilization History
            <input
              id="avgMemoryUtilizationHistory"
              type="text"
              value={observation.avgMemoryUtilizationHistory}
              onChange={(e) => handleChange(e, "avgMemoryUtilizationHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="p90MemoryUtilizationHistory">
            P90 Memory Utilization History
            <input
              id="p90MemoryUtilizationHistory"
              type="text"
              value={observation.p90MemoryUtilizationHistory}
              onChange={(e) => handleChange(e, "p90MemoryUtilizationHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="waitingJobsRatioGlobalHistory">
            Waiting Jobs Ratio Global History
            <input
              id="waitingJobsRatioGlobalHistory"
              type="text"
              value={observation.waitingJobsRatioGlobalHistory}
              onChange={(e) => handleChange(e, "waitingJobsRatioGlobalHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
          <label htmlFor="waitingJobsRatioRecentHistory">
            Waiting Jobs Ratio Recent History
            <input
              id="waitingJobsRatioRecentHistory"
              type="text"
              value={observation.waitingJobsRatioRecentHistory}
              onChange={(e) => handleChange(e, "waitingJobsRatioRecentHistory")}
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  inputFocusStyle.borderColor as string)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor =
                  inputStyle.borderColor as string)
              }
            />
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              padding: "1em",
              margin: "1em",
              background: "#A12445",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "5em",
            }}
            onClick={() => {
              setSeeCustomFetch(false);
            }}
          >
            Cancel
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
              width: "5em",
            }}
            onClick={() => {
              fetchAction({ obs: Object.values(observation) })
                .then((response) => {
                  setAction(response.action);
                  fetchHistory().then((response) => {
                    setHistory(response);
                    let tmpHistory: number[] = [];
                    response.forEach((r) => {
                      tmpHistory.push(r.action);
                    });
                    updateActionHistoryWithList(tmpHistory);
                  });
                })
                .catch((error) => {
                  console.error("Failed to fetch action", error);
                })
                .finally(() => setSeeCustomFetch(false));
            }}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomFetch;
