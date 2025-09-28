"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";

const faqItems = [
  {
    id: "item-1",
    question: "What is RAIT ACM SIGAI?",
    answer: "RAIT ACM SIGAI is a specialized committee within RAIT focused on promoting knowledge and research in Artificial Intelligence (AI). It aims to provide resources, workshops, and events to help students and professionals enhance their understanding and skills in AI.",
  },
  {
    id: "item-2",
    question: "How can I join RAIT ACM SIGAI?",
    answer: "You can join RAIT ACM SIGAI by purchasing the international membership at https://www.acm.org/membership/join.",
  },
  {
    id: "item-3",
    question: "What kind of events does RAIT ACM SIGAI organize?",
    answer: "RAIT ACM SIGAI organizes a variety of events, including workshops, seminars, hackathons, guest lectures, and study groups. These events cover a wide range of topics in Artificial Intelligence, from beginner to advanced levels.",
  },
  {
    id: "item-4",
    question: "Do I need any prior knowledge of AI to join RAIT ACM SIGAI?",
    answer: "No prior knowledge of AI is required to join RAIT ACM SIGAI. We offer events and resources for all skill levels, from beginners to advanced practitioners. Our goal is to make AI accessible to everyone.",
  },
  {
    id: "item-5",
    question: "How is RAIT ACM SIGAI different from the other two chapters?",
    answer: "RAIT ACM SIGAI is a specialized committee within RAIT focused on promoting knowledge and research in Artificial Intelligence (AI). It aims to provide resources, workshops, and events to help students and professionals enhance their understanding and skills in AI.",
  },
];

export default function FaqSection() {
  return (
    <section id="faqs" className="bg-black text-white py-20 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-zinc-500" />
              <h4 className="text-base font-medium text-text-secondary">Questions</h4>
            </div>
            <h2 className="text-4xl lg:text-[40px] font-bold mt-4 leading-tight">
              Frequently Asked <span className="text-zinc-400">Questions</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              type="single"
              className="w-full space-y-4"
              defaultValue="item-1"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-card border border-border rounded-2xl group"
                >
                  <AccordionTrigger className="text-left text-lg font-medium p-6 hover:no-underline [&>svg]:hidden">
                    <div className="flex items-center justify-between w-full">
                      <span className="flex-1 pr-4">{item.question}</span>
                      <div className="bg-white/10 rounded-full flex-shrink-0 h-9 w-9 flex items-center justify-center">
                        <Plus className="h-5 w-5 block group-data-[state=open]:hidden" />
                        <Minus className="h-5 w-5 hidden group-data-[state=open]:block" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-text-secondary text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}