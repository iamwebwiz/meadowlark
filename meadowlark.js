const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const hbs = handlebars.create({ defaultLayout: 'main' });

app.set('port', process.env.PORT || 3000);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  const fortunes = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    "Do not fear what you don't know.",
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.',
  ];
  let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), () => {
  console.log(
    `Server started at http://localhost:${app.get(
      'port',
    )} ; press Ctrl-C to terminate.`,
  );
});
