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
                title: "Target list",
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

    describe("GET /lists/:listId/groceries/new", () => {
        it("should render a create grocery form", (done) => {
            request.get(`${base}/${this.list.id}/groceries/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Create new Grocery");
                done();
            });
        });
    });

    describe("POST /lists/:listId/groceries/create", () => {
        it("should create a new grocery item and redirect", (done) => {
            const options = {
                url: `${base}/${this.list.id}/groceries/create`,
                form: {
                    name: "Tide Pods",
                    price: 15.88
                }
            };
            request.post(options, (err, res, body) => {
                Grocery.findOne({where: {name: "Tide Pods"}})
                .then((grocery) => {
                    expect(grocery).not.toBeNull();
                    expect(grocery.name).toBe("Tide Pods");
                    expect(grocery.price).toBe(15.88);
                    expect(grocery.listId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /lists/:listId/groceries/:id", () => {
        it("should render a view of the selected grocery", (done) => {
            request.get(`${base}/${this.list.id}/groceries/${this.grocery.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Laundry detergent");
                done();
            });
        });
    });

    describe("POST /lists/:listId/groceries/:id/destroy", () => {
        it("should delete the grocery with the associated ID", (done) => {
            expect(this.grocery.id).toBe(1);
            request.post(`${base}/${this.list.id}/groceries/${this.grocery.id}/destroy`, (err, res, body) => {
                Grocery.findById(1)
                .then((grocery) => {
                    expect(err).toBeNull();
                    expect(grocery).toBeNull();
                    done();
                })
            });
        });
    });

    describe("GET /lists/:listId/groceries/:id/edit", () => {
        it("should render a view to edit grocery", (done) => {
            request.get(`${base}/${this.list.id}/groceries/${this.grocery.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Grocery");
                expect(body).toContain("Laundry detergent");
                done();
            });
        });
    });

    describe("POST /lists/:listId/groceries/:id/update", () => {
        it("should return a status code 302", (done) => {
            request.post({
                url: `${base}/${this.list.id}/groceries/${this.grocery.id}/update`,
                form: {
                    name: "Apples",
                    price: 2.99
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(302);
                done();
            });
        });
        it("should update the grocery with the given values", (done) => {
            const options = {
                url: `${base}/${this.list.id}/groceries/${this.grocery.id}/update`,
                form: {
                    name: "Apples"
                }
            };
            request.post(options, (err, res, body) => {
                expect(err).toBeNull();
                Grocery.findOne({
                    where: {id: this.grocery.id}
                })
                .then((grocery) => {
                    expect(grocery.name).toBe("Apples");
                    done();
                });
            });
        });
    });


});