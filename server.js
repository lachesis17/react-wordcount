const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); 
app.use(body_parser.json());

app.post('/count-words', (req, res) => {
  const {file} = req.body;
  const result = count_words(file);
  res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // double check the port
});

function count_words(file) { // kinda translated my python function here...... cause i hate js
    const words = file.match(/(?:\d{2}\/\d{2}\/\d{4}|[\w&]+(?:['-]\w+)?)|[\w&]+/g) || [];
    const word_lens = words.map(word => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(word)) {
            return word.length;
        } else {
            const cleaned = word.replace(/[.,!?*=[\]{}()#_@/:;£`~\\-]/g, '');
            return cleaned.length;
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