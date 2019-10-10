const List = require("./models").List;
const Grocery = require("./models").Grocery;

module.exports = {
    addGrocery(newGrocery, callback){
        return Grocery.create(newGrocery)
        .then((grocery) => {
            callback(null, grocery);
        })
        .catch((err) =>{
            callback(err);
        })
    },
    getGrocery(id, callback){
        return Grocery.findById(id)
        .then((grocery) => {
            callback(null, grocery);
        })
        .catch((err) => {
            callback(err);
        })
    }
}