// ⚠️ Этот файл НЕ нужен для самой открытки!
// Открытка работает и без него — достаточно открыть index.html.
// Он нужен только для локального предпросмотра (npm run dev).
// Это простой сервер на чистом Node.js без единой библиотеки.

const http = require("http");
const fs = require("fs");
const path = require("path");

// Читаем аргументы --port и --host (их может передать команда запуска)
function getArg(name, fallback) {
  const index = process.argv.indexOf("--" + name);
  if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1];
  return fallback;
}

const PORT = Number(getArg("port", process.env.PORT || 7100));
const HOST = getArg("host", "0.0.0.0");

// Какой тип содержимого отдавать для каждого расширения файла
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  // Если открыли просто "/", отдаём index.html
  let filePath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Файл не найден");
      return;
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { "Content-Type": TYPES[ext] || "text/plain; charset=utf-8" });
    res.end(data);
  });
});