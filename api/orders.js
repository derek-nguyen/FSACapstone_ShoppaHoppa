const express = require('express');
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} = require('../db');

ordersRouter.use((req, res, next) => {
    console.log("A request has been made to /orders");

    next();
})

// Post /api/orders

ordersRouter.post('/orders', async (req, res) => {
    const {
        orderProdId,
        orderProdModelName,
        orderQTY,
        orderDate,
        orderTotalPrice,
        userIdOrder,
        orderStatus
    } = req.body;

    try {
        const newOrder = await createOrder(
            orderProdId,
            orderProdModelName,
            orderQTY,
            orderDate,
            orderTotalPrice,
            userIdOrder,
            orderStatus
        );

        return res.json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
});

// Get All Orders /api/orders

ordersRouter.get('/orders', async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.send(orders)

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Get /api/orders/:oderId

ordersRouter.get('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;
    console.log(orderId)

    try {
        const order = await getOrderById(orderId);
        if (order) {
            res.send(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Put/Patch api/orders/:orderId/status

ordersRouter.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = ordersRouter;