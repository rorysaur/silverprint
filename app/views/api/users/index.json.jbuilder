json.key_format!(:camelize => :lower)

json.array! @users do |user|
  json.(user, :id, :username)
  json.profile_pic_url user.profile_pic(:thumbnail)
  json.follow user.follows_received.first
  json.followers user.followers do |follower|
    json.(follower, :id)
  end
end
