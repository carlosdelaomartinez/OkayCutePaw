
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

export const createQuestionAnswer = (userId, questionAnswer) => (
  $.ajax({
    method: 'POST',
    url: `api/users/${userId}`,
    data: questionAnswer
  })
);

export const updateQuestionAnswer = (questionAnswer) => (
  $.ajax({
    method: 'POST',
    url: `api/users/${questionAnswer.userId}/question_answers/`,
    data: questionAnswer
  })
);


