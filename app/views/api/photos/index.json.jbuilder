json.photos @photos do |photo|
  json.(photo, :id, :user_id, :created_at)
  json.photo_url photo.photo(:normal)
end