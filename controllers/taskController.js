const pool = require("../db");

/* GET TASKS */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC",
      [req.user.id]
    );

    res.json(tasks.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

/* ADD TASK */
exports.addTask = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;

    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, priority, due_date, status, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, description, priority, due_date, "Pending", req.user.id]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

/* UPDATE TASK */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 AND user_id=$3",
      [status, id, req.user.id]
    );

    res.json("Task updated");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

/* DELETE TASK */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
      [id, req.user.id]
    );

    res.json("Task deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};
