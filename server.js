const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;

const mongoUri = "mongodb://localhost:27017/";
const dbName = "bnmit";
const jwtSecret = "your_jwt_secret"; // Use a more secure secret in production

const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

MongoClient.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const petsCollection = db.collection("pets");
    const usersCollection = db.collection("sign");

    // Serve the homepage
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    // Route to handle pet submissions
    app.post("/submit-pet", upload.single("petPhoto"), (req, res) => {
      console.log("Form Data:", req.body);
      console.log("Uploaded File:", req.file);

      const pet = {
        name: req.body.petName,
        type: req.body.animaltype,
        age: req.body.petAge,
        size: req.body.petSize,
        photo: req.file ? req.file.path : null,
        description: req.body.petDescription,
        uploaderName: req.body.uploaderName,
        uploaderContact: req.body.uploaderEmail,
      };

      petsCollection
        .insertOne(pet)
        .then(() =>
          res.send(
            '<html><body><h2>Pet submitted successfully!</h2><a href="/submit-pet.html">Go back</a></body></html>'
          )
        )
        .catch((error) => {
          console.error("Error inserting pet:", error);
          res.status(500).send("Error submitting pet");
        });
    });

    app.get("/pets", async (req, res) => {
      try {
        const pets = await petsCollection.find().toArray();
        res.json(pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).send("Error fetching pets");
      }
    });

    // Registration Endpoint
    app.post("/register", async (req, res) => {
      try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, password: hashedPassword };
        await usersCollection.insertOne(user);
        res.status(201).send("User registered");
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(400).send("Error registering user");
      }
    });

    // Login Endpoint
    app.post("/login", async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        if (!user) return res.status(400).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid password");

        const token = jwt.sign({ id: user._id }, jwtSecret, {
          expiresIn: "1h",
        });
        res.json({ token });
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(400).send("Error logging in");
      }
    });

    // Middleware to authenticate JWT
    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);

      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    };

    // Example protected route:
    app.get("/protected", authenticateToken, (req, res) => {
      res.send("This is a protected route");
    });

    app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "login.html"));
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
