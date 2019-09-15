class Api::QuestionsController < ApplicationController

  def show
    @question = Question.find(params[:id])
    render :show
  end
  
  #show all questions
  #match up all answers to all questions, if user hasn't answers, give option to create a new one
  #will have to filter all questions that have not been answerd
  def index
    @questions = Question.all
    render :index
  end
end

# QuestionAnswer.where(user_id: 100).pluck(:question_id)
# Question.joins(:users).where.not(:users => {id: 100})
# Question.joins(:users).where(:users => {id: 101}) 
# Question.joins(:users).where.not(:users => {id: 101}).count