
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



