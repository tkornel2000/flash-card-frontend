import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNew from "./Components/AddNew";
import Main from "./Components/Main";
import Speech from "./Components/Speech";

function App() {

  return (
    <BrowserRouter>
        {/* <div className="bg-img"> */}
          <Routes>
            <Route path="/" element={<AddNew />} />
            <Route path="/addnew" element={<AddNew />} />
            <Route path="/main" element={<Main />} />
            <Route path="/speech" element={<Speech />} />
          </Routes>
        {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
