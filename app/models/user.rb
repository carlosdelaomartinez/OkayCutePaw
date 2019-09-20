# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  name            :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  looking_for     :string
#  distance        :integer
#  age             :integer          not null
#  human           :text
#  gender          :string
#  about_me        :text
#  aspirations     :text
#  talent          :text
#  traits          :text
#  needs           :text
#  hobbies         :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  location        :string           not null
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :age, :location, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  validates_uniqueness_of :username
  has_one_attached :photo

  after_initialize :ensure_session_token
  attr_reader :password

  has_many :answers,
  foreign_key: :user_id,
  class_name: :QuestionAnswer,
  dependent: :destroy

  has_many :questions, 
  through: :answers,
  source: :question

  has_many :distances,
  foreign_key: :user_id,
  class_name: :UserDistance
  
  def self.find_by_creds(username, password) 
    user = User.find_by(username: username)
    user.nil? ? nil : user.valid_password?(password) ? user : nil

  end

  def password=(password)
    @password = password 
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

# For testing
