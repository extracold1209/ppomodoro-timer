import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));


app.use('/l7check', (req, res) => {
    res.send('hello world!');
});

app.listen(8080, () => {
    console.log('express server now listen on 8080');
});
