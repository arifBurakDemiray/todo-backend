import {authenticate} from '../services/auth.service.js'
import {router} from './router.js';

router.post('/token', async function(req, res, next) {

  const result = await authenticate(req.body.username,req.body.password)

  res.status(result.status).json(result)

});

export default router;

