const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json());
const neo4j = require("neo4j-driver");

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "test"))

app.post("/addPerson", async (req, res) => {
    const session = driver.session();
    let result = await session.run(`CREATE (${req.body.name.replace(new RegExp(" ", "g"), "")}:Person {name: $name}) RETURN ${req.body.name.replace(new RegExp(" ", "g"), "")}`, {name: req.body.name});
    session.close();
    res.send(result);
});

app.get('/getPeople', async (req, res) => {
    const session = driver.session();
    var result = await session.run("MATCH (person:Person) RETURN person");
    session.close();
    res.send(result);
})

app.post("/removePerson", async (req, res) => {
    const session = driver.session();
    let result = await session.run(`MATCH (n:Person {name: '${req.body.name}'}) DETACH DELETE n`);
    session.close();
    res.send(result);
});

app.get("/getEvents", async (req, res) => { 
    const session = driver.session();
    let result = await session.run(`MATCH (event:Event) RETURN event`);
    session.close();
    res.send(result);
});

app.post("/linkPersonToEvent", async (req, res) => {
    const session = driver.session();
    let result = await session.run(`match (p:Person {name: $name}) match (e:Event {title: $title}) create (p)-[r:ATTENDED]->(e) return r`, {
        name: req.body.name,
        title: req.body.title
    })
    session.close();
    res.send(result);
})
app.post("/addEvent", async (req, res) => {
    const session = driver.session();
    let result = await session.run(`create (e:Event {title: $title, date: $date})`, {
        title: req.body.title,
        date: req.body.date
    });
    session.close();
    res.send(result);
})

app.post("/removeEvent", async (req, res) => {
    const session = driver.session();
    let result = await session.run(`match (e:Event {title: $title}) detach delete e`, {
        title: req.body.title
    });
    session.close();
    res.send(result);
})

app.listen(8080, () => {
    console.log("listening on port 8080");
})