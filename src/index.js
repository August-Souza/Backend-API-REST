const express = require("express");

const cors = require('cors');
 
const app = express()

app.use(cors())
app.use(express.json());

const projects = []

function logRequest(request, response, next) {
  const {method, url} = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next()
}

app.use(logRequest)

app.get("/projects", (request, response) => {
  return response.json(projects)
})

app.post("/projects", (request, response) => {
  const { id, title, owner } = request.body;
  const project = { id, title, owner };

  projects.push(project);

  return response.json(project)
})

app.put("/projects/:id", (request, response) => {
  const {id} = request.params;
  const {title, owner} =  request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: "Project not found."})
  }

  const project = {
    id,
    title,
    owner
  }
  projects[projectIndex] = (project)

  return response.json(project)
})

app.delete("/projects/:id", (request, response) => {
  const {id} = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({error: "Project not found."})
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('Backend started!')
});