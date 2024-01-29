import { Routes, Route } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Wallet from "./features/Wallet/Wallet";
import Fitness from "./features/Fitness/Fitness";
import Schedule from "./features/Schedule/Schedule";
import Homepage from "./features/Homepage/homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/fitness" element={<Fitness />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
