const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

function authorizeUser(role, done) {
  User.create({
    email: `#{role}@example.com`,
    password: "123456",
    role: role,
    username: "example"
  })
  .then((user) => {
    request.get({         // mock authentication
      url: "http://localhost:3000/auth/fake",
      form: {
        role: user.role,     // mock authenticate as `role` user
        userId: user.id,
        email: user.email,
        username: user.username
      }
    },
      (err, res, body) => {
        done();
      }
    );
  });
}

describe("routes : lists", () => {

    beforeEach((done) => {
        this.list;
        this.user;

        sequelize.sync({force: true}).then(() => {
          User.create({
            username: "becky",
            email: "becky@theman.com",
            password: "disarmer",
            role: "admin"
          })
          .then((user) => {
            this.user = user;
          })

            List.create({
                title: "Leos Grocery List",
                description: "the weekly basics",
                userId: user.id
            })
            .then((res) => {
                this.list = res;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
describe("admin user performing CRUD actions", () => {
 beforeEach((done) => {
   authorizeUser("admin", done);
 });

  describe("GET /lists", () => {
    it("should return a status code 200 and all lists", (done) => {
      request.get(base, (err, res, body) => {
        console.log(this.user.username);
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("My Lists");
        done();
      });
    });
  });

  describe("GET /lists/new", () => {
      it("should render a new list form", (done) => {
          request.get(`${base}new`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("New Grocery List");
              done();
          });
      });
  });

  describe("POST /lists/create", () => {
      const options = {
          url: `${base}create`,
          form: {
              title: "Mack's Grocery List",
              description: "Dog-specific items"
          }
      };
      it("should create a new list and redirect", (done) => { 
          request.post(options,
            (err, res, body) => {
                List.findOne({where: {title: "Mack's Grocery List"}})
                .then((list) => {
                    expect(res.statusCode).toBe(303);
                    expect(list.title).toBe("Mack's Grocery List");
                    expect(list.description).toBe("Dog-specific items");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
      });
  });

  describe("POST /lists/:id/destroy", () => {

    it("should delete the list with the associated ID", (done) => {
      List.findAll()
      .then((lists) => {
        const listCountBeforeDelete = lists.length;

        expect(listCountBeforeDelete).toBe(1);
        request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
          List.findAll()
          .then((lists) => {
            expect(err).toBeNull();
            expect(lists.length).toBe(listCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });

  describe("GET /lists/:id/edit", () => {
    it("should render a view with an edit list form", (done) => {
        request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
            
          expect(err).toBeNull();
          expect(body).toContain("Edit List");
          expect(body).toContain("Leos Grocery List");
          done();
        });
      });
 
  });

  describe("POST /lists/:id/update", () => {

    it("should update the list with the given values", (done) => {
       const options = {
          url: `${base}${this.list.id}/update`,
          form: {
            title: "Leos Grocery List",
            description: "Only the best for Leo"
          }
        };
        request.post(options,
          (err, res, body) => {
          List.findOne({
            where: { id: this.list.id }
          })
          .then((list) => {
            expect(list.title).toBe("Leos Grocery List");
            expect(list.description).toBe("Only the best for Leo");
            done();
          });
        });
    });

  });


  describe("GET /lists/:id", () => {

    it("should render a view with the selected list", (done) => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Leos Grocery List");
        done();
      });
    });

  });
})

});