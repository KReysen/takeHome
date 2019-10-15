module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const listRoutes = require("../routes/lists");
      const groceryRoutes = require("../routes/groceries");
      const userRoutes = require("../routes/users");
      const purchasedRoutes = require("../routes/purchaseds");

      if(process.env.NODE_ENV === "test") {
        const mockAuth = require("../../spec/support/mock-auth.js");
        mockAuth.fakeIt(app);
      }

      app.use(staticRoutes);
      app.use(listRoutes);
      app.use(groceryRoutes);
      app.use(userRoutes);
      app.use(purchasedRoutes);
    }
  }