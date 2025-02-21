const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

// JWT token oluşturma
const generateToken = (userId, lastLogout) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign(
    { 
      userId,
      timestamp: Date.now(),
      lastLogout: lastLogout ? lastLogout.getTime() : null // Son çıkış zamanını token'a ekle
    },
    secret,
    { expiresIn: '1d' }
  );
};

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Email ve kullanıcı adı kontrolü
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: 'Bu email veya kullanıcı adı zaten kullanımda'
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    const token = generateToken(user._id, user.lastLogout);

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Sunucu hatası',
      error: error.message
    });
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Geçersiz email veya şifre'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Geçersiz email veya şifre'
      });
    }

    // Her girişte yeni bir token oluştur
    const token = generateToken(user._id, user.lastLogout);
    console.log('Generated new token:', token);

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Sunucu hatası',
      error: error.message
    });
  }
};

// Kullanıcı profili
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'Kullanıcı bulunamadı'
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Sunucu hatası',
      error: error.message
    });
  }
};

// Tüm kullanıcıları getir
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Sunucu hatası',
      error: error.message
    });
  }
};

// Kullanıcı çıkışı
exports.logout = async (req, res) => {
  try {
    // Kullanıcının son çıkış zamanını güncelle
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Kullanıcı bulunamadı'
      });
    }

    user.lastLogout = new Date();
    await user.save();

    res.json({
      message: 'Başarıyla çıkış yapıldı',
      success: true
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      message: 'Çıkış yapılırken bir hata oluştu',
      error: error.message
    });
  }
}; 