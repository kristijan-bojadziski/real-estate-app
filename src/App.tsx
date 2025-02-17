import { Route, Routes } from "react-router";
// Pages
import { Home, Details, Login, NotFound } from "pages";
// Components
import { ProtectedRoute } from "components";
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
