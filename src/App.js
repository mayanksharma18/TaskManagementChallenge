import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import BoardPage from "./components/Board/BoardPage/BoardPage";
import { AppStateProvider } from "../src/contexts/AppStateContext";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/board/:boardName" element={<BoardPage />} />
          </Routes>
        </Router>
      </AppStateProvider>
    </div>
  );
}

export default App;
