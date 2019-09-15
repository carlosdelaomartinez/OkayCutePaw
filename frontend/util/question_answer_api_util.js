
export const fetchQuestionAnswers = (userId) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/question_answers`
  })
);

export const fetchQuestionAnswer = (userId, questionId) => (
  $.ajax({
    method: 'GET',
    url: `api/users/${userId}/question_answers/${questionId}`
  })
);

export const createQuestionAnswer = (questionAnswer) => (
  $.ajax({
    method: 'POST',
    url: `api/users/${questionAnswer.user_id}/question_answers`,
    data:  {question_answer: questionAnswer}
  })
);

export const updateQuestionAnswer = (questionAnswer) => (
  $.ajax({
    method: 'PATCH',
    url: `api/users/${questionAnswer.user_id}/question_answers/${questionAnswer.question_id}`,
    data: {question_answer: questionAnswer}
  })
);


