//create a game phaser class
export class Game extends Phaser.Scene {
    constructor() {
    super({ key: "game" });
    }

    init () {
        this.level = 1;
        this.score = 0;
    }

    preload () {
        this.load.image ("ball", "./assets/images/ball.png");
        this.load.image ("platform", "./assets/images/platform.png");
        this.load.image ("obstacle", "./assets/images/obstacle.png");
    }

    create () {
        this.physics.world.setBoundsCollision (true, true, true, false);
        this.platform =this.physics.add.sprite (400, 500, "platform").setImmovable();
        this.platform.body.allowGravity = false;

        this.ball =  this.physics.add.sprite (400, 0, "ball");
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ballVelocity = 200;
        this.ball.setVelocity(this.ballVelocity, this.ballVelocity)

        this.obstacle = this.physics.add.staticGroup ();

        //collider between ball and platform
        this.physics.add.collider(
            this.platform,
            this.ball,
            this.bounce,
            null,
            this
        )

        this.physics.add.collider(
            this.obstacle,
            this.ball
            );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text (16, 16, "Score: 0", { fontSize: '20px', fill: '#fff' });
        this.levelText = this.add.text(16, 40, "Level: 1", { fontSize: '20px', fill: '#fff' })
    }


    bounce (ball, platform) {
    this.score += 1;
    this.scoreText.setText ("score: " + this.score);
}

nextLevel() {
    this.level++;
    this.levelText.setText("level: " + this.level);

    this.ballVelocity = this.ballVelocity * 1.1;

    // Reiniciar elementos del juego
    this.platform.setPosition(400, 500);
    this.ball.setPosition(400, 0);
    this.ball.setVelocity(this.ballVelocity, this.ballVelocity);
    this.score = 0;
    this.scoreText.setText("score: " + this.score);

    let randomObstaclex = Phaser.Math.Between(10, 790);
    let randomObstacley = Phaser.Math.Between(10, 300);
    let randomObstacleScale = Phaser.Math.Between(1, 3);

    ;
    this.obstacle.create(randomObstaclex, randomObstacley, "obstacle").setScale(randomObstacleScale).refreshBody();

    if (this.level === 20) {
        this.showWinMessage();
    }
}

showWinMessage() {
    this.add.text(400, 300, "¡Has ganado!", {
        fontSize: '48px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    this.ball.disableBody(true, true);
    this.platform.disableBody(true, true);
}

showLoseMessage () {
    this.add.text(400, 300, "¡Has perdido!", {
        fontSize: '48px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    this.ball.disableBody(true, true);
    this.platform.disableBody(true, true);
}


    update () {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-400);
        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(400);
        } else {
            this.platform.setVelocityX(0);
        }

        if (this.score >= 10) {
        this.nextLevel ();
        }

        if (this.ball.y > 550) {
            this.showLoseMessage();
        }
    }
}