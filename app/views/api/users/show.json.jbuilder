json.extract! @user, :id, :username, :name, :looking_for, :distance, :age, :gender, :about_me, :aspirations, :talent, :traits, :needs, :hobbies, :created_at, :updated_at, :match_percent 
json.photoUrl url_for(@user.photo)
json.match_percent @match