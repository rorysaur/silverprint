json.key_format!(:camelize => :lower)

json.set! :user do
  json.(@user, :id, :username)
  json.profile_pic_url @user.profile_pic(:thumbnail)
  json.likes @user.likes do |like|
    json.(like, :id, :photo_id, :user_id)
  end
end

json.set! :photos do
  json.array!(@photos) do |photo|
    json.(photo, :id, :user_id, :created_at)
    json.photo_url photo.photo(:normal)
    json.user do
      json.(photo.user, :id)
      json.profile_pic_url photo.user.profile_pic(:thumbnail)
    end
  end
end