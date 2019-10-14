const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Grocery = require("../../src/db/models").Grocery;
const User = require("../../src/db/models").User;
const Purchased = require("../../src/db/models").Purchased;

describe("Purchased", () => {
    beforeEach((done) => {
        this.user;
        this.list;
        this.grocery;
        this.purchased;
        sequelize.sync({force: true}).then((res) => {
            User.create({
                username: "Charlotte",
                email: "nature@flair.com",
                password: "figure8"
            })
            .then((res) => {
                this.user = res;
            List.create({
                title: "Family List 1",
                description: "All our basic essentials",
                userId: this.user.id,
            })
            .then((res) => {
                this.list = res;
                Grocery.create({
                    name: "Apples",
                    price: 2.99,
                    listId: this.list.id 
                })
                .then((res) => {
                    this.grocery = res;
                    done();
                })
            })
            });
        });
    });
   describe("#create()", () => {
       it("should create a purchased object on a grocery for a user", (done) => {
           Purchased.create({
               groceryId: this.grocery.id,
               userId: this.user.id 
           })
           .then((purchased) =>{
               expect(purchased.groceryId).toBe(this.grocery.id);
               expect(purchased.userId).toBe(this.user.id);
               done();
           })
           .catch((err) => {            
               console.log(err);
               done();
           });
       });
       it("should not create a purchased without assigned grocery or user", (done) => {
           Purchased.create({
               userId: null
           })
           .then((purchased) => {
               done();
           })
           .catch((err) => {
               expect(err.message).toContain("Purchased.groceryId cannot be null");
               expect(err.message).toContain("Purchased.userId cannot be null");
               done();
           })
       });
   });
   describe("#setUser()", () => {
       it("should associate a user and a purchased together", (done) => {
           Purchased.create({
               groceryId: this.grocery.id,
               userId: this.user.id 
           })
           .then((purchased) => {
               this.purchased = purchased;
               expect(purchased.userId).toBe(this.user.id);
               User.create({
                   username: "becky",
                   email: "becky@theman.com",
                   password: "secret" 
               })
               .then((newUser) => {
                   this.purchased.setUser(newUser)
                   .then((purchased) => {
                       expect(purchased.userId).toBe(newUser.id);
                       done();
                   });
               })
               .catch((err) => {
                   console.log(err);
                   done();
               });
           })
       });
   });
   describe("#getUser", () => {
       it("should return the associated user", (done) => {
           Purchased.create({
               groceryId: this.grocery.id,
               userId: this.user.id 
           }) 
           .then((purchased) => {
               purchased.getUser()
               .then((user) => {
                   expect(user.id).toBe(this.user.id);
                   done();
               })
           })
           .catch((err) => {
               console.log(err);
               done();
           });
       });
   });

   describe("#setGrocery()", () => {
       it("should associate a grocery and a purchased object together", (done) => {
           Purchased.create({
               groceryId: this.grocery.id,
               userId: this.user.id 
           })
           .then((purchased) => {
               this.purchased = purchased;
               Grocery.create({
                   name: "Banana",
                   price: 3.99,
                   listId: this.list.id 
               })
               .then((newGrocery) => {
                   expect(this.purchased.groceryId).toBe(this.grocery.id);
                   this.purchased.setGrocery(newGrocery)
                   .then((purchased) => {
                       expect(purchased.groceryId).toBe(newGrocery.id);
                       done();
                   });
               })
               .catch((err) => {
                   console.log(err);
                   done();
               });
           });
       });
   });

   describe("#getGrocery()", () => {
       it("should return the associated grocery", (done) => {
           Purchased.create({
               groceryId: this.grocery.id,
               userId: this.user.id,              
           })
           .then((purchased) => {
               purchased.getGrocery()
               .then((associatedGrocery) => {
                   expect(associatedGrocery.name).toBe("Apples");
                   done();
               });
           })
           .catch((err) => {
               console.log(err);
               done();
           });
       });
   });

});