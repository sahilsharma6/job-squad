import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Loader2, Upload } from "lucide-react"
import { Progress } from "./ui/progress"

const ApplyNowButton = ({ job }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({})
    const [currentStep, setCurrentStep] = useState(0)

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    }

    const handleSubmit = () => {
        setIsSubmitting(true)
        // Simulate backend process
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
        }, 2000)
    }

    const renderQuestionField = (question) => {
        const { type, label, fieldName } = question

        switch (type) {
            case "text":
                return (
                    <div className="space-y-2">
                        <label htmlFor={fieldName} className="text-sm font-medium text-primary-black">{label}</label>

                        <Input
                            id={fieldName}
                            type="text"
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="border-primary-ultra focus:ring-primary-light"
                            value={formData[fieldName] || ""}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        />
                    </div>
                )
            case "textarea":
                return (
                    <div className="space-y-2">
                        <label htmlFor={fieldName} className="text-sm font-medium text-primary-black">{label}</label>
                        <Textarea
                            id={fieldName}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="border-primary-ultra focus:ring-primary-light"
                            value={formData[fieldName] || ""}
                            onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        />
                    </div>
                )
            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={fieldName}
                            checked={formData[fieldName] || false}
                            className="border-primary-dark"
                            onCheckedChange={(checked) => handleInputChange(fieldName, checked)}
                        />
                        <label htmlFor={fieldName} className="text-sm">
                            {label}
                        </label>
                    </div>
                )
            case 'radio':
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary-black">{label}</label>
                        <RadioGroup
                            value={formData[fieldName] || ''}
                            onValueChange={(value) => handleInputChange(fieldName, value)}
                        >
                            {question.options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        id={option.value}
                                        value={option.value}
                                        className="border-primary-dark"
                                    />
                                    <label htmlFor={option.value} className="text-sm">{option.label}</label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                );
            default:
                return null
        }
    }

    const totalSteps = job?.questions ? Math.ceil(job.questions.length / 3) + 1 : 1

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary-light hover:bg-primary-dark transition-colors duration-200 w-full sm:w-auto">
                    Apply Now
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl ">
                <h1>
                    <span className="text-2xl font-bold">{job?.title}</span>
                </h1>
                <Separator />
                <AnimatePresence mode="wait">
                    {!isSuccess && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className=""
                        >
                            <Progress value={(currentStep / (totalSteps - 1)) * 100} className="w-full" />

                            <div className="overflow-y-auto px-4 py-4 space-y-6">
                                {job?.questions?.slice(currentStep * 3, (currentStep + 1) * 3).map((question, index) => (
                                    <React.Fragment key={index}>{renderQuestionField(question)}</React.Fragment>
                                ))}

                                {currentStep === totalSteps - 1 && (
                                    <div className="space-y-2">
                                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                                            Upload Resume
                                        </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="resume"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, DOCX (MAX. 5MB)</p>
                                                </div>
                                                <Input
                                                    id="resume"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleInputChange("resume", e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between space-x-2 mt-4">
                                {currentStep > 0 && (
                                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                                        Previous
                                    </Button>
                                )}
                                {currentStep < totalSteps - 1 ? (
                                    <Button onClick={() => setCurrentStep(currentStep + 1)} className="ml-auto">
                                        Next
                                    </Button>
                                ) : (
                                    <Button onClick={handleSubmit} disabled={isSubmitting} className="ml-auto">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                                            </>
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {isSuccess && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="text-center space-y-4 py-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                            >
                                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-green-600">Application Submitted!</h2>
                            <p className="text-gray-600">We'll review your application and get back to you soon.</p>
                            <Button
                                onClick={() => {
                                    setIsOpen(false)
                                    setIsSuccess(false)
                                    setCurrentStep(0)
                                }}
                            >
                                Close
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}

export default ApplyNowButton

