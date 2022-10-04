const { mongoose } = require("mongoose");

const financeSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number,
  },
  type: {
    type: String,
    enum: ['MONEY_IN', 'MONEY_OUT'],
    default: 'MONEY_IN',
  },
  comment: {
    required: true,
    type: String
  }
});


module.exports = mongoose.model('FinanceModel', financeSchema);