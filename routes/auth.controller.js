import {authService} from '../services/auth.service.js'
import {router} from './router.js';

router.post('/token', async function(req, res, next) {

  const result = await authService.authenticate(req)

  res.status(result.status).json(result)

});

router.post('/register', async function(req, res, next) {

  const result = await authService.register(req)

  res.status(result.status).json(result)

});

export default router;

