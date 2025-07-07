import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import TopBanner from "./components/TopBanner/TopBanner";
import FrontHero from "./components/FrontHero/FrontHero";
import Review from "./components/Review/Review";
import HowWork from "./components/HowWork/HowWork";
import SliderCompare from "./components/SliderCompare/SliderCompare";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import RulesModal from "./components/RulesModal/RulesModal";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/Signup";
import CreateImage from "./components/CreateImage/CreateImage";
import SecuritySafe from "./components/SecuritySafe/SecuritySafe";

function AppContent() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);          // Modal on /create-image
  const [rulesAccepted, setRulesAccepted] = useState(false);  // Rules modal on first visit

  // Check if rules were accepted
  useEffect(() => {
    const accepted = localStorage.getItem("rulesAccepted");
    if (accepted === "true") {
      setRulesAccepted(true);
    }
  }, []);

  // Handle "Accept" in RulesModal
  const handleAcceptRules = () => {
    localStorage.setItem("rulesAccepted", "true");
    setRulesAccepted(true);
  };

  // Show 5-sec modal on /create-image
  useEffect(() => {
    let timer;

    if (location.pathname === "/create-image") {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
    } else {
      setShowModal(false);
    }

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Main app blur when RulesModal is shown */}
      <div className={rulesAccepted ? "" : "app-blur"}>
        {showModal && <ModalWindow onClose={() => setShowModal(false)} />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopBanner />
                <FrontHero />
                <Review />
                <SliderCompare />
                <HowWork />
                <SecuritySafe/>
                <FAQ />
              
                <Footer/>
                
               
              </>
            }
          />
          <Route
            path="/create-image"
            element={
              <PrivateRoute>
                <CreateImage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {/* Rules modal overlays everything if not accepted */}
      {!rulesAccepted && <RulesModal onAccept={handleAcceptRules} />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
