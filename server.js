const cors = require('cors');
const next = require('next');
const routes = require('./routes')
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const Sentiment = require('sentiment');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = routes.getRequestHandler(app);
const sentiment = new Sentiment();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});

app.prepare()
  .then(() => {
    const server = express()
    const commentsHistory = { comments: [] };

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.post('/comment', (req, res, next) => {
      const { person = null, comment = '', timestamp = (+new Date), uid = null, topic = null } = req.body;
      const sentimentScore = sentiment.analyze(comment).score;
      const commentObject = { person, comment, timestamp, sentiment: sentimentScore, uid, topic };

      commentsHistory.comments.push(commentObject);
      pusher.trigger('post-comments', 'new-comment', { comment: commentObject });
    });

    server.post('/comments', (req, res, next) => {
      res.json({ ...commentsHistory, status: 'success' });
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
