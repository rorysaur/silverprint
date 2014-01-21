json.key_format!(:camelize => :lower)

json.(@user, :id, :username)
json.profile_pic_url @user.profile_pic(:thumbnail)
json.profile_pic_show_url @user.profile_pic(:show)
json.followers @user.followers do |follower|
  json.(follower, :id)
end
json.following @user.following do |followee|
  json.(followee, :id)
end
json.photos @user.photos do |photo|
  json.(photo, :id, :user_id, :created_at)
  json.photo_url photo.photo(:vertical)
  json.photo_grid_url photo.photo(:grid)
  json.photo_large_url photo.photo(:large)
  json.likes photo.likes do |like|
    json.(like, :id, :photo_id, :user_id)
  end
  json.likers photo.likers do |liker|
    json.(liker, :id, :username)
  end
end
json.follow do
  json.(@follow, :id)
end
  