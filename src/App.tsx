import { Header } from "./components/ui/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Posts } from "./pages/Posts";
import { Users } from "./pages/Users";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"/users"} element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};
