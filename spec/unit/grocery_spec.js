const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Grocery = require("../../src/db/models").Grocery;
const User = require("../../src/db/models").User;


describe("Grocery", () => {
    beforeEach((done) => {
        this.user;
        this.list;
        this.grocery;
        sequelize.sync({force: true}).then((res) => {
            User.create({
                username: "Charlotte",
                email: "nature@flair.com",
                password: "figure8"
            })
            .then((user) => {
                this.user = user;
            List.create({
                title: "Family List 1",
                description: "All our basic essentials",
                userId: user.id,
            })
            .then((list) => {
                this.list = list;

                done();
            })         
            })
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
                expect(grocery.listId).toBe(this.list.id);
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
                expect(err.message).toContain("Grocery.listId cannot be null");
                done();
            })
        });
    });

});
