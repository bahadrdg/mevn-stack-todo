const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    // Authorization header'ı kontrol et
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader); // Debug log

    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Yetkilendirme hatası: Authorization header bulunamadı',
        details: 'Authorization header gerekli'
      });
    }

    // Bearer prefix'ini kontrol et
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid bearer format:', authHeader); // Debug log
      return res.status(401).json({ 
        message: 'Yetkilendirme hatası: Geçersiz token formatı',
        details: 'Token "Bearer " ile başlamalı'
      });
    }

    // Token'ı ayıkla
    const token = authHeader.replace('Bearer ', '');
    console.log('Extracted token:', token); // Debug log

    if (!token) {
      return res.status(401).json({ 
        message: 'Yetkilendirme hatası: Token bulunamadı',
        details: 'Token boş olamaz'
      });
    }

    try {
      // Token'ı doğrula
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }
      
      const decoded = jwt.verify(token, secret);
      console.log('Decoded token:', decoded); // Debug log

      // Kullanıcıyı bul ve son çıkış zamanını kontrol et
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          message: 'Yetkilendirme hatası: Kullanıcı bulunamadı'
        });
      }

      // Token'daki lastLogout ile kullanıcının son çıkış zamanını karşılaştır
      if (user.lastLogout && decoded.lastLogout !== user.lastLogout.getTime()) {
        return res.status(401).json({
          message: 'Yetkilendirme hatası: Oturum sonlandırılmış',
          details: 'Lütfen yeniden giriş yapın'
        });
      }

      req.user = decoded;
      req.user.userId = decoded.userId; // userId'yi req.user'a ekle
      next();
    } catch (error) {
      console.error('Token verification error:', error); // Debug log
      if (error.message === 'JWT_SECRET is not defined') {
        console.error('JWT_SECRET environment variable is not set!');
        return res.status(500).json({
          message: 'Sunucu yapılandırma hatası',
          details: 'JWT yapılandırması eksik'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Yetkilendirme hatası: Token süresi dolmuş',
          details: 'Lütfen yeniden giriş yapın'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: 'Yetkilendirme hatası: Geçersiz token',
          details: error.message
        });
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      message: 'Sunucu hatası',
      error: error.message
    });
  }
};

module.exports = auth; 