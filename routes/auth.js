import {generateAccessToken} from '../services/auth.service.js'
import express from 'express';
var router = express.Router();

/* GET todo listing. */
router.get('/auth', function(req, res, next) {
  res.send(generateAccessToken(req.query.username));

});

export default router;

