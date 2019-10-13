const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;


describe ("List", () => {
  beforeEach((done) => {
    this.list;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        username: "Cody",
        email: "cody@nightmare.com",
        password: "rhodes"
      })
      .then((user) => {
        this.user = user; //store the user

        List.create({
          title: "GNC Grocery list",
          description: "All the protein powder",
          userId: user.id
        })
        .then((list) => {
          this.list = list; //store the list
          done();
        })
      })
    });
  });
  describe("#create()", () => {
    it("should create a list object with a title, description, and assigned user", (done) => {
      List.create({
          title: "Whole foods list",
          description: "expensive food for all",
          userId: this.user.id,
      })
      .then((list) => {
          expect(list.title).toBe("Whole foods list");
          expect(list.description).toBe("expensive food for all");
          expect(list.userId).toBe(this.user.id);
          done();
      })
      .catch((err) => {
          console.log(err);
          done();
      });
    });
    it("should not create a list with a missing title or description", (done) => {
        List.create({
            title: "Wal mart list"
        })
        .then((list) => {
            done();
        })
        .catch((err) => {
            expect(err.message).toContain("List.description cannot be null");
            done();
        })
    });
  });
  describe("#setUser", () => {
      it("should associate a list and a user together", (done) => {
          User.create({
              username: "Becky",
              email: "becky@theman.com",
              password: "Bexploder"
          })
          .then((newUser) => {
              expect(this.list.userId).toBe(this.user.id);
              this.list.setUser(newUser)
              .then((list) => {
                  expect(this.list.userId).toBe(newUser.id);
                  done();
              });
          })
      });
  });

  describe("#getUser", () => {
      it("should return the associated user", (done) => {
          this.list.getUser()
          .then((associatedUser) => {
              expect(associatedUser.email).toBe("cody@nightmare.com");
              done();
          });
      });
  });

});