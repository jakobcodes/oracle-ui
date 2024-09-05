import Actions from "./components/Actions";
import { Route, Routes } from "react-router-dom";
import NavBar from "@/components/NavBar";
import UploadPolicyPage from "@/components/pages/UploadPolicyPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Actions />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/policies" element={<UploadPolicyPage />} />
      </Routes>
    </>
  );
}

export default App;
