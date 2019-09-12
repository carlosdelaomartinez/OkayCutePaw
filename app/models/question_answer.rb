# == Schema Information
#
# Table name: question_answers
#
#  id          :bigint           not null, primary key
#  question_id :integer          not null
#  answer      :boolean          not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class QuestionAnswer < ApplicationRecord
  validates :question_id, :user_id, presence: true
  validates :answer, inclusion: {in: [true, false]}


  belongs_to :question, 
  foreign_key: :question_id,
  class_name: :Question

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User
end
