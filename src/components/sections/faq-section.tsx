"use client";

import { useState } from 'react';
import { Minus, Plus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqs = [
    {
      question: "What is RAIT ACM SIGAI Student Chapter?",
      answer: "RAIT ACM SIGAI Student Chapter is a specialized committee within RAIT focused on promoting knowledge and research in Artificial Intelligence (AI). It aims to provide resources, workshops, and events to help students and professionals enhance their understanding and skills in AI.",
    },
    {
      question: "How can I join RAIT ACM SIGAI Student Chapter?",
      answer: "You can join RAIT ACM SIGAI Student Chapter by purchasing the international membership at https://www.acm.org/membership/join.",
    },
    {
      question: "What kind of events does RAIT ACM SIGAI Student Chapter organize?",
      answer: "RAIT ACM SIGAI Student Chapter organizes a variety of events, including workshops, seminars, hackathons, guest lectures, and study groups. These events cover a wide range of topics in Artificial Intelligence, from beginner to advanced levels.",
    },
    {
      question: "Do I need any prior knowledge of AI to join RAIT ACM SIGAI Student Chapter?",
      answer: "No prior knowledge of AI is required to join RAIT ACM SIGAI Student Chapter. We offer events and resources for all skill levels, from beginners to advanced practitioners. Our goal is to make AI accessible to everyone.",
    },
    {
      question: "How is RAIT ACM SIGAI Student Chapter different from the other two chapters?",
      answer: "RAIT ACM SIGAI Student Chapter is a specialized committee within RAIT focused on promoting knowledge and research in Artificial Intelligence (AI). It aims to provide resources, workshops, and events to help students and professionals enhance their understanding and skills in AI.",
    },
  ];

  return (
    <section id="faqs" className="bg-black text-white py-20 lg:py-32">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-zinc-500"></span>
              <h4 className="text-base font-medium text-zinc-400">Questions</h4>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight">
              Frequently Asked <span className="text-zinc-400">Questions</span>
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  className="flex w-full items-center justify-between p-6 text-left text-lg font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <div className="bg-white/10 rounded-full h-9 w-9 flex-shrink-0 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-zinc-300 text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;