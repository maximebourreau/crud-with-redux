const bodyParser = require('body-parser');

const games = [
  { _id: "1", title: 'chess', cover: '/portablejim-Chess-tile-Rook-300px.png' }
];
let currentId = games.length;

function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

module.exports = function(app) {

  app.use(bodyParser.json());

  app.get('/api/games', (req, res) => {
    res.json({ games: games });
  });
  app.post('/api/games', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      currentId = currentId + 1;
      const newGame = { _id: String(currentId), title: title, cover: cover };
      games.push(newGame);
      res.json({ game: newGame });
    } else {
      res.status(400).json({ errors });
    }
  });
  app.put('/api/games/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      const game = games.find(game => game._id == req.params._id);
      if (game) {
        game.title = title;
        game.cover = cover;
        res.json({ game: game });
      } else {
        res.status(500).json({ errors: { global: 'Not found' }});
      }
    } else {
      res.status(400).json({ errors });
    }
  });
  app.get('/api/games/:_id', (req, res) => {
    const game = games.find(game => game._id == req.params._id);
    res.json({ game: game });
  });
  app.delete('/api/games/:_id', (req, res) => {
    const i = games.findIndex(game => game._id == req.params._id);
    if (i >= 0) {
      games.splice(i, 1);
      res.json({});
    } else {
      res.status(500).json({ errors: { global: 'Not found' }});
    }
  });
}
