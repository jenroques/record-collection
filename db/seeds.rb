# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

records = Record.create([
{
  title: "Help!",
  image_url: "https://upload.wikimedia.org/wikipedia/en/e/e7/Help%21_%28The_Beatles_album_-_cover_art%29.jpg",
    artists: [
    {
      name: "The Beatles",
      image_url: "https://static.dw.com/image/63278585_605.jpg"
    }
  ]
}
{
  title: "Hounds of Love",
  image_url: "https://upload.wikimedia.org/wikipedia/en/3/3f/Katebushhoundsoflove.png",
    artists: [
      {
        name: "Kate Bush",
        image_url: "https://media.newyorker.com/photos/5bf2f3869b932021f2eaca96/1:1/w_1633,h_1633,c_limit/Talbot-Kate-Bush.jpg"
      }
    ]
}
{
  title: "Jailbreak",
  image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Thin_Lizzy_-_Jailbreak.jpg/220px-Thin_Lizzy_-_Jailbreak.jpg",
    artists: [
      {
        name: "Thin Lizzy",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Thin_Lizzy_-1983.jpg"
      }
    ]
}
{
  title: "Talio",
  image_url: "https://i.ebayimg.com/images/g/qlgAAOSwaj5iby9f/s-l1600.jpg",
    artist: [
      {
        name: "HITOMITO",
        image_url: "https://external-preview.redd.it/Wj1o6mBVzHCj3cX2QEIJ1W4p87Aw0NY9FjzHvtVZne4.jpg?auto=webp&s=95a651cab4bfdd625087185e1835b19d5df8a41f"
      }
    ]
}
{
  title: "Kind of Blue",
  image_url: "https://i.guim.co.uk/img/media/0f5a2d6ea401b7281fc050a8bbd57da6b5e18e5f/0_0_3556_3556/master/3556.jpg?width=700&quality=85&auto=format&fit=max&s=4be63bd5ea4dae601ed124031f90e434",
    artists: [
      {
        name: "Miles Davis",
        image_url: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-73909081.jpg"
      }
    ]
}
{
  title: "Heart Shaped World",
  image_url: "https://upload.wikimedia.org/wikipedia/en/4/42/Heart_shaped_world.jpg",
    artists: [
      {
        name: "Chris Isaak".
        image_url: "https://www.gannett-cdn.com/-mm-/07afcf2c085c19ba7070bceaabd4614680bdea04/c=0-17-599-356/local/-/media/2016/05/19/Phoenix/Phoenix/635992639163884140-Chris-Isaak.jpg?width=1200&disable=upscale&format=pjpg&auto=webp"
    }
  ]
}
{
  title: "!Volare¡ The Very Best of the Gypsy Kings"
  image_url: "https://upload.wikimedia.org/wikipedia/en/6/6c/Album_i_volare_the_very_best.jpg"
    artists: [
      {
        name: "Gipsy Kings",
        image_url: "https://aze.media/wp-content/uploads/2021/03/gipsykings4.jpg"
      }
    ]
}
])
