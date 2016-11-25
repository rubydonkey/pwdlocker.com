# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times do |n|

  title = Faker::Lorem.words(2).join(' ')
  url = Faker::Internet.url
  username = Faker::Internet.user_name
  password = Faker::Internet.password(3, 100)

  Password.create!( title: title,
                    URL: url,
                    username: username,
                    password: password )

end