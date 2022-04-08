const express = require("express");
const path = require("path");
const fs = require("fs");

const notesData = require("./db/db.json");

const app = express();

const createNewNote = function (body) {
  const newNote = body;
  notesData.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesData, null, 2)
  );

  return newNote;
};

