# == Schema Information
#
# Table name: user_distances
#
#  id              :bigint           not null, primary key
#  user_id         :integer
#  distant_user_id :integer          not null
#  distance        :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class UserDistanceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
