  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  const powerPelletRadius = 8;
  let score = 0;
  let gameOver = false;
  let pacAngle = 0;

  const maze = [  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 3, 1, 2, 1, 1],
    [1, 2, 2, 3, 1, 2, 2, 2, 2, 1],
    [1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 3, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 3, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 3, 3, 3, 1],
    [1, 2, 1, 2, 2, 2, 1, 2, 1, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];


  let pacManVelocityX = 1;
  let pacManVelocityY = 1;



  const blockSize = 50;
  const pelletRadius = 3;
  const mazeWidth = maze[0].length * blockSize;
  const mazeHeight = maze.length * blockSize;
  const pacManStartX = Math.floor(mazeWidth / 2 / blockSize) * blockSize + blockSize / 2;
  const pacManStartY = Math.floor(mazeHeight / 2 / blockSize) * blockSize + blockSize / 2;
  let pacManX = pacManStartX;
  let pacManY = pacManStartY;


// Define the ghost object
const ghost = {
  x: 0,
  y: 0,
  color: 'red',
  speed: 1,
  direction: 'right'
};

// Create an array of ghosts
const ghosts = [
  { x: 100, y: 100, color: 'red', speed: 1, direction: 'right' },
  
];





  let remainingPellets = 0;
  let initialPellets = 0;
  
  function drawMaze() {
    if (initialPellets === 0) {
      // Count the initial number of pellets
      for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
          const blockType = maze[row][col];
          if (blockType === 2) {
            initialPellets++;
          }
          else if (blockType === 3) {
            initialPellets++;
          }
        }
      }
      // Set the remaining pellets count to the initial number
      remainingPellets = initialPellets;
    }
  
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        const blockType = maze[row][col];
        const x = col * blockSize;
        const y = row * blockSize;
        if (blockType === 1) {
          // wall
          context.fillStyle = "blue";
          context.fillRect(x, y, blockSize, blockSize);
        } else if (blockType === 2) {
          // pellet
          context.fillStyle = "white";
          context.fillRect(x, y, blockSize, blockSize);
          context.beginPath();
          context.arc(x + blockSize / 2, y + blockSize / 2, pelletRadius, 0, 2 * Math.PI);
          context.fillStyle = "orange";
          context.fill();
          context.closePath();
        } else if (blockType === 3) {
          // power pellet
          context.fillStyle = "white";
          context.fillRect(x, y, blockSize, blockSize);
          context.beginPath();
          context.arc(x + blockSize / 2, y + blockSize / 2, powerPelletRadius, 0, 2 * Math.PI);
          context.fillStyle = "red";
          context.fill();
          context.closePath();
        }
      }
    }
     // Draw the ghosts
  ghosts.forEach(ghost => {
    // Generate random coordinates inside the maze walls
    do {
      ghost.x = blockSize + Math.floor(Math.random() * (canvas.width - 2 * blockSize));
      ghost.y = blockSize + Math.floor(Math.random() * (canvas.height - 2 * blockSize));
    } while (maze[Math.floor(ghost.y / blockSize)][Math.floor(ghost.x / blockSize)] !== 0);

    // Draw the ghost
    context.beginPath();
    context.arc(ghost.x, ghost.y, blockSize / 2, 0, 2 * Math.PI);
    context.fillStyle = ghost.color;
    context.fill();
    context.closePath();
  });
    // Display the score
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText(`Score: ${score}`, 20, 30);
    context.fillText(`Pellets: ${remainingPellets}`, 150, 30);
  
    // Check if there are no more pellets left
    if (remainingPellets === 0) {
      // Stop the game
      gameOver = true;
      // Display the message
      context.fillStyle = "red";
      context.font = "40px Arial";
      context.fillText("YOU WON!", canvas.width / 2 - 100, canvas.height / 2);
    }
  }
  

  

  // Create the moveGhosts function
