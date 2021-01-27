# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(name: 'lecture', description: '2 hour lecture', date: '2021-01-22', time: '4pm')
Task.create(name: 'tutorial', description: '1 hour tutorial', date: '2021-01-23', time: '2pm')