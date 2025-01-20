import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="md:grid md:grid-cols-2 md:gap-12">
        {/* Left Column - Title Section */}
        <div className="mb-8 md:mb-0">
          <div className="text-primary-light font-medium mb-2 font-lato uppercase tracking-wide">
            WHY CHOOSE US?
          </div>
          <h2 className="text-4xl font-bold text-gray-900 font-ubuntu leading-tight">
            We've been helping<br />
            customer globally
          </h2>
        </div>

        {/* Right Column - Accordion Section */}
        <div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline data-[state=open]:text-primary-600">
                <span className="text-left font-medium font-lato">
                  Can I apply for a job listing?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 font-lato">
                Dramatically disseminate real-time portals rather than on top-line action items.
                Uniquely provide access to low-risk high-yield products of without dynamic and
                products re-engineer low-risk high-yield.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline data-[state=open]:text-primary-600">
                <span className="text-left font-medium font-lato">
                  Can I apply for multiple job listings?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 font-lato">
                Yes, you can apply for multiple job listings. We encourage candidates to apply
                for any positions that match their skills and experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline data-[state=open]:text-primary-600">
                <span className="text-left font-medium font-lato">
                  Can I get feedback on my job application?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 font-lato">
                We provide feedback on applications when possible. The timeline and detail of feedback
                may vary depending on the position and volume of applications.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;