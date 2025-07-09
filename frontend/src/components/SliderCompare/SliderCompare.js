import React, { useEffect, useRef } from 'react';
import ImageCompareAuto from '../ImageCompareAuto/ImageCompareAuto';
import '../ImageCompareAuto/ImageCompareAuto.css';
import './SliderCompare.css';

const slides = [
  { id: 'slide-1', before: '/slide/before.png', after: '/slide/after.png' },
  { id: 'slide-2', before: '/slide/before2.png', after: '/slide/after2.png' },
  { id: 'slide-3', before: '/slide/before3.png', after: '/slide/after3.png' },
];

const SliderCompare = () => {
  const sliderRef = useRef(null);
  const slideCount = slides.length;
  const intervalTime = 5000; // 5 секунд

  useEffect(() => {
    const slider = sliderRef.current;
    let currentIndex = 0;

    const scrollToSlide = (index) => {
      if (!slider) return;
      const slideWidth = slider.clientWidth;
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    };

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      scrollToSlide(currentIndex);
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [slideCount]);

  return (
    <div style={{backgroundColor:''}}>
    <section className="container">
      <div className="content-wrapper">
        {/* Текстовая часть */}
        <div className="text-content">
          <h2 className="title">
            How <span>does it</span><br/>  work?
          </h2>
          <p className="description">
          Undressor uses AI to analyze the image you upload. The system detects body shape, clothing layers, and background details. Based on this data, it creates a realistic version of the photo without clothes. 
          </p>
          <a class="glow-button" href="https://t.me/TestBeta123bot" target="_blank" rel="noopener noreferrer">Try for free</a>

        </div>

        {/* Слайдер */}
        <div className="slider-wrapper">
          <div className="slider" id="slider" ref={sliderRef}>
            {slides.map(({ id, before, after }) => (
              <div key={id} id={id} className="slide">
                <ImageCompareAuto beforeSrc={before} afterSrc={after} />
              </div>
            ))}
          </div>
          <div className="slider-nav">
            {slides.map(({ id }, index) => (
              <a
                key={id}
                href={`#${id}`}
                aria-label={`Go to ${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({
                      left: sliderRef.current.clientWidth * index,
                      behavior: 'smooth',
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default SliderCompare;