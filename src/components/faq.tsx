/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqData } from "@/utils/data-rewards";

const Faq = () => {
  return (
    <section className="py-24 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl">
            <div className="mb-6 lg:mb-16 flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-5xl text-center font-bold mt-4">
                Frequently Asked Questions
              </h1>
              <p className="text-base md:text-lg max-w-3xl text-center mt-4 text-transparent bg-clip-text leading-relaxed bg-gradient-to-r from-slate-800 to-slate-400">
                Answers to common questions about XFY D-Money.
              </p>
            </div>
            <Accordion type="multiple" defaultValue={["item-0"]}>
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="bg-[#fbfbfb] text-lg p-4 text-center hover:bg-gray-100 transition flex justify-center items-center">
                    <span>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 text-gray-500">
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
};

export default Faq;
