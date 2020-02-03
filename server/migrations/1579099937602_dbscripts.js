/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.sql(
    `CREATE TABLE "libraryapp"."libraries" (
        "id" SERIAL PRIMARY KEY,
        "open" BOOLEAN NOT NULL DEFAULT true,
        "name" TEXT UNIQUE NOT NULL,
        "address" TEXT UNIQUE NOT NULL
    );`
  );

  pgm.sql(
    `CREATE TABLE "libraryapp"."users" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "address" TEXT,
        "role" TEXT NOT NULL,
        "banned" BOOLEAN NOT NULL DEFAULT false 
    );`
  );

  pgm.sql(
    `CREATE TABLE "libraryapp"."books" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "author" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'Available',
        "library_id" INTEGER REFERENCES libraries(id) NOT NULL,
        "borrower_id" INTEGER REFERENCES users(id),
        CONSTRAINT unq_title_libid UNIQUE (title, library_id)
    );`
  );

  pgm.sql(
    `CREATE TABLE "libraryapp"."libraries_users" (
        "library_id" INTEGER REFERENCES libraries(id) NOT NULL,
        "user_id" INTEGER REFERENCES users(id) NOT NULL,
        CONSTRAINT "unq_libid_userid" UNIQUE (library_id, user_id)
    );`
  );
};
