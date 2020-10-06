import express from 'express';
import Joi from 'joi';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.use(express.json());

/**
 * Gets current time
 */
app.get('/', (req, res) => {
  res.send(new Date().toISOString());
});

/**
 * Validate get parameter
 */
app.get('/post/:postId', (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  if (isNaN(postId)) {
    res.status(400).send('Not valid parameter.');
    return;
  }

  res.send({ postId });
});

/**
 * Validate posted object
 */
app.post('/post', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  res.send('OK');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}]`));
