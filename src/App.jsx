import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import List from "./pages/list";
import Details from "./pages/details";
//import Analytics from "./pages/analytics";
import ProtectedRoute from "./components/protectedRoutes";

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

      <Route
        path="/details/:id"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      /> */}

    </Routes>
  );
}

export default App;
