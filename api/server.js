const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.text());  // parse text

app.post('/api/count-words', (req, res) => {
    const { body } = req; // listening for a POST req from axios via text component
    const result = count_words(body); // use the request to count the words
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function count_words(file) { // kinda translated my python function here...... cause i hate js
    const text = typeof file === 'string' ? file : '';
    const cleanedText = text.replace(/[^a-zA-Z0-9&/ ]+/g, ''); // only permit ampersand, "/" for dates, and alphanumeric
    const words = cleanedText.match(/(?:\d{2}\/\d{2}\/\d{4}|[\w&]+(?:['-]\w+)?)/g) || []; // i hate this
    const word_lens = words.map(word => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(word)) {
            return word.length;
        } else {
            return word.length;
        }
    });

    const word_count = words.length;
    const sum_lens = word_lens.reduce((sum, len) => sum + len, 0);
    const avg_len = sum_lens / word_count;

    const freq_lens = {};
    word_lens.forEach(length => {
        freq_lens[length] = (freq_lens[length] || 0) + 1;
    });

    const word_lens_counts = {};
    [...new Set(word_lens)].sort((a, b) => a - b).forEach(length => {
        word_lens_counts[`Number of words of length ${length}`] = freq_lens[length];
    });

    const max_freq = Math.max(...Object.values(freq_lens));
    const most_freq_lens = Object.keys(freq_lens).filter(length => freq_lens[length] === max_freq);
    const most_freq_lens_str = most_freq_lens.join(' & '); // make it pretty

    return {
        'Word count': word_count,
        'Average word length': parseFloat(avg_len.toFixed(3)),
        'Number of words of length': word_lens_counts,
        'The most frequently occurring word length is': most_freq_lens_str,
    };
}

module.exports = app;