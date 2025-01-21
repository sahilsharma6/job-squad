export default function QuestionValidation(jobQuestions,jobAnswers) {
let errors = [];
    jobQuestions.forEach((question,index) => {
        if(question.required && !jobAnswers[index]){
            errors.push({message:question.question+" is required",question:question.question});
            
        }
    });
       return errors;
}