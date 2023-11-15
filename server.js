const express = require('express');           // inporting the express into our application
const app = express();                  
const mongoose = require("mongoose");         // importing the mongoose into our application
const bodyParser =  require("body-parser");   // importing the body parser into our application

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://picnex100:2N5tKzcvxyJerxFa@cluster0.ticmvfa.mongodb.net/notesDB", { useNewUrlParser: true }, { useUnifiedTopology: true })

// create a data schema
const notesSchema = {                          // creating the variable for our data model schema
    title: String,                             // providing the data schema attribute
    content: String                            // also providing the data schema attribute
}

const Note = mongoose.model("Note", notesSchema); // 

app.get("/", function(req, res) {              // creating the function to request a client view
    res.sendFile(__dirname + "/index.html");   // sending our html page to the cliend browser
})

// app.post 
app.post("/", function(req, res) {
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();                           // saving the new note into the database
    res.redirect('/');                        // routing to the index.html after sending data to MongoDB
})

app.listen(3001, function() {                 // creating the port for our application to run on
    console.log("server is running on port 3001");
})