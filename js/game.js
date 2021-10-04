class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.loopTimeOut = null;
        this.init();
    }

    init(){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        document.body.appendChild(this.canvas);

        // create the board
        this.board = new board(this);

        // get keyboard
        this.listenKeyBoard();

        // create the brick
        this.brick = new brick(this);

        // start the game
        this.startGame();

        // start the game loop
        this.loop();
    }

    startGame() {
        setInterval(() => {
            this.brick.fall();
        }, SPEED);
    }
    createNewBrick() {
        this.brick = new brick(this);
    }

    listenKeyBoard() {
        document.addEventListener('keydown', (e) => {
            switch(e.code){
                case 'ArrowLeft':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                    this.brick.moveRight();
                    break;
                case 'ArrowUp':
                    this.brick.rotate();
                    break;
                case 'ArrowDown':
                    this.brick.moveDown();
                    break;
            }
        });
    }

    loop(){
        // this.update();
        // this.draw();
        // this.loopTimeOut = setTimeout(() => this.loop(), 30);
        if(this.board.isGameOver) {
            document.querySelector('.game-over').style.display = 'block';
            clearTimeout(this.loopTimeOut);
            setTimeout(() => {
                window.location.reload(true);
            }, 3000);
        } else {
            this.update();
            this.draw();
            this.loopTimeOut = setTimeout(() => this.loop(), 30);
        }
    }

    update(){
        
    }
    clearScreen() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    draw(){
        this.clearScreen();
        this.brick.draw();
        this.board.draw();
    }
}

var g = new game();