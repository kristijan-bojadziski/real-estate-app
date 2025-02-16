import { Route, Routes } from "react-router";
// Pages
import { Home } from "pages/Home/Home";
import { Details } from "pages/Details/Details";
import { Login } from "pages/Login/Login";
import { NotFound } from "pages/NotFound/NotFound";
// Components
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
// Styles
import "src/App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Route>
      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
