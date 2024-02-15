import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/MovieModal/Nav";
import DetailPage from "./components/page/DetailPage";
import MainPage from "./components/page/MainPage";
import LoginPage from "./components/page/LoginPage";
import SearchPage from "./components/page/SearchPage";

const Layout = () => {
  return (
    <>
      <Nav />

      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
