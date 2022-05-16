const Validator = require('../Validator');

class ClaimValidator extends Validator {
      constructor(){
            super();
      }
      postDto(data) {
            return this.joi.object({
                  id: this.joi.number().optional(),
                  type: this.joi.string().default('individual').required(),
                  name: this.joi.string().required(),
                  address: this.joi.string().required(),
                  town: this.joi.string().required(),
                  postCode: this.joi.number().required(),
                  state: this.joi.string().required(),
                  acnNumber: this.joi.string().optional(),
                  claimDetails: this.joi.object().keys({
                        debtType: this.joi.string().optional(),
                        totalOwed: this.joi.number().optional(),
                        totalReceived: this.joi.number().optional(),
                        existingClaimId: this.joi.number().optional(),
                        inCourt: this.joi.boolean().default(false).optional()
                  }).required()
            }).validate(data);
      }

      updateDto(data) {
            return this.joi.object({
                  type: this.joi.string().optional(),
                  name: this.joi.string().optional(),
                  address: this.joi.string().optional(),
                  town: this.joi.string().optional(),
                  postCode: this.joi.number().optional(),
                  state: this.joi.string().optional(),
                  acnNumber: this.joi.string().optional(),
            }).validate(data);
      }

}

module.exports = new ClaimValidator();