import { useState } from "react";
import { loadActions } from "./api/api";
import {Action} from "./types/Action";

function App() {
  const [historyOfActions, setHistoryOfActions] = useState<Action[]>([]);

  // Function to load actions from the API
  const loadActionsFromAPI = () => {
    // Assuming loadActions is an asynchronous function that returns a Promise
    loadActions()
        .then((actions: Action[]) => {
          // Set the loaded actions to the state
          setHistoryOfActions(actions);
        })
        .catch(error => {
          console.error("Error loading actions:", error);
        });
  };

  // Load actions when the component mounts
  useState(() => {
    loadActionsFromAPI();
  }); // Empty dependency array ensures it only runs once

  return (
      <div>
        <h1>History of Actions</h1>
        <ul>
          {/* Map through historyOfActions and render each action */}
          {historyOfActions.map((action, index) => (
              <li key={index}>
                <strong>Observations:</strong>
                <ul>
                  {/* Map through observations and render each observation */}
                  {action.observations.map((observation, obsIndex) => (
                      <li key={obsIndex}>{observation}</li>
                  ))}
                </ul>
                <strong>Action:</strong> {action.action}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
