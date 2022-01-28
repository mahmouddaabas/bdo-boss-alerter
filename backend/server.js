const express = require('express');
const app = express();
const boss_data = require("./data");
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/boss_data_eu", async (request, response) => {
    let data = await boss_data.get_boss_data();
    //console.log(data)
    response.send(data);
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});