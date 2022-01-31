console.log("entra al proceso hijo");

process.on("message", (numero) => {
  console.log("Este es el numero que entra al child", numero);
  process.send({ data: createRandom(numero) });
});

function createRandom(num) {
  let random = [];
  let repeat = {};
  let inicio = 0;

  if (num) {
    inicio = Date.now();
    for (i = 0; i < num; i++) {
      random.push(Math.floor(1 + Math.random() * 1000));
    }
  } else {
    return 404;
  }
  random.sort();

  random.forEach((numero) => (repeat[numero] = (repeat[numero] || 0) + 1));

  console.log(
    `Tiempo de demora en calcular ${num} aleatorios`,
    (Date.now() - inicio) / 1000
  );

  return repeat;
}
