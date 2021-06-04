const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];


// Require the Fastify framework and instantiate it
const fastify = require("fastify")();


// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

//student route
fastify.get("/cit/student", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

//student id route
fastify.get("/cit/student/:id", (request, reply) => {
    let studentIdfromClient = request.params.id;
    let studentToGiveToClient = null;

    for (studentFromArray of students) {
        if (studentFromArray.id == studentIdfromClient){
            studentToGiveToClient = studentFromArray;
            break;
        }
    }

    if (studentToGiveToClient != null){
        reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(studentToGiveToClient);
    }
    else{
        reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("could not find student");
    }
    
});

//wildcard
fastify.get("*", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>wildcard route</h1>");
});

fastify.post("/cit/student/add", (request, reply) => {

    let dataFromClient = JSON.parse(request.body);

    let maxID = 0;
    for (indvidualStudent of students) {
        if (maxID<indvidualStudent.id){
            maxID=indvidualStudent.id;
        }
    }

    generatedStudent = {
        id: maxID +1,
        last: dataFromClient.lname,
        first: dataFromClient.fname
    };

students.push(generatedStudent);

    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(generatedStudent);
});



//Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
