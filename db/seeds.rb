# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(name: 'CS1101S Lecture', description: '2 hour lecture', date: '2021-01-22', time: '4pm')
Task.create(name: 'CS1101S Tutorial', description: '1 hour tutorial', date: '2021-01-23', time: '2pm')
Task.create(name: 'CS2030S Recitation', description: '1 hour recitation', date: '2021-01-23', time: '1pm')
Task.create(name: 'MA1101R Lecture' , description: '2 hour lecture', date: '2021-01-24', time: '9am')
Task.create(name: 'CS1101S Recitation', description: '1 hour recitation', date:'2021-01-24', time:'3pm')
Task.create(name: 'CS2030S Lab', description: '2 hour lab', date:'2021-01-24', time: '12pm')