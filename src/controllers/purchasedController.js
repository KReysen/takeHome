const purchasedQueries = require("../db/queries.purchased.js");

module.exports = {
    create(req, res, next){
        if(req.user){
            purchasedQueries.createPurchased(req, (err, purchased) => {
                if(err){
                    req.flash("error", err);
                }
            });
        } else {
            req.flash("notice", "You must be signed in to do that")
        }
        res.redirect(req.headers.referer);
    },
    destroy(req, res, next){
        if(req.user){
            purchasedQueries.deletePurchased(req, (err, purchased) => {
                if(err){
                    req.flash("error", err);
                }
                res.redirect(req.headers.referer);
            });
        } else {
            req.flash("notice", "You must be signed in to do that")
            res.redirect(req.headers.referer);
        }
    }
}