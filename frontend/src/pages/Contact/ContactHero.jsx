import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import img2 from "../Home/image.png";

const ContactSection = () => {
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col items-center">
      {/* Top Image Section */}
      <div className="relative h-48 w-full bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={img2}
            alt="Office space"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative flex items-center justify-start pl-10 h-full max-w-6xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold text-white font-ubuntu">
              Contact Us
            </h1>
            <h2 className="text-white pt-3">Get us in Touch here</h2>
          </div>
        </div>
      </div>

      {/* Centered Contact Section */}
      <div className="text-blue-light text-3xl font-medium font-lato my-6 text-center rounded-sm">
        CONTACT WITH US
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 w-full">
          <div>
            <h1 className="text-4xl font-bold mb-8 font-ubuntu text-center md:text-left">
              We Are Best About This Job Solution.
            </h1>
            <Card className="border-0 shadow-none">
              <CardContent className="p-0 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none p-2"
                  />
                  <Input
                    placeholder="Your Email Address"
                    className="border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none p-2"
                  />
                </div>

                <Input
                  placeholder="Subject"
                  className="border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none p-2"
                />

                <Textarea
                  placeholder="Write here your message"
                  className="border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none p-2 min-h-[120px] resize-none"
                />

                <Button className="w-full bg-blue-light hover:bg-blue-dark text-white rounded-lg">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="text-sm text-gray-500 mb-4 text-center md:text-left">
              There are many variations of passages of Lorem Ipsum Facts. There
              are many variations of passages of Lorem Ipsum. Falsify injected
              humour, or randomised covek casing.
            </div>
            <div className="aspect-video bg-blue-100 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Uttar%20Paras%20math%20Near%20kanak%20bhavan%20mandir%20ayodhya%20224123%20uttar%20pradesh+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
