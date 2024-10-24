"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { features } from "@/utils/data-rewards";

export default function FeaturesAndBenefits() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl text-center font-bold mt-4">
          Features & Benefits
        </h1>
        <p className="text-base md:text-lg max-w-3xl text-center pb-6 mt-4 text-transparent bg-clip-text leading-relaxed bg-gradient-to-r from-slate-800 to-slate-400">
          Discover the key features and benefits of XFY D-Money.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer perspective"
            onClick={() => handleCardClick(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={flippedCards.includes(index)}
          >
            <div
              className={`absolute inset-0 transition-all duration-500 preserve-3d ${
                flippedCards.includes(index) ? "" : ""
              }`}
            >
              <Card className="inset-0 flex flex-col justify-center items-center p-4 backface-hidden">
                <CardHeader className="p-0 mb-2 border-0">
                  <feature.icon className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.shortDescription}
                  </p>
                </CardContent>
              </Card>
              <Card className="h-40 md:h-60 inset-0 flex items-center justify-center p-4 backface-hidden rotate-y-180 bg-primary text-primary-foreground">
                <CardContent className="p-0 text-center">
                  <p className="text-sm">{feature.fullDescription}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
