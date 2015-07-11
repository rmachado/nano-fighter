var HEIGHT = 600, WIDTH = 800;
var ACC = 0.13, DEC = 0.03, MAX_SPEED = 10.0;
var MIN_X = 355, MAX_X = 635;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var background;
var player, cows;
var speed = 0.0;

function preload() {
  game.load.image('background', 'assets/background.png');
  game.load.image('car', 'assets/car.png');
  game.load.image('cow', 'assets/cow.png');

  game.load.audio('intro', 'assets/intro.ogg');
}

function create() {
  background = game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background');
  background.fixedToCamera = true;

  //var music = game.add.audio('intro');
  //music.play();

  player = game.add.sprite((MIN_X + MAX_X) / 2, HEIGHT - 100, 'car');
  player.anchor.x = 0.5;
  player.anchor.y = 0.5;

  cows = game.add.group();
  var cow_x = MIN_X + Math.random() * (MAX_X - MIN_X);
  cows.create(cow_x, 100, 'cow');
}

function update() {
  if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
    speed = Math.min(speed + ACC, MAX_SPEED);

  if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    player.position.x = Math.max(MIN_X, player.position.x - 3);

  if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    player.position.x = Math.min(MAX_X, player.position.x + 3);

  speed = Math.max(speed - DEC, 0.0);

  background.tilePosition.y += 2 * speed;
}
