for (let i = 0; i <= 260; i++) {
  let x = i;
  const y = 520-3 * x;
  if (y % 1 === 0 && y > 0 && y < 20) {
    console.log('x：', x, '和', 'y：', y);
  }
}
