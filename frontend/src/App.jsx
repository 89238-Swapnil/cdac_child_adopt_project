import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
//import OrphanageDetails from '../../Components/Details/OrphanageDetails';
import AdoptionForm from './Components/Form/AdoptionForm'; // Adjust path based on your folder structure

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ChildrenList from './Components/Add/ChildrenList';
import ChildDetails from './Components/Details/ChildDetails';
import OrphanageDetails from './Components/Details/OrphanageDetails';

// Pages
import SignUpParent from './Components/Pages/SignupParent';
import RegisterChoice from './Components/RegisterChoice';

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SignIn from "./Components/Pages/Signin";
import SignUp from "./Components/Pages/SignUp";
import Orphanages from "./Components/Add/OrphanagesList";

// Dashboards
import ParentDashboard from "./Components/Dashboards/ParentDashboard";
import OrphanageDashboard from "./Components/Dashboards/OrphanageDashboard";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            
        <Route path="/children-list" element={<ChildrenList />} />
        <Route path="/child-details" element={<ChildDetails />} />

           <Route path="/register-choice" element={<RegisterChoice />} />

<Route path="/signup" element={<SignUp />} />
 <Route path="/signup-parent" element={<SignUpParent />} />
            <Route path="/orphanages/:id" element={<OrphanageDetails />} />
           <Route path="/parent-dashboard" element={<ParentDashboard />} />

            <Route path="/child/:id" element={<ChildDetails />} />
             <Route path="/adoption-form" element={<AdoptionForm />} />


            <Route path="/orphanage/dashboard" element={<OrphanageDashboard />} />
           <Route path="/orphanages" element={<Orphanages />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
