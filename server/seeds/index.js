const { Pool } = require("pg")
//object destructing functions that imports postgres package & imports Pool class
const squel = require("squel").useFlavour("postgres")
// helps format inputs for postgres DB
const config = require("../config/default.json")
// imports default.json file from config folder

const librarySeeds = [
  {
    name: "Library One",
    address: "1 Infinite Loop"
  },
  {
    name: "Library Two",
    address: "2 Infinite Loop"
  },
  {
    name: "Library Three",
    address: "Book Village"
  }
  // adding more objects = more libraries in DB
]

const bookSeeds = [
  {
    title: "Indictments in Ireland",
    author: "Sean Li",
    library_id: 1
  },
  {
    title: "Broke in Bali",
    author: "Abhishek Jha",
    library_id: 1
  },
  {
    title: "Forfeiting in Foosball",
    author: "Amber Zhao",
    library_id: 2
  },
  {
    title: "Corruption in Caymans",
    author: "Katherine MCT",
    library_id: 2
  },
  {
    title: "Trifling in Tuscany",
    author: "Ay Jay",
    library_id: 2
  },
  {
    title: "Surfing in Simi",
    author: "Kath McTaggy",
    library_id: 2
  }
]

const userSeeds = [
  {
    name: "Katherine McTaggart",
    role: "librarian",
    email: "katherine@katherine.com",
    password: "$2a$12$2a97SIAV1.KY7yTTWkJ.Qu8J4XYN.0HIhQNc18TNzIxmhS08t2py."
  },

  {
    name: "Sean Li",
    role: "user",
    email: "sean@sean.com",
    password: "$2a$12$2a97SIAV1.KY7yTTWkJ.Qu8J4XYN.0HIhQNc18TNzIxmhS08t2py."
  },
  {
    name: "Amber Zhao",
    role: "user",
    email: "amber@amber.com",
    password: "$2a$12$2a97SIAV1.KY7yTTWkJ.Qu8J4XYN.0HIhQNc18TNzIxmhS08t2py."
  },
  {
    name: "AJ",
    role: "user",
    email: "aj@aj.com",
    password: "$2a$12$2a97SIAV1.KY7yTTWkJ.Qu8J4XYN.0HIhQNc18TNzIxmhS08t2py."
  },
  {
    name: "Akshay",
    role: "user",
    email: "akshay@akshay.com",
    password: "$2a$12$2a97SIAV1.KY7yTTWkJ.Qu8J4XYN.0HIhQNc18TNzIxmhS08t2py."
  }
]

const libraries_usersSeed = [
  {
    library_id: 1,
    user_id: 1
  },
  {
    library_id: 1,
    user_id: 2
  },
  {
    library_id: 1,
    user_id: 3
  },
  {
    library_id: 1,
    user_id: 4
  },
  {
    library_id: 2,
    user_id: 5
  }
]

// seed = start DB & add in default values

const seed = async () => {
  const pg = await new Pool(config.db).connect()
  // when importing into database, use try's to ensure if error occurs, previous operations are undone.

  try {
    await pg.query("BEGIN")

    console.log("Seeding Libraries...")

    Promise.all(
      librarySeeds.map(librarySeeds => {
        return pg.query(
          squel
            .insert()
            .into("libraryapp.libraries")
            .setFields(librarySeeds)
            .toParam()
        )
      })
    )

    console.log("Seeding Libraries Completed")

    console.log("Seeding Users...")

    Promise.all(
      userSeeds.map(userSeeds => {
        return pg.query(
          squel
            .insert()
            .into("libraryapp.users")
            .setFields(userSeeds)
            .toParam()
        )
      })
    )

    console.log("Seeding Users Completed")

    console.log("Seeding Books...")

    Promise.all(
      bookSeeds.map(bookSeeds => {
        return pg.query(
          squel
            .insert()
            .into("libraryapp.books")
            .setFields(bookSeeds)
            .toParam()
        )
      })
    )

    console.log("Seeding Library_Users")

    Promise.all(
      libraries_usersSeed.map(libraries_usersSeed => {
        return pg.query(
          squel
            .insert()
            .into("libraryapp.libraries_users")
            .setFields(libraries_usersSeed)
            .toParam()
        )
      })
    )

    console.log("Seeding Library_Users Completed")

    await pg.query("COMMIT")
  } catch (e) {
    await pg.query("ROLLBACK")
    throw e
  } finally {
    pg.release()
  }
  // catch executes when errors occur, stores error in (e), and tells Postgres to "ROLLBACK" previous changes + throw e -> displays error
  // finally always executes
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
