import express from 'express';
import serveFavicon from 'serve-favicon';
import path from 'path';

const publicDirectoryPath = path.join(__dirname, '..', 'public');
const app = express();

app.use(serveFavicon(path.join(publicDirectoryPath, 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use('/public', express.static(publicDirectoryPath));


app.use('/l7check', (req, res) => {
    res.send('hello world!');
});

app.listen(4000, () => {
    console.log('express server now listen on 4000');
});
