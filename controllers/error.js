exports.get404 = (req, res, next) => {
  res
    .status(404)
    .render("notFound", { pageTitle: "Page Not Found", path: "/notFound" });
};
