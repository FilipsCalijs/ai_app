import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: 'What is Undress AI?',
    answer: 'Undress AI is an online tool that allows you to remove clothes from photos and videos using AI technology.',
  },
  {
    question: 'Is it safe to use?',
    answer: 'Yes, your privacy is our priority. All processing happens securely and your data is not shared.',
  },
  {
    question: 'Can I try it for free?',
    answer: 'Absolutely! We offer a free trial so you can test the features before purchasing.',
  },
  {
    question: 'Which file formats are supported?',
    answer: 'We support common image formats like JPG, PNG, and popular video formats such as MP4.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqData.map(({ question, answer }, index) => (
          <li key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleIndex(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {question}
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`faq-answer ${openIndex === index ? 'open' : ''}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              style={{ maxHeight: openIndex === index ? '500px' : '0' }}
            >
              <p className='p-faq'>{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ;