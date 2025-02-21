const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Başlık zorunludur'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Açıklama zorunludur'],
        trim: true
    },
    status: {
        type: String,
        enum: ['start', 'progress', 'completed'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);

