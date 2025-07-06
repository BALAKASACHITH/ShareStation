import { Routes, Route} from "react-router-dom";
import Land from "./components/Land/Land.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Land />} /> 
      <Route path="/Dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}