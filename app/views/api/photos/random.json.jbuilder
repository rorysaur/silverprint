json.array! @photos do |photo|
  json.photoUrl photo.photo(:vertical)
end