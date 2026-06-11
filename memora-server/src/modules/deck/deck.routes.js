import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: 'Deck route working',
  });
});

router.get('/error', (req, res) => {
  throw new Error('Boom');
});

export default router;
