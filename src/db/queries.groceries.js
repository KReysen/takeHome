const List = require("./models").List;
const Grocery = require("./models").Grocery;
const Purchased = require("./models").Purchased;
const User = require("./models").User;

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
        return Grocery.findById(id, {
            include: [
                {model: Purchased, as: "purchaseds"}
            ]
        })
        .then((grocery) => {
            callback(null, grocery);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteGrocery(id, callback){
        return Grocery.destroy({
            where: { id }
        }) 
        .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateGrocery(id, updatedGrocery, callback) {
        return Grocery.findById(id)
        .then((grocery) =>{
            if(!grocery){
                return callback("Grocery not found");
            }
            grocery.update(updatedGrocery, {
                fields: Object.keys(updatedGrocery)
            })
            .then(() => {
                callback(null, grocery);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }
}