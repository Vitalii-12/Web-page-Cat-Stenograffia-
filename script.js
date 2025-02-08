let cImage1 = null;
let Canvas1;
function loadImage() {
  let imgFile = document.getElementById("downloadfile1");
  cImage1 = new SimpleImage(imgFile);
  Canvas1 = document.getElementById("canvasik1");
  cImage1.drawTo(Canvas1);
}

let cImage2 = null;
let Canvas2;
function loadImageHide() {
  let imgFile = document.getElementById("downloadfile2");
  cImage2 = new SimpleImage(imgFile);
  Canvas2 = document.getElementById("canvasik2");
  cImage2.drawTo(Canvas2);
}

// Оголошення змінних зображень після обнулення їх початкових та кінцевих бітів
let finalImage1;
let finalImage2;

// Перевірка кнопок зміни
function Change() {
  if (
    cImage1 == null ||
    !cImage1.complete() ||
    cImage2 == null ||
    !cImage2.complete()
  ) {
    alert("load image picture and load image picture hide");
  }

  finalImage1 = chop2hide();
  finalImage1.drawTo(Canvas1);
  finalImage2 = shift();
  finalImage2.drawTo(Canvas2);
}

// Для першого зображення забераємо кінцеві біти
function clearbits(pixval) {
  let x = Math.floor(pixval / 16) * 16;
  return x;
}
function chop2hide() {
  for (let px of cImage1.values()) {
    px.setRed(clearbits(px.getRed()));
    px.setGreen(clearbits(px.getGreen()));
    px.setBlue(clearbits(px.getBlue()));
  }
  return cImage1;
}

// для другого зображення забераємо початкові біти
function clearbitsfirst(pixval) {
  let x = Math.floor(pixval / 16);
  return x;
}

function shift() {
  for (let px of cImage2.values()) {
    px.setRed(clearbitsfirst(px.getRed()));
    px.setGreen(clearbitsfirst(px.getGreen()));
    px.setBlue(clearbitsfirst(px.getBlue()));
  }
  return cImage2;
}

//Додавання пікселів кольорів зображення для приховування

function combine() {
  let answer = new SimpleImage(cImage1.getWidth(), cImage1.getHeight());
  for (let px of cImage1.values()) {
    let x = px.getX();
    let y = px.getY();
    let chop2hidePixel = cImage1.getPixel(x, y);
    let shiftPixel = cImage2.getPixel(x, y);
    px.setRed(chop2hidePixel.getRed() + shiftPixel.getRed());
    px.setGreen(chop2hidePixel.getGreen() + shiftPixel.getGreen());
    px.setBlue(chop2hidePixel.getBlue() + shiftPixel.getBlue());
  }
  let duoImage = document.getElementById("canvasik3");
  answer.drawTo(duoImage);
}

//Додавання функції на згортання і розгортання тексту при натисканні кнопки
function showText(el) {
  if (el.previousElementSibling.clientHeight === 80) {
    el.previousElementSibling.style.height = "100%";
    el.innerHTML = "ShowLess...";
  } else {
    el.previousElementSibling.style.height = "80px";
    el.innerHTML = "Read More...";
  }
}
