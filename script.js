// Эта функция вызывается, когда мама нажимает на кнопку
function openCard() {

  // Находим на странице блок с поздравлением (у него id="message")
  var message = document.getElementById("message");

  // Убираем у него класс "hidden" — и блок становится видимым!
  message.classList.remove("hidden");

  // Находим кнопку и прячем её, чтобы не мешала
  var button = document.getElementById("openButton");
  button.style.display = "none";

  // Меняем подсказку над кнопкой
  var hint = document.querySelector(".hint");
  hint.textContent = "С праздником! 🎉";

  // Запускаем салют из сердечек 🎊
  launchHearts();
}

// Эта функция создаёт 20 летящих вверх сердечек
function launchHearts() {

  // Создаём 20 сердечек
  for (var i = 0; i < 20; i++) {

    // Создаём новый элемент на странице
    var heart = document.createElement("div");
    heart.textContent = "❤️";

    // Случайное место по горизонтали (от 0% до 100% ширины экрана)
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px"; // стартует снизу, за экраном

    // Случайный размер (от 20 до 50 пикселей)
    heart.style.fontSize = 20 + Math.random() * 30 + "px";

    // Анимация полёта вверх, от 2 до 4 секунд
    var duration = 2 + Math.random() * 2;
    heart.style.transition = "transform " + duration + "s linear, opacity " + duration + "s";

    // Добавляем сердечко на страницу
    document.body.appendChild(heart);

    // Через крошечную паузу запускаем полёт вверх
    setTimeout(function(h) {
      h.style.transform = "translateY(-120vh) rotate(360deg)";
      h.style.opacity = "0";
    }, 50, heart);

    // Когда анимация закончилась — удаляем сердечко со страницы
    setTimeout(function(h) {
      h.remove();
    }, duration * 1000, heart);
  }
}