json.key_format!(:camelize => :lower)

json.set! :user do
  json.(@user, :id, :username)
  json.profile_pic_url @user.profile_pic(:thumbnail)
  
  json.likes @user.likes do |like|
    json.(like, :id, :photo_id, :user_id)
  end
  
  json.liked_photos @user.liked_photos do |liked_photo|
    json.(liked_photo, :id)
  end
end
  
json.set! :feed_photos do
  json.array!(@photos) do |photo|
    json.(photo, :id, :user_id, :created_at, :order_id)
    json.photo_url photo.photo(:vertical)
    json.photo_grid_url photo.photo(:grid)
    json.photo_large_url photo.photo(:large)
    json.user do
      json.(photo.user, :id, :username)
      json.profile_pic_url photo.user.profile_pic(:thumbnail)
    end
    json.likes photo.likes do |like|
      json.(like, :id, :user_id)
    end
    json.likers photo.likers do |liker|
      json.(liker, :id, :username)
    end
  end
end