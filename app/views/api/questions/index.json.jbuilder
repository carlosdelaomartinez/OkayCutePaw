@questions.each do |question|
  json.set! question.id do 
    json.extract! question, :id, :question
  end
end