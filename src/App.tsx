import Actions from "./components/Actions";
import { Route, Routes } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { SettingsPage } from "@/components/pages/SettingsPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Actions />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
