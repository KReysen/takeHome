const groceryQueries = require("../db/queries.groceries.js");

module.exports = {
    new(req, res, next){
        res.render("groceries/new", {listId: req.params.listId});
    },
    create(req, res, next){
        let newGrocery = {
            name: req.body.name,
            price: req.body.price,
            listId: req.params.listId
        };
        groceryQueries.addGrocery(newGrocery, (err, grocery) => {
            if(err){
                res.redirect(500, "/groceries/new");
            } else {
                res.redirect(303, `/lists/${newGrocery.listId}/groceries/${grocery.id}`);
            }
        });
    },
    show(req, res, next){
        groceryQueries.getGrocery(req.params.id, (err, grocery) => {
            if(err || grocery == null){
                res.redirect(404, "/");
            } else {
                res.render("groceries/show", {grocery});
            }
        });
    }

}