export default function AnswerValidation(jobQuestions,jobAnswers) {
    const errors = {};
    jobQuestions.forEach((question) => {
        const { fieldName, required, type, options } = question;
        const answer = jobAnswers[fieldName];
        // Check if the field is required
        if (required && (answer === undefined || answer === null || answer === "")) {
            errors[fieldName] = `${question.label} is required.`;
        } else {
            // Validate based on type
            if (type === "text") {
                // For text fields, check if the value is empty or not
                if (answer.trim() === "") {
                    errors[fieldName] = `${question.label} must not be empty.`;
                } else if (fieldName === "yearsExperience" && isNaN(answer)) {
                    // Specific validation for yearsExperience
                    errors[fieldName] = `${question.label} must be a number.`;
                }
            } else if (type === "textarea") {
                // For textarea, just check if it's empty
                if (answer.trim() === "") {
                    errors[fieldName] = `${question.label} must not be empty.`;
                }
            } else if (type === "checkbox") {
                // Check if checkbox is required and not checked
                if (required && !answer) {
                    errors[fieldName] = `${question.label} must be checked.`;
                }
            } else if (type === "radio") {
                // For radio buttons, check if an option is selected
                if (required && (!answer || !options.some(option => option.value === answer))) {
                    errors[fieldName] = `${question.label} must select an option.`;
                }
            }
        }
    });
    return errors;
}