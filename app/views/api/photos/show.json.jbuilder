json.key_format!(:camelize => :lower)

json.(@photo, :id, :user_id, :created_at, :order_id)
json.photo_url @photo.photo(:vertical)
json.photo_grid_url @photo.photo(:grid)
json.photo_large_url @photo.photo(:large)
json.user do
  json.(@photo.user, :id, :username)
  json.profile_pic_url @photo.user.profile_pic(:thumbnail)
end
json.likes @photo.likes do |like|
  json.(like, :id, :user_id)
end
json.likers @photo.likers do |liker|
  json.(liker, :id, :username)
end