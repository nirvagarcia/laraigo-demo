const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/bootstrap", (req, res) => {
  const { campaignId } = req.query;
  const db = router.db;

  try {
    const data = {
      sources: db.get("sources").value(),
      executionTypes: db.get("executionTypes").value(),
      groups: db.get("groups").value(),
      channels: db.get("channels").value(),
      messageTypes: db.get("messageTypes").value(),
      templates: db.get("templates").value(),
      campaign: campaignId
        ? db.get("campaigns").find({ id: campaignId }).value()
        : null,
    };

    res.jsonp(data);
  } catch (error) {
    console.error("Bootstrap endpoint error:", error);
    res.status(500).jsonp({ error: "Failed to load bootstrap data" });
  }
});

server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  - GET /bootstrap?campaignId=<id> (custom aggregated data)");
  console.log("  - All default JSON Server endpoints");
});
