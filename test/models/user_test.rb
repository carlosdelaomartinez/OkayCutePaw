# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  username           :string           not null
#  name               :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  looking_for        :string
#  distance           :integer
#  question_answer_id :integer
#  age                :integer          not null
#  human              :text
#  gender             :string
#  about_me           :text
#  aspirations        :text
#  talent             :text
#  traits             :text
#  needs              :text
#  hobbies            :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  location           :string           not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
