import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Stories from "./components/Stories/Stories";
import Tours from "./components/Tours/Tours";
import Form from "./components/Form/Form";
import Login from "./components/RegistrationAndLogin/Login";
import Footer from "./components/Footer/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/RegistrationAndLogin/SignUp";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Blog from "./components/Blog/Blog";
import Planner from "./components/Planner/Planner";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminAddCity from "./components/Admin/AdminAddCity";
// import AdminMain from "./components/Admin/AdminMain";
// import AdminCities from "./components/Admin/AdminCities";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ScrollToTop />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar />

                  <Home />
                  <Footer />
                </>
              }
            ></Route>

            <Route
              exact
              path="/stories"
              element={
                <>
                  <Navbar />

                  <Stories />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              exact
              path="/form"
              element={
                <>
                  <Navbar />

                  <Form />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              exact
              path="/planner"
              element={
                <>
                  <Planner />
                </>
              }
            ></Route>

            <Route
              exact
              path="/tours"
              element={
                <>
                  <Navbar />

                  <Tours />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              exact
              path="/blogs/:cityname"
              element={
                <>
                  <Navbar />

                  <Blog />
                  <Footer />
                </>
              }
            ></Route>

            <Route
              exact
              path="/login"
              element={
                <>
                  <Navbar />

                  <Login />
                  <Footer />
                </>
              }
            ></Route>

            <Route
              exact
              path="/signup"
              element={
                <>
                  <Navbar />

                  <SignUp />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              exact
              path="/pwreset"
              element={
                <>
                  <Navbar />

                  <PasswordReset />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              exact
              path="/admin"
              element={
                <>
                  <AdminLogin />
                </>
              }
            ></Route>
            <Route
              exact
              path="/admin/dashboard"
              element={
                <>
                  <AdminDashboard />
                  {/* <Admin /> */}
                </>
              }
            ></Route>
            {/* <Route
              exact
              path="/admin/cities"
              element={
                <>
                  <AdminCities />
                </>
              }
            ></Route> */}
            {/* <Route
              exact
              path="/admin/addcity"
              element={
                <>
                  <AdminAddCity />
                </>
              }
            ></Route> */}
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}
