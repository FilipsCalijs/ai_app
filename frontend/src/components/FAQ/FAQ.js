import React, { useState } from 'react';
import './FAQ.css';
import { useTranslation } from 'react-i18next';

const faqData = (t) => [
  {
    question: t('faq.q1.question'),
    answer: t('faq.q1.answer'),
  },
  {
    question: t('faq.q2.question'),
    answer: t('faq.q2.answer'),
  },
  {
    question: t('faq.q3.question'),
    answer: t('faq.q3.answer'),
  },
  {
    question: t('faq.q4.question'),
    answer: t('faq.q4.answer'),
  },
  {
    question: t('faq.q5.question'),
    answer: t('faq.q5.answer'),
  },
  {
    question: t('faq.q6.question'),
    answer: t('faq.q6.answer'),
  },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      <h2 className="faq-title">{t('faq.title')}</h2>

      <ul className="faq-list">
        {faqData(t).map(({ question, answer }, index) => (
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
