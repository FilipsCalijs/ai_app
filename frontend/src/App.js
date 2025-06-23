import React from "react";
import "./App.css";
import TopBanner from "./components/TopBanner/TopBanner";
import FrontHero from './components/FrontHero/FrontHero';
import Review from './components/Review/Review';
import HowWork from './components/HowWork/HowWork';
import ImageCompareAuto from './components/ImageCompareAuto/ImageCompareAuto'
function App() {
  return (
    <div>
      <div style={{ display: "" }}>
        <TopBanner />
      </div>
      <FrontHero />
      
      <Review/>
      <HowWork/>
      <ImageCompareAuto />

      <div style={{ padding: "20px" }}>
        <h1>Welcome to my site</h1>
      </div>
    </div>
  );
}

export default App;
{/* <div class="elementor-widget-container">
<div class="e-hosted-video elementor-wrapper elementor-open-inline">
<video class="elementor-video" src="https://clothoff.info/wp-content/uploads/2025/06/video_undress-ai.mp4" autoplay="" loop="" muted="muted" playsinline="" controlslist="nodownload"></video>
</div>
</div>
</div>

что это такое и как это сделать на своем сайте */}