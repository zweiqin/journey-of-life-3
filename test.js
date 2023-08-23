for (let i = 0; i <= 355; i++) {
  let x = i;
  const y = (335-3 * x) / 2;
  if (y % 1 === 0 && y > 0 && y < 20) {
    console.log('x：', x, '和', 'y：', y);
  }
}
