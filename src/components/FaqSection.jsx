"use client";
import React, { useState } from 'react';

const FaqSection = () => {
  const [showAnswers, setShowAnswers] = useState(Array(faqItems.length).fill(false));

  const toggleAnswer = (index) => {
    setShowAnswers((prevShowAnswers) => {
      const newShowAnswers = [...prevShowAnswers];
      newShowAnswers[index] = !newShowAnswers[index];
      return newShowAnswers;
    });
  };

  return (
    <section className="dark:bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-center text-4xl font-semibold text-white">Frequently asked questions</h1>

        <div className="mt-12 space-y-8">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg bg-pink-10">
              <button onClick={() => toggleAnswer(index)} className="flex w-full items-center justify-between p-2 lg:p-8 ">
                <h1 className="font-semibold text-white">{item.question}</h1>

                <span className={`rounded-full ${item.buttonColor} text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${showAnswers[index] ? 'minus-icon' : 'plus-icon'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d={showAnswers[index] ? "M5 12h14" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                  </svg>
                </span>
              </button>

              <hr className="border-pink-10 dark:border-gray-700" />

              {showAnswers[index] && (
                <p className="p-8 text-sm border-white">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const faqItems = [
  {
    question: "What is Contemeleon?",
    answer:
      "Contemeleon is a state-of-the-art Web5 and AI-powered platform designed to simplify content repurposing. It allows creators to effortlessly convert articles and posts into various formats suitable for LinkedIn, Twitter, IG, TikTok, and YouTube Shorts.",
    buttonColor: "border-white",
  },
  {
    question: "How does Contemeleon save time in content creation?",
    answer:
      "Contemeleon leverages AI to automate various aspects of content repurposing, generating alternative formats, summaries, or adaptations of existing content. This automation streamlines the creative process, letting you focus on producing high-quality content without the time-consuming effort.",
    buttonColor: "border-white",
  },
  {
    question: "Can Contemeleon handle different content types?",
    answer:
      "Totally! It can repurpose a variety of textual content types, ensuring a dynamic and engaging presence across multiple platforms.",
    buttonColor: "border-white",
  },
  {
    question:
      "What is Web5 technology, and how does it enhance the Contemeleon experience?",
    answer:
      "Web5 is the latest generation of the World Wide Web, emphasizing improved connectivity and intelligent data interaction. Contemeleon's integration with Web5 ensures a seamless onboarding experience and secure access to your content, adding an extra layer of reliability to your creative journey.",
    buttonColor: "border-white",
  },
  {
    question: "Is Contemeleon suitable for all levels of content creators?",
    answer:
      "Absolutely! Contemeleon is designed to cater to a wide range of creators, from beginners to experienced professionals. Whether you're an individual blogger, a small business owner, or a seasoned content creator, Contemeleon adapts to your needs.",
    buttonColor: "border-white",
  },
  {
    question: "Can I customize the repurposed content for different platforms?",
    answer:
      "Yes, indeed! Contemeleon provides customization options, allowing you to tailor the repurposed content for each platform's unique requirements. Whether it's character limits, visual elements, or tone, you have the flexibility to make adjustments.",
    buttonColor: "border-white",
  },
  {
    question: "How secure is my content on Contemeleon?",
    answer:
      "We take security seriously. Contemeleon employs robust measures to ensure the safety of your content. Our integration with Web5 technology not only enhances functionality but also prioritizes the security of your data.",
    buttonColor: "border-white",
  },
  {
    question: "How can I get started with Contemeleon?",
    answer:
      "Getting started is easy! Simply sign up on our platform, follow the intuitive onboarding process, and start transforming your content. Our user-friendly interface ensures a smooth experience for creators of all levels.",
    buttonColor: "border-white",
  },
  {
    question:
      "What support options are available if I have questions or issues?",
    answer:
      "We're here for you! Contemeleon offers dedicated customer support to assist you with any questions or issues. Reach out to us via our support email, and our team will promptly address your concerns.",
    buttonColor: "border-white",
  },
];

export default FaqSection;
