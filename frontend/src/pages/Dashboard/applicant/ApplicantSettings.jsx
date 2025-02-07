import React, { useState } from 'react';
import { 
  Bell, 
  BookmarkCheck, 
  CreditCard, 
  HelpCircle, 
  KeyRound, 
  LifeBuoy, 
  Mail, 
  Phone, 
  Settings, 
  Shield, 
  User, 
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <Card className="w-full mb-6">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-[#1c73c9]" />
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const ApplicantSettings = () => {
  const [activeTab, setActiveTab] = useState("account");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <div className=" bg-[#fbfcfe] p-4 md:p-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-3xl font-bold mb-8 text-[#020a12]">Settings</h1>
        
        {/* Account Settings */}
        <SettingsSection
          icon={User}
          title="Account Settings"
          description="Manage your personal information and account preferences"
        >
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 12345-67890" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <div className="text-sm text-gray-500">Secure your account with 2FA</div>
              </div>
              <Switch />
            </div>
          </div>
        </SettingsSection>

        {/* Job Preferences */}
        <SettingsSection
          icon={Briefcase}
          title="Job Preferences"
          description="Customize your job search preferences"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Preferred Job Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Expected Salary Range</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <Input type="number" placeholder="Minimum" />
                <Input type="number" placeholder="Maximum" />
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          icon={Bell}
          title="Notification Settings"
          description="Control how you receive updates and alerts"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Job Alerts</Label>
                <p className="text-sm text-gray-500">Get notified about new matching jobs</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Application Updates</Label>
                <p className="text-sm text-gray-500">Receive updates about your applications</p>
              </div>
              <Switch />
            </div>
          </div>
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection
          icon={Shield}
          title="Privacy & Security"
          description="Manage your account security and privacy settings"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="connected">
              <AccordionTrigger>Connected Accounts</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      <span>Google Account</span>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SettingsSection>

        {/* Support & Help */}
        <SettingsSection
          icon={LifeBuoy}
          title="Support & Help"
          description="Get help and support for your account"
        >
          <div className="space-y-4">
            <Button className="w-full md:w-auto" variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <p className="text-sm text-gray-500">
              Need help? Our support team is available 24/7 to assist you.
            </p>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
};