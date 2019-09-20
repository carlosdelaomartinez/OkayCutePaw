@distances.each do |distance|
  json.set! distance.id do 
    json.extract! distance, :id, :user_id, :distant_user_id, :distance
  end
end

