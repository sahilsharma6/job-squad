import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Clock,
    Briefcase,
    DollarSign,
    Star,
    ArrowRight,
    CheckCircle,
    Building2,
    Calendar,
    Facebook,
    Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ApplyNowButton from '@/components/ApplyNowButton';

const JobDetailsPage = ({job}) => {
    return (
        <div className="w-full">
            <div className='p-4 sm:p-7 border border-grey-muted/30 rounded-lg'>
                {/* Header */}
                <div className="flex flex-col mb-6">
                    <div className='flex flex-col sm:flex-row justify-between w-full gap-4'>
                        <div className='flex-grow'>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{job?.title}</h1>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-grey-muted">
                                <div className="flex items-center gap-2">
                                    <Briefcase className='w-4 h-4' />
                                    <h1>{job?.jobType}</h1>
                                </div>
                                <div className="flex items-center gap-2 sm:ml-4">
                                    <Clock className='w-4 h-4' />
                                    <h1>{job?.timeAgo}</h1>
                                </div>
                            </div>
                        </div>
                        <ApplyNowButton isModal={true} job={job} />
                    </div>
                    <Separator className="my-4" />
                    <div className='w-full h-auto max-h-[500px]'>
                        <img 
                            src="https://images.squarespace-cdn.com/content/v1/6348398d9d21fd6277c64f96/1690311572717-5BBW03AE2BTLF2I4OI45/hackman+team+factors+article.png?format=500w" 
                            alt={job?.title} 
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Overview Grid */}
                <div className='p-4 sm:p-7 border rounded-lg mb-10'>
                    <h1 className='text-xl font-semibold text-primary-black mb-2'>Overview</h1>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-y-6">
                        {[
                            { 
                                icon: <Building2 className="w-5 h-5 text-gray-400" />, 
                                label: "Industry", 
                                value: job?.industry 
                            },
                            { 
                                icon: <DollarSign className="w-5 h-5 text-gray-400" />, 
                                label: "Salary", 
                                value: job?.salary 
                            },
                            { 
                                icon: <Briefcase className="w-5 h-5 text-gray-400" />, 
                                label: "Job Type", 
                                value: job?.jobType 
                            },
                            { 
                                icon: <Clock className="w-5 h-5 text-gray-400" />, 
                                label: "Experience", 
                                value: job?.experience 
                            },
                            { 
                                icon: <Calendar className="w-5 h-5 text-gray-400" />, 
                                label: "Updated", 
                                value: job?.updated 
                            },
                            { 
                                icon: <MapPin className="w-5 h-5 text-gray-400" />, 
                                label: "Location", 
                                value: "Dallas, Texas Remote Friendly" 
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                {item.icon}
                                <div>
                                    <div className="text-sm text-gray-500">{item.label}</div>
                                    <div className="font-medium">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-8">
                    {[
                        {
                            title: "Welcome to AliStudio Team",
                            content: job?.description,
                            type: 'paragraph'
                        },
                        {
                            title: "Essential Knowledge, Skills, and Experience",
                            content: job?.requirements,
                            type: 'list'
                        },
                        {
                            title: "Preferred Experience",
                            content: job?.preferredExperience,
                            type: 'list'
                        },
                        {
                            title: "Product Designer",
                            content: job?.productDesigner,
                            type: 'details'
                        }
                    ].map((section, index) => (
                        <section key={index}>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            {section.type === 'paragraph' && (
                                <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                            )}
                            {section.type === 'list' && (
                                <ul className="space-y-2">
                                    {section.content?.map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-gray-600">
                                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-600 mt-2" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.type === 'details' && (
                                <div className="space-y-4">
                                    {Object.entries(section.content || {}).map(([key, value], idx) => (
                                        <div key={idx}>
                                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                            <span className="text-gray-600">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                        <span className="text-sm text-gray-500 mb-2 sm:mb-0">Share this</span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            {/* Add other share buttons as needed */}
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 w-full sm:justify-end'>
                        <Button variant="outlineSecondary" className="w-full sm:w-auto mb-2 sm:mb-0">Save this job</Button>
                        <ApplyNowButton isModal={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetailsPage;