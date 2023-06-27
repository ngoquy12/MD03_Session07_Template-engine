const express = require("express");

const app = express();

const port = 8000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    age: 21,
  },
];

const message = "Đây là nội dung được đổ ra từ file index.ejs";

app.get("/", (req, res) => {
  res.render("index", { users });
});

// Lấy thông tin một user theo id
app.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  // Lấy thông tin user theo id trong mảng users
  const user = users.find((u) => u.id === +id);
  res.render("detail", { user });
  res.redirect("/");
});

// Xóa thông tin một user theo id
app.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  // Lấy vị trí của user trong mảng
  const indexUser = users.findIndex((u) => u.id === +id);
  // Cắt mảng
  users.splice(indexUser, 1);
  // Chuyển trang
  res.redirect("/");
});

// Hiện form
app.get("/form-add", (req, res) => {
  res.render("form-add");
});

// Lấy dữ liệu
app.post("/create", (req, res) => {
  const id = users.length + 1;
  const { name, age } = req.body;
  const newUser = {
    id: id,
    name: name,
    age: age,
  };
  // push dữ liệu vào mảng
  users.push(newUser);
  // Chuyển về trang chủ
  res.redirect("/");
});

// Câpj nhật thông tin user theo id
app.get("/edit-user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === +id);
  res.render("form-edit", { user });
});

app.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  console.log(name, age);
  // Lấy thông tin user theo id
  const user = users.find((u) => u.id === +id);
  // Gán lại dữ liệu
  user.name = name;
  user.age = age;
  // Chuyển hướng về trang chủ
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
