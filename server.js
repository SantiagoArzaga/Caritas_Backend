const { notEqual } = require("assert")
const express = require("express")
const mongoose = require("mongoose")
var app = express()
var Data = require("./donationsSchema")

mongoose.connect("mongodb://localhost/CaritasDB")

mongoose.connection.once("open",  () => {
    
    console.log("Conected to Caritas DB!")

}).on("error", (error) => {

    console.log("Failed to connect " +  error)
})


// Create donation
// POST request

app.post("/createdonation", (req, res) => {

    var donation = new Data ({

        receptionState: req.get("receptionState"),
        billState: req.get("billState"),
        creationDate: req.get("creationDate"),
        receptionDate: req.get("receptionDate"),
        weightKg: req.get("weightKg"),
        destination: req.get("destination")
        

    })

    donation.save().then(() => {

        if (donation.isNew == false) {
            
            console.log("Save data!")
            res.send("Saved data!")
        }
        else {

            console.log("Failed to save data!")
        }
    })
})

// http://192.168.1.75:8081/createdonation

var server = app.listen(8081, "localhost", () => {

    console.log("Server is running!")
})

// Fetch all donations
// GET request

app.get("/fetchdonation", (req, res) => {
    Data.find({}).then((DBitems) => {

        res.send(DBitems)
    })
})

// Delete donation
// POST request
app.post("/deletedonation", (req, res) => {

    Data.findOneAndRemove({
        _id: req.get("id")
    },(error) => {
        console.log("Failed " + error)
    })

    res.send("Deleted!")
})

// Update donation
// POST request

app.post("/updatedonation", (req, res) => {
    
    Data.findOneAndUpdate({

        _id: req.get("id")

    }, {

        receptionState: req.get("receptionState"),
        billState: req.get("billState"),
        creationDate: req.get("creationDate"),
        receptionDate: req.get("receptionDate"),
        weightKg: req.get("weightKg"),
        destination: req.get("destination")
        

    }, (error) => {
        console.log("Failded to Update " + error)
    })

    res.send("Updated!")
    
})