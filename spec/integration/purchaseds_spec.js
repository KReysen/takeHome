const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Grocery = require("../../src/db/models").Grocery;
const User = require("../../src/db/models").User;

describe("Purchased", () => {
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
                .catch((err) => {
                    console.log(err);
                    done();
                });
            })
            });
        });
    });
  describe("User purchasing a grocery item", () => {
      beforeEach((done) => {
          request.get({
              url: "http://localhost:3000/auth/fake",
              form: {
                  role: "member",
                  userId: this.user.id 
              }
          }, (err, res, body) => {
              done();
          }
          );
      });
      
      describe("POST /lists/:listId/groceries.groceryId/purchaseds/create", () => {
          it("should create a purchased", (done) => {
              const options = {
                  url: `${base}${this.list.id}/groceries/${this.grocery.id}/purchaseds/create`
              };
              request.post(options, (err, res, body) => {
                  Purchased.findOne({
                      where: {
                          userId: this.user.id,
                          groceryId: this.grocery.id 
                      }
                  })
                  .then((purchased) => {
                      expect(purchased).not.toBeNull();
                      expect(purchased.userId).toBe(this.user.id);
                      expect(purchased.groceryId).toBe(this.grocery.id);
                      done();
                  })
                  .catch((err) => {
                      console.log(err);
                      done();
                  });
              });
          });
      });
      describe("POST /lists/:listId/groceries.groceryId/purchaseds/create", () => {
          it("should destroy a purchased", (done) => {
              const options = {
                url: `${base}${this.list.id}/groceries/${this.grocery.id}/purchaseds/create`
              };
              let purCountBeforeDelete;
              request.post(options, (err, res, body) => {
                  this.grocery.getPurchaseds()
                  .then((purchaseds) => {
                      const purchased = purchaseds[0];
                      purCountBeforeDelete = purchaseds.length;
                      request.post(`${base}${this.list.id}/groceries/${this.grocery.id}/purchaseds/${purchased.id}/destroy`,
                      (err, res, body) => {
                          this.grocery.getPurchaseds()
                          .then((purchaseds) => {
                              expect(purchaseds.length).toBe(purCountBeforeDelete -1);
                              done();
                          });
                      }
                      );
                  });
              });
          });
      });

  });

    
})