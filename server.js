const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// স্ট্যাটিক ফোল্ডার (ফ্রন্টএন্ড ফাইলের জন্য)
app.use(express.static(path.join(__dirname, 'public')));

// কফি হিরো বা সাপোর্টার ডেটা এপিআই
let supporters = [
    { name: 'আহমেদ জুনায়েদ', coffee: '৩ কাপ ☕' },
    { name: 'বন্ধু শুভাকাঙ্ক্ষী', coffee: '১ কাপ ☕' }
];

app.get('/api/supporters', (req, res) => {
    res.json(supporters);
});

app.post('/api/add-supporter', (req, res) => {
    const { name, coffee } = req.body;
    if(name) {
        supporters.push({ name, coffee: coffee || '১ কাপ ☕' });
        res.json({ success: true, message: 'ধন্যবাদ! আপনার নাম যুক্ত হয়েছে।' });
    } else {
        res.status(400).json({ success: false, message: 'নাম আবশ্যক!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