function moveGhosts() {
  ghosts.forEach(ghost => {
    // Calculate the distance between the ghost and Pacman
    const distX = pacManX - ghost.x;
    const distY = pacManY - ghost.y;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    // Calculate the direction towards Pacman
    const dirX = distX / distance;
    const dirY = distY / distance;

    // Move the ghost towards Pacman
    ghost.x += dirX * ghost.speed;
    ghost.y += dirY * ghost.speed;
  });
}
  
  function drawPacMan() {
    // Draw PacMan
    context.beginPath();
    context.arc(pacManX, pacManY, blockSize / 2, 0.25 * Math.PI + pacAngle, 1.75 * Math.PI + pacAngle);
    context.lineTo(pacManX, pacManY);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
    
  }
  function updatePacManPosition() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Update PacMan's position based on velocity
    const pacManSpeed = 2; // set the speed to a smaller value

      pacManX += pacManVelocityX/ pacManSpeed;
      pacManY += pacManVelocityY/ pacManSpeed;
  
    // Check for wall collisions
    const pacManTileX = Math.floor(pacManX / blockSize);
    const pacManTileY = Math.floor(pacManY / blockSize);
    if (maze[pacManTileY][pacManTileX] === 1) {
      // PacMan collided with a wall, move him back
      pacManX -= pacManVelocityX;
      pacManY -= pacManVelocityY;
    }
  
    // Check for screen edge collisions
    if (pacManX < blockSize / 2 || pacManX > mazeWidth - blockSize / 2 ||
        pacManY < blockSize / 2 || pacManY > mazeHeight - blockSize / 2) {
      // PacMan collided with the screen edge, move him back
      pacManX -= pacManVelocityX;
      pacManY -= pacManVelocityY;
    }
  // Check for pellet collisions
  if (maze[pacManTileY][pacManTileX] === 2 || maze[pacManTileY][pacManTileX] === 3) {
    // PacMan collided with a pellet
    if (maze[pacManTileY][pacManTileX] === 2) {
      // Regular pellet
      score += 10; // Increment the score
    } else {
      // Power pellet
      score += 50; // Increment the score
    }
    remainingPellets--; // Decrement the remaining pellets count
    maze[pacManTileY][pacManTileX] = 0; // Remove the pellet from the maze
    if (remainingPellets === 0) {
      // All pellets eaten, game over
      gameOver = true;
    }
  }
    drawMaze();
    drawPacMan();
  }
  

  document.addEventListener('keydown', (event) => {
    // Left arrow key
    if (event.key === 'ArrowLeft') {
      pacManVelocityX = -5;
      pacManVelocityY = 0;
      pacAngle = Math.PI;
      console.log('ArrowLeft');
    }
    // Up arrow key
    else if (event.key === 'ArrowUp') {
      pacManVelocityX = 0;
      pacManVelocityY = -5;
      pacAngle = -0.5 * Math.PI;
      console.log('ArrowUp');

    }
    // Right arrow key
    else if (event.key === 'ArrowRight') {
      pacManVelocityX = 5;
      pacManVelocityY = 0;
      pacAngle = 0;
      console.log('ArrowRight');

    }
    // Down arrow key
    else if (event.key === 'ArrowDown') {
      pacManVelocityX = 0;
      pacManVelocityY = 5;
      pacAngle = 0.5 * Math.PI;
      console.log('ArrowDown');

    }
  });

  function checkForPelletCollision() {
    const pacManTileX = Math.floor(pacManX / blockSize);
    const pacManTileY = Math.floor(pacManY / blockSize);

    // Check for pellet collision
    if (maze[pacManTileY][pacManTileX] === 2) {
      // PacMan collided with a pellet, remove it and update score
      maze[pacManTileY][pacManTileX] = 0;
      score++;
    } else if (maze[pacManTileY][pacManTileX] === 3) {
      // PacMan collided with a power pellet, remove it and update score
      maze[pacManTileY][pacManTileX] = 0;
      score++;

      // Start ghost fright mode
      frightenGhosts();
    }
  }

  function checkForPowerPelletCollision() {
    // Check if PacMan collided with a power pellet
    const pacManTileX = Math.floor(pacManX / blockSize);
    const pacManTileY = Math.floor(pacManY / blockSize);
    if (maze[pacManTileY][pacManTileX] === 3) {
      // PacMan collided with a power pellet, increase the score and remove the pellet
      score += 50;
      maze[pacManTileY][pacManTileX] = 0;
    }
  }
  function updateGhostPosition(ghost) {
    // move the ghost in a random direction
    const directions = ["up", "down", "left", "right"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    switch (randomDirection) {
      case "up":
        ghost.y -= blockSize;
        break;
      case "down":
        ghost.y += blockSize;
        break;
      case "left":
        ghost.x -= blockSize;
        break;
      case "right":
        ghost.x += blockSize;
        break;
    }
  
    // check for wall collisions
    const ghostTileX = Math.floor(ghost.x / blockSize);
    const ghostTileY = Math.floor(ghost.y / blockSize);
    if (maze[ghostTileY] && maze[ghostTileY][ghostTileX] === 1) {
      // ghost collided with a wall, move it back
      ghost.x -= (ghost.x % blockSize);
      ghost.y -= (ghost.y % blockSize);
    }
  }
  
  

  const ghost1 = {
    x: 1,
    y: 2,
    color: "red"
  };
  
  const ghost2 = {
    x: 3,
    y: 4,
    color: "blue"
  };
  function drawGhost(ghost) {
    const mazeCellSize = 40; // Size of each cell in the maze
    const randomX = Math.floor(Math.random() * mazeWidth); // Generate random x position
    const randomY = Math.floor(Math.random() * mazeHeight); // Generate random y position
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Generate random color
    
    // Draw ghost at random position with random color
    context.beginPath();
    context.fillStyle = randomColor;
    context.arc((randomX * mazeCellSize) + mazeCellSize/2, (randomY * mazeCellSize) + mazeCellSize/2, mazeCellSize/2, 0, 2*Math.PI);
    context.fill();
    
    // Update ghost object with random values
    ghost.x = randomX;
    ghost.y = randomY;
    ghost.color = randomColor;
  }

  
  
  
  // Define the game loop function
  function gameLoop() {
    // Draw the maze


  // Draw PacMan
  drawPacMan();
  // Update PacMan's position
  updatePacManPosition();


  // Check for pellet collision
  checkForPelletCollision();

  // Check for power pellet collision
  checkForPowerPelletCollision();

  // Update ghost positions
  updateGhostPosition(ghost1);
  updateGhostPosition(ghost2);
// Move the ghosts
moveGhosts();
  // Draw ghosts
  drawGhost(ghost1);
  drawGhost(ghost2);

  // Check for game over condition
  if (gameOver) {
    // Stop the game loop
    return;
  }

  // Call the game loop again
  requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();