const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Otomatik oluşturulan todo ID'si
 *         title:
 *           type: string
 *           description: Todo başlığı
 *         description:
 *           type: string
 *           description: Todo açıklaması
 *         priority:
 *           type: string
 *           description: Todo'nun önceliği (low, medium, high)
 *           enum:
 *             - low
 *             - medium
 *             - high
 *         status:
 *           type: string
 *           description: Todo'nun durumu (start, progress, completed)
 *           enum:
 *             - start
 *             - progress
 *             - completed
 *         userId:
 *           type: string
 *           description: Todo'yu oluşturan kullanıcının ID'si
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Todo oluşturulma tarihi
 *     TodoResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         todo:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               type: string
 *               description: Todo'nun durumu (start, progress, completed)
 *               enum:
 *                 - start
 *                 - progress
 *                 - completed
 *             priority:
 *               type: string
 *               description: Todo'nun önceliği (low, medium, high)
 *               enum:
 *                 - low
 *                 - medium
 *                 - high
 *             userId:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /api/todos/getAllTodos:
 *   get:
 *     summary: Tüm todo'ları getir
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/getAllTodos',auth, todoController.getAllTodos);

/**
 * @swagger
 * /api/todos/createTodo:
 *   post:
 *     summary: Todo oluştur
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/createTodo',auth, todoController.createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Belirli bir todo'yu getir
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Başarılı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', auth, todoController.getTodoById);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Belirli bir todo'yu güncelle
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, todoController.updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Belirli bir todo'yu sil
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, todoController.deleteTodo);

/**
 * @swagger
 * /api/todos/changeStatus/{id}:
 *   post:
 *     summary: Todo durumunu değiştir
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - start
 *                   - progress
 *                   - completed
 *     responses:
 *       200:
 *         description: Todo durumu başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       401:
 *         description: Yetkisiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Todo bulunamadı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/changeStatus/:id/', auth, todoController.changeStatus);


module.exports = router;




