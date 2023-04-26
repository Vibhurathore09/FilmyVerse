import Header from "./Components/Header";
import Cards from "./Components/Cards";
import AddMovie from "./Components/AddMovie";
import Detail from "./Components/Detail";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
// import "./index.css";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Appstate.Provider value={{ login, username, setLogin, setUsername }}>
      <div
        className="App relative
    "
      >
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
