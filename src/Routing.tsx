import { Routes, Route } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Wallet from "./features/Wallet/Wallet";
import Fitness from "./features/Fitness/Fitness";
import Schedule from "./features/Schedule/Schedule";
import Homepage from "./features/Homepage/Homepage";
import SignUp from "./features/Auth/SignUp";
import Login from "./features/Auth/Login";
import ProfilBodyComponent from "./features/Fitness/ProfilBodyComponent";
import MuscleExerciceComponent from "./features/Fitness/FitnessCalcul/MuscleExerciceComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/fitness" element={<Fitness />}>
        <Route path="exercise/:muscleName" element={<Fitness />} />
      </Route>
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
