const { Router } = require('express');
// const { auth, admin } = require('../../../middleware');
const ClaimController = require('./Claim.Controller');
const router = Router();

router
.get('/', ClaimController.fetch)
.post('/', ClaimController.create)
.put('/:id', ClaimController.update)
.delete('/:id', ClaimController.delete)

module.exports = router;