import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout";
import Index from "./pages/Inbox/Index";
import MappingList from "./pages/mapping/Index";
import Quality from "./pages/quality/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="data-view" replace />} />
          <Route path="data-view" element={<Index />} />
          <Route path="mapping" element={<MappingList />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="*" element={<h3>Page not found</h3>} />
        </Route>
      </Routes>

      {/* <AppLayout /> */}
    </>
  );
}

export default App;
