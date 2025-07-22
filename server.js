const express = require("express");
const webRouter = require("./src/routes/web/index");
const adminRouter = require("./src/routes/admin/index");
const apiRouter = require("./src/routes/api/index");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const handleSession = require("./src/middlewares/admin/handleSession");
const shareLocals = require("./src/middlewares/admin/shareLocals");
const requireLogin = require("./src/middlewares/admin/requireLogin");
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressLayouts);
app.set("layout", "layouts/default/index");

app.use("/", webRouter);
app.use("/api", apiRouter);
app.use("/admin", handleSession, shareLocals, requireLogin, adminRouter);

app.use((req, res) => {
  res.status(404).render("not-found", {
    layout: "layouts/notFound",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
