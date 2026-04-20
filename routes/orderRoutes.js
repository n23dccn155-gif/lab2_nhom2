const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Lấy toàn bộ đơn hàng (GET /api/orders) + Tính năng Lọc, Tìm kiếm, Sắp xếp (Challenge)
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    // Lọc theo trạng thái (status=pending, etc)
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Tìm kiếm theo tên khách hàng (name=van a)
    if (req.query.name) {
      query.customerName = { $regex: req.query.name, $options: 'i' };
    }

    // Xử lý sắp xếp (sort=asc hoặc desc)
    let sortQuery = { createdAt: -1 }; // Mặc định mới nhất
    if (req.query.sort) {
      const sortOrder = req.query.sort.toLowerCase();
      if (sortOrder === 'asc' || sortOrder === 'desc') {
        sortQuery = { totalAmount: sortOrder === 'asc' ? 1 : -1 };
      }
    }

    const orders = await Order.find(query).sort(sortQuery);
    
    res.json({
      success: true,
      message: 'Lấy danh sách đơn hàng thành công!',
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Lấy đơn hàng theo ID (GET /api/orders/:id)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Tạo đơn hàng mới (POST /api/orders) + Validation nâng cao
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount } = req.body;

    // Validation: Kiểm tra totalAmount phải bằng tổng (quantity × unitPrice)
    if (items && items.length > 0) {
      const calculatedTotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      if (totalAmount !== calculatedTotal) {
        return res.status(400).json({
          success: false,
          message: `Lỗi tính toán: Tổng tiền (totalAmount) không khớp. Số tiền đúng phải là: ${calculatedTotal}`
        });
      }
    }

    const order = new Order({
      customerName,
      customerEmail,
      items,
      totalAmount
    });

    const newOrder = await order.save();
    res.status(201).json({
      success: true,
      message: 'Tạo đơn hàng thành công!',
      data: newOrder
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 4. Cập nhật trạng thái đơn hàng (PUT /api/orders/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    
    res.json({
      success: true,
      message: 'Cập nhật đơn hàng thành công!',
      data: updatedOrder
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 5. Xóa đơn hàng (DELETE /api/orders/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    
    res.json({ success: true, message: 'Đã xóa đơn hàng thành công!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
