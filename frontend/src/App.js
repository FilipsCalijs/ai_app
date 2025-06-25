import React from "react";
import "./App.css";
import TopBanner from "./components/TopBanner/TopBanner";
import FrontHero from './components/FrontHero/FrontHero';
import Review from './components/Review/Review';
import HowWork from './components/HowWork/HowWork';
import SliderCompare from './components/SliderCompare/SliderCompare';
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
      <TopBanner />
      <FrontHero />
      <Review />
      <HowWork />
      <SliderCompare />
      <FAQ/>

      
      <Footer/>
   
    </div>
  );
}

export default App;