// Cơ sở dữ liệu mô phỏng
let users = {
  "admin": "123456",
};

// Biến tạm để lưu user hiện tại
let currentUser = null;

// Hiển thị form tương ứng
function showBox(boxId) {
  document.querySelectorAll('.box').forEach(box => box.classList.remove('active'));
  document.getElementById(boxId).classList.add('active');
}

// ===== ĐĂNG NHẬP =====
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const status = document.getElementById("loginStatus");

  if (!user || !pass) {
    status.innerHTML = "⚠️ Vui lòng nhập đủ thông tin.";
    status.style.color = "yellow";
    return;
  }

  if (users[user] && users[user] === pass) {
    status.innerHTML = "✅ Đăng nhập thành công! Truy cập RADIUS...";
    status.style.color = "#00ff99";
    currentUser = user;

    setTimeout(() => {
      showBox("radiusBox");
      document.getElementById("processLog").innerHTML = `<b>Người dùng:</b> ${user}<br>Đã vào hệ thống RADIUS.`;
    }, 1200);
  } else {
    status.innerHTML = "❌ Các thông tin không hợp lệ, Server sẽ phản hồi lại Access-Reject để từ chối yêu cầu.";
    status.style.color = "#ff6666";
  }
}

// ===== ĐĂNG KÝ =====
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();
  const status = document.getElementById("registerStatus");

  if (!user || !pass || !confirm) {
    status.innerHTML = "⚠️ Vui lòng điền đầy đủ thông tin.";
    status.style.color = "yellow";
    return;
  }

  if (pass !== confirm) {
    status.innerHTML = "❌ Mật khẩu xác minh không khớp.";
    status.style.color = "red";
    return;
  }

  if (users[user]) {
    status.innerHTML = "⚠️ Tài khoản đã tồn tại.";
    status.style.color = "orange";
    return;
  }

  users[user] = pass;
  status.innerHTML = "✅ Đăng ký thành công! Vui lòng quay lại đăng nhập.";
  status.style.color = "#00ff99";
}

// ===== QUÊN MẬT KHẨU =====
function resetPassword() {
  const user = document.getElementById("forgotUser").value.trim();
  const pass = document.getElementById("newPass").value.trim();
  const confirm = document.getElementById("newConfirm").value.trim();
  const status = document.getElementById("forgotStatus");

  if (!user || !pass || !confirm) {
    status.innerHTML = "⚠️ Vui lòng nhập đủ thông tin.";
    status.style.color = "yellow";
    return;
  }

  if (pass !== confirm) {
    status.innerHTML = "❌ Mật khẩu xác minh không trùng khớp.";
    status.style.color = "red";
    return;
  }

  if (!users[user]) {
    status.innerHTML = "❌ Không tìm thấy tài khoản.";
    status.style.color = "red";
    return;
  }

  users[user] = pass;
  status.innerHTML = "✅ Cập nhật mật khẩu thành công!";
  status.style.color = "#00ff99";
}

// ===== MÔ PHỎNG QUY TRÌNH KẾ TOÁN RADIUS =====
function startSession() {
  const log = document.getElementById("processLog");
  log.innerHTML += "<br>📡 [1] Gửi gói Accounting Start → Server xác nhận bắt đầu phiên.";
}

function updateSession() {
  const log = document.getElementById("processLog");
  log.innerHTML += "<br>🔁 [2] Gửi gói Cập nhật Tạm thời (Interim-Update) → Server ghi nhận dữ liệu mới.";
}

function stopSession() {
  const log = document.getElementById("processLog");
  log.innerHTML += "<br>⛔ [3] Gửi gói Accounting Stop → Server ghi lại tổng thời gian và dữ liệu sử dụng.";
}

function logout() {
  currentUser = null;
  showBox("loginBox");
}
