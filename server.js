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

const deleteNote = function (id) {

    notesData.splice(id - 1, 1);

    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesData, null, 2)
    );

    return notesData;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res, next) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function (req, res, next) {
    console.log("get notes");

    let results = notesData;

    res.json(results);
});

// POST Notes
app.post("/api/notes", function (req, res, next) {
    console.log("post notes", req.body);
    req.body.id = notesData.length + 1;

    const newNote = createNewNote(req.body);
    res.json(newNote);
});

// DELETE Notes
app.delete("/api/notes/:id", function (req, res, next) {
    const results = deleteNote(req.params.id);

    res.json(results);
});

module.exports = app;