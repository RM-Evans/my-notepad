const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db');
const { nanoid } = require('nanoid');
//TODO const apiRoutes = require('./routes/apiRoutes/apiRoutes')
//TODO const htmlRoutes = require('./routes/htmlRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//need this for proper formatting
app.use(express.static("public"));


const storedNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) throw err;

    })
);

const updateNotes = storedNotes => {
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(storedNotes),
        err => {
            if (err) throw err;
        }
    );
};




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.get('/api/notes', (req, res) => {

    return res.json(storedNotes);
});


//TODO make id ---- why arent my notes rendering but my titles are???????

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.post('/api/notes', (req, res) => {

//     let savedNote = JSON.parse(req.body);
//     console.log(savedNote);
// });
// app.get('/api/notes', (req, res) => {
//     res.sendFile('')
// }

app.post('/api/notes', (req, res) => {

    let id = nanoid(5);
    let newNote = req.body;

    newNote.id = id;

    storedNotes.push(newNote);

    updateNotes(storedNotes);
    console.log(storedNotes);
    res.json(newNote);
    console.log(JSON.stringify(newNote));
});

//TODO ADD DELETE FUNCTION



// app.post('api/notes',);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});




