const express = require('express')
const app = express()
const neo4j = require("neo4j-driver");
const Person = require('./models/person');

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "test"))
const session = driver.session();

app.get('/getPeople', async (req, res) => {
    res.send(await session.readTransaction(txc => 
        txc.run(`MATCH (person:Person) RETURN person`)
    ).then(_manyPeople));
})

app.listen(8080)

const _manyPeople = (result) => {
    return result.records.map(r => new Person(r.get("person")));
}