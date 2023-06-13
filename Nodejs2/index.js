import express from 'express';
import path from "path";

const app = express();

app.get('/error', (req, res) => {
    res.sendStatus(404);
});

app.get('/', (req, res) => {
    const pathLocation = path.resolve();
    console.log(pathLocation);
    res.sendFile(path.join(pathLocation, "index.html"));
});

app.get('/json', (req, res) => {
    res.json({ present: true, properties: { name: "tushar", age: 3000, data: [] } });
});

app.get('/chaining', (req, res) => {
    res.status(500).send("Meri marajidon days pahil");
}); 

// Setting up View Engine for ejs
app.set('view engine', 'ejs');
// Dynamic
app.get('/ejs', (req, res) => {
    res.render("index", {name: "Nilesh", age: 27});
});

// Static
app.use(express.static(path.join(path.resolve(), "public")));

app.get('/ejs', (req, res) => {
    res.render("index", {name: "Nilesh", age: 27});
});

app.listen(5000, () => {
    console.log("server is wworking now...");
})