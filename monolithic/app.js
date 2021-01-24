const express = require("express")
const app = express()
const PORT = 3000
const routes = require("./router/index")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/",routes)

app.listen(PORT, () => {
    console.log("listening on port ", PORT);
})