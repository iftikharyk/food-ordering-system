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