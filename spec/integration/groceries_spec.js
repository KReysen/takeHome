const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Grocery = require("../../src/db/models").Grocery;

describe("routes : groceries", () => {
    beforeEach((done) => {
        this.list;
        this.grocery;
        sequelize.sync({force: true}).then((res) => {
            List.create({
                name: "Target list",
                description: "Avoid the stuff at the front"
            })
            .then((list) => {
                this.list = list;
                Grocery.create({
                    name: "Laundry detergent",
                    price: 11.99,
                    listId: this.list.id
                })
                .then((grocery) => {
                    this.grocery = grocery;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

    });
    
});