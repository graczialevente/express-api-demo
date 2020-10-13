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
  const { postId } = req.params;

  const idPattern = /^[1-9]([0-9]+)?$/;

  const params = Joi.object({
    postId: Joi.string().regex(idPattern).required(),
  });

  const { error } = params.validate(req.params);

  if (error) {
    res.status(400).send(`"${error.details[0].path}" not valid param`);
    return;
  }

  res.send({ postId: parseInt(postId) });
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
app.listen(port, () => console.log(`Listening on port: ${port}`));
