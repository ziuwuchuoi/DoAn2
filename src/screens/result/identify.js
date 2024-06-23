// identifyRegions.js
const identifyRegionsIterative = matrix => {
  const regions = [];
  const visited = matrix.map(row => row.map(() => false));

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const dfs = start => {
    const stack = [start];
    const region = [];

    while (stack.length) {
      const [i, j] = stack.pop();
      if (
        i < 0 ||
        j < 0 ||
        i >= matrix.length ||
        j >= matrix[0].length ||
        matrix[i][j] === 0 ||
        visited[i][j]
      ) {
        continue;
      }

      visited[i][j] = true;
      region.push([i, j]);

      for (const [di, dj] of directions) {
        stack.push([i + di, j + dj]);
      }
    }

    return region;
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1 && !visited[i][j]) {
        const region = dfs([i, j]);
        if (region.length) {
          regions.push(region);
        }
      }
    }
  }

  return regions;
};

export default identifyRegionsIterative;
