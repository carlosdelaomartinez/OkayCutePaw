# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  question   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
  validates :question, presence: true
  has_many :answers,
  foreign_key: :question_id,
  class_name: :QuestionAnswer

  has_many :users,
  through: :answers,
  source: :user
end
