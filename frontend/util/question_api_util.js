export const fetchQuestions = () => (
  $.ajax({
    method: 'GET',
    url: `api/questions`
  })
);

export const fetchQuestion = (questionId) => (
  $.ajax({
    method: 'GET',
    url: `api/questions/${questionId}`
  })
);