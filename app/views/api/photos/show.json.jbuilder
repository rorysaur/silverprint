json.key_format!(:camelize => :lower)

json.(@photo, :id, :user_id, :created_at)
json.photo_url @photo.photo(:normal)
json.user do
  json.(@photo.user, :id, :username)
  json.profile_pic_url @photo.user.profile_pic(:thumbnail)
end