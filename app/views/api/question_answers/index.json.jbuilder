@answers.each do |answer|
  json.set! answer.id do 
    json.extract! answer, :id, :question_id, :user_id
  end
end