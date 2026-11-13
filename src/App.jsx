import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/JobSeeker/Layout/Layout";
import Home from "./Components/JobSeeker/Pages/Home";
import About from "./Components/JobSeeker/Pages/About";
import AdminLayout from "./Components/Admin/Layout/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Categories from "./Components/JobSeeker/Pages/Categories";
import BrowseJobs from "./Components/JobSeeker/Pages/BrowseJobs";
import MyApplications from "./Components/JobSeeker/Pages/MyApplications";
import MyProfile from "./Components/JobSeeker/Pages/MyProfile";
import ResumeBuilder from "./Components/JobSeeker/Pages/ResumeBuilder";
import Contact from "./Components/JobSeeker/Pages/Contact";
import ManageJobSeeker from "./Components/Admin/JobSeeker/ManageJobSeeker";
import ManageCategories from "./Components/Admin/Category/ManageCategory";
import ManageJobs from "./Components/Admin/Jobs/ManageJobs";
import ViewApplications from "./Components/Admin/Applications/ViewApplications";
import Logout from "./Components/Admin/Profile/Logout";
import ManageResume from "./Components/Admin/Resume/ManageResume";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { ToastContainer } from "react-toastify";
import EditCategory from "./Components/Admin/Category/EditCategory";
import EditJobSeeker from "./Components/Admin/JobSeeker/EditJobSeeker";
import EditJob from "./Components/Admin/Jobs/EditJob";
import EditApplications from "./Components/Admin/Applications/EditApplications";
import EditResume from "./Components/Admin/Resume/EditResume";
import JobDescription from "./Components/JobSeeker/Pages/JobDescription";
import ScrollToTop from "./Components/JobSeeker/Layout/ScrollToTop";
import SavedJobs from "./Components/JobSeeker/Pages/SavedJobs";
import AdminProfile from "./Components/Admin/Profile/AdminProfile";
import ContactMessages from "./Components/Admin/Messages/ContactMessages";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* JobSeeker Routes Start */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="categories" element={<Categories />} />
              <Route path="browsejobs" element={<BrowseJobs />} />
              <Route path="jobdescription" element={<JobDescription />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="myapplications" element={<MyApplications />} />
              <Route path="myprofile" element={<MyProfile />} />
              <Route path="resumebuilder" element={<ResumeBuilder />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Route>
          {/* JobSeeker Routes End */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="managejobseeker" element={<ManageJobSeeker />} />
            <Route
              path="managejobseeker/edit/:id"
              element={<EditJobSeeker />}
            />
            <Route path="managecategories" element={<ManageCategories />} />
            <Route
              path="managecategories/edit/:id"
              element={<EditCategory />}
            />
            <Route path="managejobs" element={<ManageJobs />} />
            <Route path="managejobs/edit/:id" element={<EditJob />} />
            <Route path="viewapplications" element={<ViewApplications />} />
            <Route
              path="viewapplications/edit/:id"
              element={<EditApplications />}
            />
            <Route path="manageresume" element={<ManageResume />} />
            <Route path="manageresume/edit/:id" element={<EditResume />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route
              path="/admin/contactmessages"
              element={<ContactMessages />}
            />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
