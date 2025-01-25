import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import AssetsForDesign from "./pages/Assets";
import HomePage from "./pages/Home/Home";
import AboutUs from "./pages/About/HeroAbout";
import BlogPage from "./pages/Blogs/BlogPage";
import ContactSection from "./pages/Contact/ContactHero";
import JobLayout from "./pages/Jobs/JobLayout";
import SignupForm from "./pages/Register/Register";
import LoginPage from "./pages/Login/login";
import ResetPasswordPage from "./pages/Reset/Reset";
import Company from "./pages/Company/Company";
// import Loader from "./pages/Register/Loader";
import ViewJobDetailsLayout from "./pages/Jobs/ViewJobDetailsLayout";
import ScrollToTop from "./components/ScrollToTop";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/contact' element={<ContactSection/>}/>
          <Route path="/our/assets" element={<AssetsForDesign />} />
          <Route path="/blogs" element={<BlogPage />} />

          <Route path="/jobs" element={<JobLayout />} />
          <Route path="/jobs/:jobId" element={<ViewJobDetailsLayout />} />

          <Route path="/register" element={<SignupForm />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPasswordPage/>} />
          <Route path="/company" element={<Company/>} />
          {/* <Route path="/loader" element={<Loader/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
