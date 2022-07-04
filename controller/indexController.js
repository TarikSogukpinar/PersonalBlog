const IndexPage = (req, res) => {
  res.render("index", { title: "Ana Sayfa" });
};

module.exports = {
  IndexPage,
};
