const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;

// Here comes the middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

const orders = [];

// Testing route
app.get("/warmup", (req, res) => {
    res.status(200).json({
        message: "All ready to go !!"
    });
});

// List all orders
app.get("/get_orders", (req, res) => {
    res.status(200).send(orders);
});

// Create a new order
app.post("/new_order", (res, req) => {
    const order = req.body;

    if(order.food_name && order.customer_name && order.food_qty) {
        orders.push({
            ...order,
            id: `${orders.length + 1}`,
            date: Date.now().toString()
        })

        res.statusCode(200).json({
            message: "Order created successfully"
        });
    } else {
        res.statusCode(401).json({
            message: "Invaild Order creation"
        });
    }
});

// Update a order with id
app.patch("/order/:id", (req, res) => {
    const order_id = req.params.id;
    const order_update = req.body;

    for (let order of orders) {
        if (order.id == order_id) {
            if (order_update.food_name != null || undefined) {
                order.food_name = order_update.food_name;
            } else {
                res.status(404).json({
                    message: "food_name issue"
                });
            }

            if (order_update.food_qty != null || undefined) {
                order.food_qty = order_update.food_qty;
            } else {
                res.status(404).json({
                    message: "food_qty issue"
                });
            }

            if (order_update.customer_name != null || undefined) {
                order.customer_name = order_update.customer_name;
            } else {
                res.status(404).json({
                    message: "customer_name issue"
                });
            }

            return res.status(200).json({
                message: "Updated successfully", data: order
            });
        }
    }

    res.status(404).json({
        message: "invalid order id"
    });
});

app.delete("/order/:id", (req, res) => {
    const order_id = req.params.id;

    for (let order of orders) {
        if (order.id == order_id) {
            order.splice(orders.indexOf(order), 1);

            return res.status(200).json({
                message: "Deleted Successfully"
            });
        }
    }

    res.status(404).json({
        message: "invaild order id"
    });
});