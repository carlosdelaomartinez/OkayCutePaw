export const fetchQuestions = () => (
  $.ajax({
    method: 'GET',
    url: `api/questions`
  })
);

export const fetchQuestions = (questionId) => (
  $.ajax({
    method: 'GET',
    url: `api/questions/${questionId}`
  })
);