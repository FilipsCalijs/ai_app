// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// import TopBanner from "../TopBanner/TopBanner";
// import FrontHero from "../FrontHero/FrontHero";
// import Review from "../Review/Review";
// import HowWork from "../HowWork/HowWork";
// import SliderCompare from "../SliderCompare/SliderCompare";
// import FAQ from "../FAQ/FAQ";
// import Footer from "../Footer/Footer";
// import ModalWindow from "../ModalWindow/ModalWindow";
// import RulesModal from "../RulesModal/RulesModal";
// import PrivateRoute from "../PrivateRoute";
// import Signup from "../../pages/Signup";
// import CreateImage from "../CreateImage/CreateImage";
// import SecuritySafe from "../SecuritySafe/SecuritySafe";


// function AppContent() {
//   const location = useLocation();
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       {showModal && <ModalWindow onClose={() => setShowModal(false)} />}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <TopBanner />
//               <FrontHero />
//               <Review />
//               <HowWork />
//               <SliderCompare />
//               <FAQ />
//               <Footer />
//             </>
//           }
//         />
//         <Route
//           path="/create-image"
//           element={
//             <PrivateRoute>
//               <h1>Create Image Page</h1>
//             </PrivateRoute>
//           }
//         />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </>
//   );
// }
