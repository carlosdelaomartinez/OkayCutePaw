class Api::QuestionsController < ApplicationController

  def show
    @question = Question.where('id NOT IN ?', QuestionAnswer.where('user_id IS NOT ?', current_user.id))
  end

  def index

  end
end

# QuestionAnswer.where(user_id: 100).pluck(:question_id)