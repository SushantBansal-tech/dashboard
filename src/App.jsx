import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
  path="/list"
  element={
    <ProtectedRoute>
      <List />
    </ProtectedRoute>
  }
/>
      <Route path="/details/:id" element={<Details />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
