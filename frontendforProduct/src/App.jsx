import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createproduct" element={<CreateProduct />} />
      </Routes>
    </>
  )
}

export default App
