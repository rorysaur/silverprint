json.key_format!(:camelize => :lower)

json.users @users do |user|
  json.(user, :id, :username)
  json.profile_pic_url user.profile_pic(:thumbnail) 
  json.followers user.followers do |follower|
    json.(follower, :id)
  end
end
