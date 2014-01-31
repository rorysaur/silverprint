## silverprint

-----

### the web instagram you've secretly been wishing for.

-----

#### what it is
Upload, crop, sort, and share your photos. Follow other users and like their photos.

####[see the demo](http://silverprint.me)

#### features

- Cropping feature uses Jcrop in conjunction with Paperclip: Jcrop displays a cropping interface and posts the crop coordinates to the server; the Rails controller sets the crop coordinates on the model, and Paperclip processes the photo and creates a thumbnail using the coordinates.

- Drag & drop sorting uses jQuery Sortable. Photos are given a default `order_id` of `Time.now` when created. After a photo is dragged and dropped, the photo is assigned a new `order_id` between the `order_id`s of its neighbors, and the new `order_id` is posted to the server.

- Upload from URL: when the URL is posted to the server, its content is base64-encoded and saved on the model.

- Toggle between vertical (like the Instagram feed) and grid layouts for viewing photos.


#### future features

- [ ] grid view hover username
- [ ] infinite scroll
- [ ] choose file button
- [ ] brightness/contrast enhance
- [ ] photo effects
- [ ] pagination
- [ ] friendlyId
- [ ] new follows/likes notifications


#### history

1.15.2104
- [x] auth

1.16.2014
- [x] rails app

1.17.2014
- [x] rails api
- [x] users index

1.20.2014
- [x] user show
- [x] follows
- [x] likes
- [x] feed
- [x] favorites
- [x] photo upload

1.21.2014
- [x] profile pic upload
- [x] recursive view removal
- [x] grid view
- [x] lightbox view
- [x] square crop
- [x] adjust photo sizes
- [x] glyphicons
- [x] feed refresh
- [x] domain name

1.22.2014
- [x] fix unfollow
- [x] button groups
- [x] thumbnail
- [x] fade
- [x] fullscreen
- [x] logout glyph
- [x] sortable photos
- [x] new photo modal
- [x] profile photo form toggle
- [x] default profile photo
- [x] followers/following views
- [x] loading spinner
- [x] profile pic modal
- [x] error messages/alerts
- [x] attachment validations
- [x] style forms

1.23.2014
- [x] root page
- [x] create demo account
- [x] add photo from url
- [x] demo walkthrough

1.24.2014
- [x] redo demo walkthrough
- [x] empty feed alert
- [x] 404/500 views
- [x] about page


