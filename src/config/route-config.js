module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const listRoutes = require("../routes/lists");
      const groceryRoutes = require("../routes/groceries");
      const userRoutes = require("../routes/users");

      app.use(staticRoutes);
      app.use(listRoutes);
      app.use(groceryRoutes);
      app.use(userRoutes);
    }
  }