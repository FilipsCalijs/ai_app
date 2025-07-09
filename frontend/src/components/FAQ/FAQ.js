import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: 'What is Undressor?',
    answer: 'Undressor is an AI-powered online tool that digitally removes clothing from images. It uses advanced algorithms to generate high-quality, realistic results.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes. All photo processing is done securely and privately. Your files are not shared — your privacy is our top priority.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Of course! You can test Undressor with a free trial that lets you explore the main features before upgrading to a premium plan.',
  },
  {
    question: 'Which image formats can I upload?',
    answer: 'Undressor supports popular formats like JPG, JPEG, and PNG, ensuring compatibility with almost any image.',
  },
  {
    question: 'Can I use Undressor on mobile?',
    answer: 'Yes, Undressor is fully responsive and works on desktops, tablets, and mobile devices — including iOS and Android.',
  },
  {
    question: 'How much does it cost?',
    answer: 'We offer both free and premium plans. The free version includes basic features, while premium plans unlock full-resolution images, advanced styles, and priority access.',
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
              <p className="p-faq">{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ;
