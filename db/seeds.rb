# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


ActiveRecord::Base.transaction do 

  50.times do |i|
   u = User.create!({
      username: Faker::Internet.username(specifier: 15),
      password: Faker::Internet.password(min_length: 6),
      looking_for: 'dog',
      distance: 5,
      age: Faker::Number.number(digits: 2),
      human: Faker::FunnyName.name,
      name: Faker::Creature::Dog.name,
      gender: Faker::Creature::Dog.gender,
      about_me: Faker::Creature::Dog.meme_phrase,
      aspirations: Faker::Creature::Dog.sound,
      talent: Faker::Job.key_skill,
      traits: Faker::Creature::Dog.breed,
      needs: Faker::Lorem.sentences(number: 4),
      hobbies: Faker::Lorem.sentences(number: 4),
      location: Faker::Address.zip
    })
  q = Question.create!({question: Faker::Lorem.question })
  
  end
  User.all.each do |user|
    Question.all.each do |question|
      qa = QuestionAnswer.create!({question_id: question.id, answer: Faker::Boolean.boolean, user_id: user.id})
    end
  end
end
