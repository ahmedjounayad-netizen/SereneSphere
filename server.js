const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// কফি হিরোস লিডারবোর্ড ডেটা (যে যত বেশি কাপ কফি বা পয়েন্ট দেবে, সে তত উপরে থাকবে)
let supporters = [
    { name: 'Jounayad Ahmed', coffees: 10, badge: '👑 Legend Supporter' },
    { name: 'Ayaan', coffees: 5, badge: '⭐ Elite Patron' },
    { name: 'Anonymous', coffees: 2, badge: '☕ Supporter' }
];

// সাপোর্টার লিস্ট ফেচ করা এবং সবচেয়ে বেশি দেওয়া ব্যক্তিকে উপরে সাজানো (Sorting)
app.get('/api/supporters', (req, res) => {
    supporters.sort((a, b) => b.coffees - a.coffees);
    res.json(supporters);
});

// নতুন সাপোর্টার যুক্ত করা
app.post('/api/add-supporter', (req, res) => {
    const { name, coffees } = req.body;
    const coffeeCount = parseInt(coffees) || 1;

    if (name) {
        // ব্যাচ নির্ধারণ লজিক
        let badge = '☕ Supporter';
        if (coffeeCount >= 10) badge = '👑 Legend Supporter';
        else if (coffeeCount >= 5) badge = '⭐ Elite Patron';

        supporters.push({ name, coffees: coffeeCount, badge });
        res.json({ success: true, message: 'Welcome to the Permanent Coffee Heroes Hall of Fame!' });
    } else {
        res.status(400).json({ success: false, message: 'Name is required!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
