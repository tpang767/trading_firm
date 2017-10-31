const mongoose = require('mongoose'),
	Schema = mongoose.Schema

const TradeFillSchema = new Schema({
	'timestamp': String,
	'fee': Number,
	'price': Number,
	'denomination': String,
	'product': String,
	'side': String,
	'size': Number,
	'size_unit': String,
      'total': Number,
      'trade_id': String
})

export default mongoose.model('TradeFill', TradeFillSchema)