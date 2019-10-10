module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const listRoutes = require("../routes/lists");
      const groceryRoutes = require("../routes/groceries");

      app.use(staticRoutes);
      app.use(listRoutes);
      app.use(groceryRoutes);
    }
  }