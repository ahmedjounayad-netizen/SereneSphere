const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let supporters = [
    { name: 'Jounayad Ahmed', coffees: 10, badge: '👑 Legend Supporter' },
    { name: 'Ayaan', coffees: 5, badge: '⭐ Elite Patron' }
];

app.get('/api/supporters', (req, res) => {
    supporters.sort((a, b) => b.coffees - a.coffees);
    res.json(supporters);
});

app.post('/api/add-supporter', (req, res) => {
    const { name, coffees } = req.body;
    const coffeeCount = parseInt(coffees) || 1;

    if (name) {
        let badge = '☕ Supporter';
        if (coffeeCount >= 10) badge = '👑 Legend Supporter';
        else if (coffeeCount >= 5) badge = '⭐ Elite Patron';

        supporters.push({ name, coffees: coffeeCount, badge });
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Name is required!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
