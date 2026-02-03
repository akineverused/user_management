import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { pool } from './db.js';


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const checkUser = async (req, res, next) => {
    console.log('HEADERS:', req.headers);
    const userId = req.headers['x-user-id'];
    console.log('USER ID HEADER:', userId);


    if (!userId) {
        return res.status(401).json({ error: 'No user' });
    }

    const result = await pool.query(
        `SELECT status FROM users WHERE id = $1`,
        [userId]
    );

    if (!result.rows.length) {
        return res.status(401).json({ error: 'User not found' });
    }

    if (result.rows[0].status === 'blocked') {
        return res.status(403).json({ error: 'Blocked' });
    }

    next();
};

app.get('/', (req, res) => {
    res.send('Backend works');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)`,
            [name, email, hash]
        );

        res.json({ message: 'Registered successfully' });

    } catch (e) {
        if (e.code === '23505') {
            return res.status(400).json({ error: 'Email already exists' });
        }

        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ error: 'User is blocked' });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        await pool.query(
            `UPDATE users SET last_login = NOW() WHERE id = $1`,
            [user.id]
        );

        res.json({
            userId: user.id,
            status: user.status
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/users', checkUser, async (req, res) => {
    const result = await pool.query(
        `SELECT id, name, email, status, last_login
     FROM users
     ORDER BY last_login DESC`
    );

    res.json(result.rows);
});

app.post('/unblock', checkUser, async (req, res) => {
    const { ids } = req.body;

    await pool.query(
        `UPDATE users SET status = 'active' WHERE id = ANY($1)`,
        [ids]
    );

    res.json({ ok: true });
});

app.post('/block', checkUser, async (req, res) => {
    const { ids } = req.body;

    await pool.query(
        `UPDATE users SET status = 'blocked' WHERE id = ANY($1)`,
        [ids]
    );

    res.json({ ok: true });
});

app.post('/delete', checkUser, async (req, res) => {
    const { ids } = req.body;

    await pool.query(
        `DELETE FROM users WHERE id = ANY($1)`,
        [ids]
    );

    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});