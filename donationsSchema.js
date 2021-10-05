var mongoose = require ("mongoose")
var Schema = mongoose.Schema

var donation = new Schema({

    receptionState: String,
    billState: String,
    creationDate: String,
    receptionDate: String,
    weightKg: String,
    destination: String
    

})

const Data = mongoose.model("data", donation)

module.exports = Data
