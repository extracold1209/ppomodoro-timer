import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/', (req, res) => {
    res.send('hello world!');
});

app.listen(8080, () => {
    console.log('express server now listen on 8080');
});
