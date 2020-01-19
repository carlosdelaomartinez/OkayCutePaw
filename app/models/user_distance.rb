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

class UserDistance < ApplicationRecord
  validates :user_id, :distant_user_id, :miles, presence: true
  belongs_to :user,
  foreign_key: :distant_user_id,
  class_name: :User
end
