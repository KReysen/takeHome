const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Grocery = require("../../src/db/models").Grocery;


describe("Grocery", () => {
    beforeEach((done) => {
        this.list;
        this.grocery;
        sequelize.sync({force: true}).then((res) => {
            List.create({
                title: "Family List 1",
                description: "All our basic essentials"
            })
            .then((list) => {
                this.list = list;
                Grocery.create({
                    name: "Chicken breast",
                    price: 4.99,
                    listId: this.list.id
                })
                .then((grocery) => {
                    this.grocery = grocery;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    describe("#create()", () => {
        it("should create a grocery item with a name, price, and assigned list", (done) => {
            Grocery.create({
                name: "Pork chops",
                price: 8.99,
                listId: this.list.id
            })
            .then((grocery) => {
                expect(grocery.name).toBe("Pork chops");
                expect(grocery.price).toBe(8.99);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        
        it("should not create a grocery with a missing name", (done) => {
            Grocery.create({
                name: null
            })
            .then((grocery) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Grocery.name cannot be null");
                done();
            })
        });
    });

   

});