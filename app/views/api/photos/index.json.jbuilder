json.photos @photos do |photo|
  json.(photo, :id, :user_id, :created_at, :order_id)
  json.photo_url photo.photo(:vertical)
  json.photo_grid_url photo.photo(:grid)
  json.photo_large_url photo.photo(:large)
end