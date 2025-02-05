import { BrowserRouter, Routes, Route } from "react-router-dom";
import DakhilaPrint from "./DakhilaPrint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dakhila-print/:id" element={<DakhilaPrint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
