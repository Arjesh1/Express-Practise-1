import express, { response } from "express"
// import data from "./data/MOCK_DATA.json"


const app = express()

const PORT = 3003

const data = [
{"id":1,"first_name":"Kip","last_name":"Klaff","email":"kklaff0@issuu.com","gender":"Male"},
{"id":2,"first_name":"Gene","last_name":"Rowthorne","email":"growthorne1@wordpress.org","gender":"Male"},
{"id":3,"first_name":"Fowler","last_name":"Barthelet","email":"fbarthelet2@google.cn","gender":"Male"},
{"id":4,"first_name":"Joni","last_name":"McEachern","email":"jmceachern3@hexun.com","gender":"Female"},
{"id":5,"first_name":"Currie","last_name":"Proom","email":"cproom4@drupal.org","gender":"Male"},
{"id":6,"first_name":"Valentia","last_name":"Gatman","email":"vgatman5@nhs.uk","gender":"Female"},
{"id":7,"first_name":"Nikolos","last_name":"Dive","email":"ndive6@weebly.com","gender":"Male"},
]

//Using public folder at root of project

app.use(express.static("public"))

//using the images folder at the route/images

app.use('/images', express.static('images'))


// Using express.json & express.urlencoded

// app.use(express.json())

app.use(express.urlencoded({extended: true}))



//GET
app.get('/', (request, response) =>{
    response.json(data)
})

//POST - express.json and express.urlencoded
app.post('/item', (req, res)=>{
    console.log(req.body)
    res.send(req.body)
})

//GET - download method
app.get('/download', (request, response) =>{
    response.download("images/mountain2.jpg")
})

//GET - redirect method
app.get('/redirect', (request, response) =>{
    response.redirect("http://www.linkedin.com")
})

//GET with next()
app.get('/next', (request, response, next) =>{
    //Middleware: Access the routing parameters
    console.log('The response will be send by the next function.');
    next()
}, (request, response)=>{
    //Everything above this line is middleware
    response.send("I just set up a route with a second callback.  ")
})

//GET with Routing Parameters
app.get('/class/:id', (req, res)=>{
    const studentId = +req.params.id
    const student = data.filter((student) => student.id === studentId)
    res.send(student)

})

//POST
app.post('/create', (request, response) =>{
    response.send('This is a POST request at /create')
})

//PUT
app.put('/edit', (request, response) =>{
    response.send('This is a PUT request at /edit')
})

//DELETE
app.delete('/delete', (request, response) =>{
    response.send('This is a Delete request at /delete')
})

//Route chaining
app.route("/class")
.get((request, response)=>{
    // response.send("Retrieve class info")
    throw new Error()
})
.post((request, response)=>{
    response.send("Retrieve class info")
})
.put((request, response)=>{
    response.send("Retrieve class info")
})

app.use((err, req, res, next)=>{
console.error(err.stack)
res.status(500).send("Something went wrong!")
})

app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT} `);
    
})





