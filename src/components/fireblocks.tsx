/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const useItems = [
  {
    title: "Tokenized Securities",
    description:
      "Enable fractional ownership of traditional assets like stocks and bonds, increasing accessibility and liquidity.",
  },
  {
    title: "Real Estate Tokens",
    description:
      "Facilitate fractional ownership of properties, lowering barriers to entry in real estate investment.",
  },
  {
    title: "Loyalty Programs",
    description:
      "Create blockchain-based loyalty tokens, enhancing customer engagement and providing more flexible rewards.",
  },
  {
    title: "Carbon Credits",
    description:
      "Tokenize carbon offsets, making them more tradable and verifiable on the blockchain.",
  },
];

export default function FireblocksScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
            if (index === useItems.length - 1) {
              setIsScrollComplete(true);
            }
          }
        },
        { threshold: 0.5 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        setIsScrollComplete(true);
        return;
      }

      event.preventDefault();
      scrollContainerRef.current.scrollTop += event.deltaY;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-y-auto scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onWheel={handleScroll}
    >
      <div className="md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-600">
          DIVERSE TOKENIZATION USE CASES SUPPORTED
        </h2>
        <h3 className="text-2xl font-semibold mb-6">
          Expanding accessibility and loyalty
        </h3>
        <div className="space-y-16">
          {useItems.map((item, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[index] = el;
              }}
              className="py-8"
            >
              <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 h-screen sticky top-0">
        <div className="h-full flex items-center justify-center bg-gray-200">
          <motion.div
            className="w-64 h-64 bg-blue-500 rounded-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
}
