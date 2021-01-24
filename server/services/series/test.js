const express = require('express')
const app = express();

app.use(express.json())

// ----------------config database
const { MongoClient, ObjectID } = require('mongodb')
const databaseUrl = "mongodb://localhost:27017"

const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })

client.connect()

const db = client.db("vintage-fox")

// ----------------------server
app.get('/', async (req, res) => {
  const users = db.collection('users')
  const dataUsers = await users.find({}).toArray()
  console.log('--------->', dataUsers)
  res.json(dataUsers)
})

app.put('/update/:userId', async (req, res) => {
  const users = db.collection('users')

  const resp = await users.findOneAndUpdate({
    "_id": ObjectID(req.params.userId)
  }, {
    $set: {
      name: req.body.name
    }
  }, {
    returnOriginal: false
  })

  res.json({
    resp
  })

})


app.listen(3003, () => {
  console.log('server started at port 3003')
})

