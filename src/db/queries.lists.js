const List = require("./models").List;
const Grocery = require("./models").Grocery;
const Authorizer = require("../policies/application");

module.exports = {

    getAllLists(callback){
        return List.findAll()
        .then((lists) => {
            callback(null, lists);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addList(newList, callback){
        return List.create({
            title: newList.title,
            description: newList.description,
            userId: newList.userId
        })
        .then((list) => {
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteList(id, callback) {
        return List.destroy({
            where: {id}
        })
        .then((list) =>{
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateList(req, updatedList, callback){
        return List.findById(req.params.id)
        .then((list) => {
            if(!list){
                return callback("List not found");
            }
            const authorized = new Authorizer(req.user, list).update();
            if(authorized) {
            list.update(updatedList, {
                fields: Object.keys(updatedList)
            }) 
            .then(() => {
                callback(null, list);
            })
            .catch((err) => {
                callback(err);
            });
            } else {
                req.flash("notice", "You are not authorized to do that.");
                callback("Forbidden");
            }
        });
    },
    getList(id, callback){
        return List.findById(id, {
            include: [{
                model: Grocery,
                as: "groceries"
            }]
        }) 
        .then((list) => {
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        })
    }
}