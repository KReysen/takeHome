const List = require("./models").List;
const Grocery = require("./models").Grocery;
const User = require("./models").User;
const Purchased = require("./models").Purchased;
const Authorizer = require("../policies/application");

module.exports = {
    createPurchased(req, callback) {
        return Purchased.create({
            groceryId: req.params.groceryId,
            userId: req.user.id 
        })
        .then((purchased) => {
            callback(null, purchased);
        })
        .catch((err) => {
            callback(err);
        });
    },
    deletePurchased(req, callback) {
        const id= req.params.id;
        return Purchased.findById(id)
        .then((purchased) => {
            if(!purchased){
                return callback("Purchased not found");
            }
            const authorized = new Authorizer(req.user, purchased).destroy();
            if(authorized){
                Purchased.destroy({ where: {id }})
                .then((deletedRecordsCount) => {
                    callback(null, deletedRecordsCount);
                })
                .catch((err) => {
                    callback(err);
                });
            } else {
                req.flash("notice", "You are not authorized to do that")
                callback(401);
            }
        })
        .catch((err) => {
            callback(err);
        });
    }
}