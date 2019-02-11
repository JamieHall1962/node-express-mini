// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

server.get("/api/users/:id", (req, res) => {
    userId=req.params.id;
    db.findById(userId)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(err.code).json({ success: false, message: err.message });
      });
  });

  server.delete("/api/users/:id", (req, res) => {
    userId=req.params.id;
    db.remove(userId)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        res.status(err.code).json({ success: false, message: err.message });
      });
  });


server.post("/api/users", (req, res) => {
   const user = req.body;
   console.log(req.body);
   db.insert(user)
      .then(user => {
        res.status(201).json({success:true,user});
      })
      .catch(err => {
        res.status(err.code).json({ success: false, message: err.message });
      });
  });

  server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json({ success: true, updated });
        } else {
          res.status(404).json({
            success: false,
            message: 'I cannot find the User you are looking for',
          });
        }
      })
      .catch(({ code, message }) => {
        res.status(code).json({ success: false, message });
      });
  });





const port = 8000;
server.listen(port, () =>
  console.log(`\n=== Server listening on Port: ${port} ===\n`)
);


