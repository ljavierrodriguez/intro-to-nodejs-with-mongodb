const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const DispatchSchema = new Schema({
    invoices_id: {
        type: String,
        require: true
    },
    client: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    weight: {
        type: Number,
    },
    date_dispatch: {
        type: Date
    },
    method: {
        type: String,
    },
    users_id: {
        type: mongoose.ObjectId,
    },
    office: {
        type: String,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Dispatch = new mongoose.model('dispatches', DispatchSchema);

module.exports = Dispatch;