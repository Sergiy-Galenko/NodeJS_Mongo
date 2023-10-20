const os = require("os");

// Платформа
console.log(os.platform()); //darwin

// Архитиктура
console.log(os.arch()); // arm64

// Информация
console.log(os.cpus());

// Свободна память
console.log(os.freemem());

// Сколько всего памяти
console.log(os.totalmem());

// Корневая деректория
console.log(os.homedir());

// Сколько система работатет
console.log(os.uptime());
