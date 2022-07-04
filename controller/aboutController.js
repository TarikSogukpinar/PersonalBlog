const AboutPage = (req, res) => {
  res.render("about", { title: "Hakkımda" });
};

module.exports = {
  AboutPage,
};
