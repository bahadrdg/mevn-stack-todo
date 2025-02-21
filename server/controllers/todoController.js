const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

exports.getAllTodos = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        
        const todos = await Todo.find({ userId: userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Todo listesi alınamadı', error: error.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, status } = req.body;

        const todo = new Todo({ title, description, status, userId: req.user.userId });
        console.log(todo);
        await todo.save();

        res.status(201).json({ message: 'Todo başarıyla oluşturuldu', todo });
    } catch (error) {
        res.status(500).json({ message: 'Todo oluşturulamadı', error: error.message });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id; // URL parametresinden todo ID'sini al

        const todo = await Todo.findOne({ _id: todoId, userId: userId }); // Kullanıcıya ait todo'yu bul
        if (!todo) {
            return res.status(404).json({ message: 'Todo bulunamadı' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Todo alınamadı', error: error.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id; // URL parametresinden todo ID'sini al

        const updates = req.body; // Güncellenmesi gereken alanlar

        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, userId: userId }, // Kullanıcıya ait todo'yu bul
            updates,
            { new: true } // Güncellenmiş belgeyi döndür
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo bulunamadı' });
        }

        res.status(200).json({ message: 'Todo başarıyla güncellendi', todo });
    } catch (error) {
        res.status(500).json({ message: 'Todo güncellenemedi', error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id; // URL parametresinden todo ID'sini al

        const todo = await Todo.findOneAndDelete({ _id: todoId, userId: userId }); // Kullanıcıya ait todo'yu bul ve sil

        if (!todo) {
            return res.status(404).json({ message: 'Todo bulunamadı' });
        }

        res.status(200).json({ message: 'Todo başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Todo silinemedi', error: error.message });
    }
};







