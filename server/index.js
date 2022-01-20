const express = require("express");
const app = express();
const cors = require("cors");

const options = {
    origin: "http://localhost:3000"
}
app.use(cors());
app.use(express.json());

require("./routes/cryptoRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));