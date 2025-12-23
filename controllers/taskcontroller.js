const pool = require("../db");

/* =========================
   GET tasks (ONLY LOGGED USER)
========================= */
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/* =========================
   CREATE task (ONLY LOGGED USER)
========================= */
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority, status, due_date } = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks 
       (title, description, priority, status, due_date, user_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, description, priority, status, due_date || null, userId]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/* =========================
   UPDATE task (OWNER ONLY)
========================= */
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks 
       SET status = $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [status, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json("Not authorized");
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

/* =========================
   DELETE task (OWNER ONLY)
========================= */
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json("Not authorized");
    }

    res.json("Task deleted");
  } catch (err) {
    res.status(500).json("Server Error");
  }
  module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};

};
