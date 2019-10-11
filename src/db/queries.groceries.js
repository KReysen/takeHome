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