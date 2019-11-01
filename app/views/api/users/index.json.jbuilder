@users.each do |user|
  json.set! user.id do
    json.extract! user, 
      :id, 
      :username, 
      :name, 
      :looking_for, 
      :distance, 
      :age, 
      :gender, 
      :about_me, 
      :aspirations, 
      :talent, 
      :traits, 
      :needs, 
      :hobbies, 
      :created_at, 
      :updated_at, 
      :location,
      :looking_age_lower,
      :looking_age_higher
    json.match_percent @matches[user.id]
    json.photoUrl url_for(user.photo)
  end
end

