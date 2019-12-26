# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

Cities = [
  'San Bernadino, CA',
  'Los Angeles, CA',
  'Alameda, CA',
  'Albany, CA',
  'Adelanto, CA',
  'Agoura Hills, CA',
  'Alhambra, CA',
  'Aliso Viejo, CA',
  'Amador City, CA',
  'American Canyon, CA',
  'Anaheim, CA',
  'Artesia, CA', 
  'Arcadia, CA',
  'Antioch, CA',
  'Concord, CA',
  'El Cerrito, CA',
  'Hercules, CA',
  'San Pablo, CA',
  'Richmond, CA', 
  'Novato, CA',
  'San Anselmo, CA',
  'Napa, CA',
  'Sacramento, CA',
  'Half Moon Bay, CA',
  'Menlo Park, CA',
  'Daily city, CA',
  'San Francisco, CA',
  'San Diego, CA',
  'Lodi, CA',
  'Stockton, CA',
  'Manteca, CA',
  'Chino Hills, CA',
  'Martinez, CA',
  'San Francisco, CA',
  'Foster City, CA',
  'Pacifica, CA',
  'San Bruno, CA',
  'San Mateo, CA',
  'South San Francisco, CA',
  'Millbrae, CA',
  'Hillsborough, CA',
  'Burlingame, CA',
  'Brisbane, CA',
  'Berkeley, CA',
  'San Marcos, CA',
  'Vista, CA',
  'Imperial Beach, CA',
  'Escondido, CA',
  'Novato, CA',
  'San Francisco, CA'
]

questions = [
  'Do you like to walk?',
  'Do you like food?',
  'Do you run?',
  'Is the capital of California, Sacramento?',
  'Do you like throwing objects?',
  'Do you like sharing food?',
  'Will you provide a loving home?',
  'Will you provide good pats?',
  'Do you go to the park often?',
  'Do you wake up early?',
  'Are you active in the morning?',
  'Are you active in the evening?',
  'Do you follow a regular routine?',
  'Are tomatoes considered a fruit?',
  'Do you even Merge Sort?',
  'Can you code and play fetch?',
  'Do you like sunshine?',
  'Do you enjoy evening walks?',
  'Do you enjoy going to the beach?',
  'Do you like hiking?',
  'Are you a bookworm?',
  'Do you enjoy spending the day indoors?',
  'Do you like camping?',
  'Do you go for morning runs?',
  'Do you like sunshine?',
  'Do you enjoy the rain?',
  'Do you already have dogs?',
  'Do you have cats?',
  'Do you like quiet spaces?',
  'Do you enjoy loud spaces?',
  'Can you provide a consistent grooming routine?',
  'Do you know how to binary search?',
  'Are you okay with messes?',
  'Can you provide dog training?',
  'Are Corgis shaped like a loaf of bread?',
  'Do you often drop food on the floor?',
  'Do you handle accidents well?',
  'Do you have guests over frequently?',
  'Are you a dog person?',
  'Are you a dog-person?',
  'Do you like apples?',
  'Do you like carrots?',
  'Are you having a good day?',
  'Could you be having a better day?',
  'Do you chase squirrels?',
  'Do you enjoy thrills?',
  'Are dogs the best?',
  'Do you enjoy visits to the Veterinary?',
  'Does your work place allow Dogs?',
  'Are you employed?',
  'Do you have ample free time?',
  'Do you like the smell of freshly cut grass?',
  'Do you take time to smell the flowers?',
  'Are you a sightseer?',
  'Do you live near fire-hydrants?',
  'Do you enjoy barking?',
  'Do you frequent dog-parks?',
  'Are you prepared for a good time?',
  'Do you lounge around the house?'
  
]

ActiveRecord::Base.transaction do 
  User.destroy_all
  Question.destroy_all
  QuestionAnswer.destroy_all
  
  2.times do 
    50.times do |i|
      u = User.create!({
        username: Faker::Internet.username(specifier: 15),
        password: Faker::Internet.password(min_length: 6),
        looking_for: (["MALE", "FEMALE", "ALL"][rand(3)]),
        distance: 5,
        age: rand(1...16),
        looking_age_lower: 1,
        looking_age_higher: rand(2...16),
        human: Faker::FunnyName.name,
        name: Faker::Creature::Dog.name,
        gender: ["MALE", "FEMALE"][rand(2)],
        about_me: Faker::Creature::Dog.meme_phrase,
        aspirations: Faker::Creature::Dog.sound,
        talent: Faker::Job.key_skill,
        traits: Faker::Creature::Dog.breed,
        needs: Faker::Lorem.paragraph,
        hobbies: Faker::Lorem.paragraph,
        location: Cities[i]
      })
      puts "#{i}.jpg"
      u.photo.attach(io: open("https://okaycutepaw-seeds.s3-us-west-1.amazonaws.com/#{i}.jpg"), filename: "#{i}.jpg")
    end
  end
  
  questions.each do |question|
          q = Question.create!({question: question})
  end

  User.all.each do |user|
    Question.all.each do |question|
      qa = QuestionAnswer.create!({question_id: question.id, answer: Faker::Boolean.boolean, user_id: user.id})
    end
  end
  

  demo = User.create!({
      username: 'thoreo',
      password: '123456',
      looking_for: 'ALL',
      distance: 5,
      age: rand(1...16),
      human: Faker::FunnyName.name,
      name: 'Thor',
      looking_age_lower: 1,
      looking_age_higher: 16,
      gender: "MALE",
      about_me: Faker::Creature::Dog.meme_phrase,
      aspirations: Faker::Creature::Dog.sound,
      talent: Faker::Job.key_skill,
      traits: Faker::Creature::Dog.breed,
      needs: Faker::Lorem.sentences(number: 4),
      hobbies: Faker::Lorem.sentences(number: 4),
      location: 'San Pablo, CA'
    })
  demo.photo.attach(io: open("https://okaycutepaw-seeds.s3-us-west-1.amazonaws.com/demo.jpg"), filename: "demo.jpg")
  
end



