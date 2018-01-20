var game = new Phaser.Game(960, 640, Phaser.AUTO, 'juego');

// GEnera el tamaño del juego 960 x 640
// Genera una etiqueta canvas

var WinnerState = {
  preload: function(){
    this.load.image('background', 'assets/fondo.png')
    this.load.image('exit', 'assets/exit.png' )
    this.load.image('animacion', 'assets/win.gif')
    this.load.audio( 'mainAudio', 'assets/audio/loop.mp3')
  },
  create: function(){
    this.background = this.game.add.sprite( 0, 0, 'background' )
    this.audio = this.game.add.audio('mainAudio')
    this.audio.play();
    this.exit = this.game.add.button( 960, 640, 'exit', onClickExit, this, 2, 1, 0)
    this.exit.anchor.setTo( 1, 1.2 );
    this.exit.scale.setTo( 0.03)

    function onClickExit( sprite ){
      this.game.state.start('MenuState');
      this.gameAudio.pause();
    }

    this.animacion = this.game.add.sprite( game.world.centerX, game.world.centerY, 'animacion');
    this.animacion.anchor.setTo(0.5);

  },
  update: function(){

  }
}

// Loading cuando es la primera vez que se carga el juego
var PreloadState = {
  preload: function(){
    this.logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    this.preloadBar = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY +100, 'preloadBar')
    this.logo.anchor.setTo(0.5);
    this.load.setPreloadSprite( this.preloadBar );
  },
  create: function(){
    this.state.start( 'MenuState' );
  }
};

// Menú del juego
var MenuState = {
    preload: function() {
        this.load.image( 'logo', 'assets/logo.png');
        this.load.image( 'preloadBar', 'assets/preloadbar.png');
        game.load.spritesheet('button', 'assets/buttons/iniciar.png', 193, 71);
        this.load.image('background', 'assets/fondo.png');
        this.load.image( 'logo','assets/logo.png');
        this.load.image( 'buttonAbout', 'assets/buttons/about.png')
        this.load.audio( 'mainAudio', 'assets/audio/loop.mp3')

    },
    create : function () {
        this.game.stage.backgroundColor = '#ffe9af';
        this.logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        this.logo.anchor.setTo( 0.5 );
        this.button = this.game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        this.buttonAbout = this.game.add.button(game.world.centerX - 95, 450, 'buttonAbout', actionOnClickAbout, this, 2, 1, 0);

        function actionOnClick () {
          this.game.state.start('BootState');
          this.audio.pause();
        }

        function actionOnClickAbout(){
            this.game.state.start('AboutState');
            this.audio.pause();
        }

        //audio
        this.audio = this.game.add.audio('mainAudio')
        this.audio.play();

    }
};

// Juego mismo
var BootState = {
  init: function(){},
  preload: function (){
    this.game.stage.backgroundColor ='#fff';
    this.load.image('background', 'assets/fondo.png')
    this.load.image('char', 'assets/char.png')
    this.load.image('dados', 'assets/dado.png' )
    this.load.image('exit', 'assets/exit.png' )
    this.load.image('escalera', 'assets/escaleras.png')
    this.load.image('serpiente', 'assets/serpientes.png')
    this.load.audio( 'dadosAudio', 'assets/audio/dados.mp3')
    this.load.audio( 'gameAudio', 'assets/audio/game.mp3')
    this.contChar = 0;
    this.contGlobal = 0;
  },
  create: function(){
    //Variables
    this.cont = 0;
    this.globalOperador1 = 0;
    this.globalOperador2 = 0;
    this.operador = '';

    this.background = this.game.add.sprite( 0, 0, 'background' )
    this.text = this.game.add.text(250, 16, '', { fill: '#ffffff' });
    this.gameAudio = this.game.add.audio('gameAudio')
    this.gameAudio.play();

    //Personaje
    this.char = this.game.add.button( 230, 520, 'char', click, this, 2, 1, 0 );
    this.char.anchor.setTo( 0.2 );
    this.char.scale.setTo( -0.3, 0.3);
    this.char.alpha = 0.5;
    this.char.inputEnable = true;
    this.char.events.onInputDown.add(click, this);
    function click( sprite ){
      sprite.alpha = 1;
      console.log( "Do it" );
    }

    //Escaleras
    this.escalera1 = this.game.add.sprite( 625, 100, 'escalera' );
    this.escalera1.scale.setTo( 0.1 );

    this.escalera2 = this.game.add.sprite( 200, 100, 'escalera' );
    this.escalera2.scale.setTo( 0.1 );

    this.escalera3 = this.game.add.sprite( 515, 385, 'escalera' );
    this.escalera3.scale.setTo( 0.1 );

    this.escalera4 = this.game.add.sprite( 405, 240, 'escalera' );
    this.escalera4.scale.setTo( 0.1 );

    this.escalera5 = this.game.add.sprite( 200, 380, 'escalera' );
    this.escalera5.scale.setTo( 0.1 );

    //Serpientes

    this.serpiente1 = this.game.add.sprite( 600, 210, 'serpiente' );
    this.serpiente1.scale.setTo( 0.25 );

    this.serpiente2 = this.game.add.sprite( 240, 140, 'serpiente' );
    this.serpiente2.scale.setTo( 0.25 );

    this.serpiente3 = this.game.add.sprite( 745, 350, 'serpiente' );
    this.serpiente3.scale.setTo( 0.25 );
    //dados
    this.dadosAudio = this.game.add.audio('dadosAudio')
    this.dados = this.game.add.button( 0, 640, 'dados', onClickDados, this, 2, 1, 0 )
    this.dados.anchor.setTo( 0.0001, 1.2 );
    this.dados.scale.setTo( 0.1 );
    this.dados.alpha = 0.5;

    this.dados.onInputOver.add(over, this);
    this.dados.onInputOut.add(out, this);

    function over( sprite ){
      sprite.alpha = 1;
    }

    function out( sprite  ){
      sprite.alpha = 0.5;
    }

    function onClickDados(){
      this.cont = Math.floor((Math.random() * 6) + 1);
      this.text.text = 'El valor de tu dado es: ' + this.cont;
      this.dadosAudio.play();
      this.contGlobal += this.cont;

      this.globalOperador1 = Math.floor((Math.random() * 10) + 1);
      this.globalOperador2 = Math.floor((Math.random() * 13) + 1);
      if( this.contGlobal > 0 && this.contGlobal < 13 ){
        this.operador = '+';
      }
      if( this.contGlobal > 12 && this.contGlobal < 28 ){
        this.operador = '+';
      }
      if( this.contGlobal > 27 && this.contGlobal < 43 ){
        this.operador = '-';
      }
      if( this.contGlobal > 42 && this.contGlobal < 58 ){
        this.operador = '*';
      }
      if( this.contGlobal > 57 && this.contGlobal < 73 ){
        this.operador = '*';
      }
      if( this.contGlobal > 72 && this.contGlobal < 88 ){
        this.operador = '/';
      }
      if( this.contGlobal > 87 && this.contGlobal < 100 ){
        this.operador = '/';
      }
      var cadena = "Haz la siguiente operación: " + this.globalOperador1 + this.operador + this.globalOperador2;
      var name = prompt( cadena );
      switch( this.operador ){
        case '+':
          this.respuesta = this.globalOperador1 + this.globalOperador2;
        break;
        case '-':
          this.respuesta = this.globalOperador1 - this.globalOperador2;
        break;
        case '*':
          this.respuesta = this.globalOperador1 * this.globalOperador2;
        break;
        case '/':
          this.respuesta = this.globalOperador1 / this.globalOperador2;
        break;
      }
      if( name == this.respuesta ) {
        alert( "Correcto!");
      if( this.contGlobal > 100 ){
        this.contGlobal = 100 - this.contGlobal%100;
      }

       switch( this.contGlobal ){
          case 19:
          this.contGlobal = 36;
          break;
          case 25:
          this.contGlobal = 30;
          break;
          case 41:
          this.contGlobal = 11;
          break;
          case 51:
          this.contGlobal = 64;
          break;
          case 68:
          this.contGlobal = 38;
          break;
          case 84:
          this.contGlobal = 54;
          break;
          case 85:
          this.contGlobal = 90;
          break;
          case 77:
          this.contGlobal = 98;
          break;
       }


        switch( this.contGlobal ){
          case 1:
          this.char.x = 280;
          this.char.y = 520;
          break;
          case 2:
          this.char.x = 330;
          this.char.y = 520;
          break;
          case 3:
          this.char.x = 380;
          this.char.y = 520;
          break;
          case 4:
          this.char.x = 430;
          this.char.y = 520;
          break;
          case 5:
          this.char.x = 480;
          this.char.y = 520;
          break;
          case 6:
          this.char.x = 530;
          this.char.y = 520;
          break;
          case 7:
          this.char.x = 580;
          this.char.y = 520;
          break;
          case 8:
          this.char.x = 630;
          this.char.y = 520;
          break;
          case 9:
          this.char.x = 680;
          this.char.y = 520;
          break;
          case 10:
          this.char.x = 730;
          this.char.y = 520;
          break;
          case 11:
          this.char.x = 780;
          this.char.y = 520;
          break;
          case 12:
          this.char.x = 830;
          this.char.y = 520;
          break;
          case 13:
          this.char.x = 830;
          this.char.y = 450;
          break;
          case 14:
          this.char.x = 780;
          this.char.y = 450;
          break;
          case 15:
          this.char.x = 730;
          this.char.y = 450;
          break;
          case 16:
          this.char.x = 680;
          this.char.y = 450;
          break;
          case 17:
          this.char.x = 630;
          this.char.y = 450;
          break;
          case 18:
          this.char.x = 580;
          this.char.y = 450;
          break;
          case 19:
          this.char.x = 530;
          this.char.y = 450;
          break;
          case 20:
          this.char.x = 480;
          this.char.y = 450;
          break;
          case 21:
          this.char.x = 430;
          this.char.y = 450;
          break;
          case 22:
          this.char.x = 380;
          this.char.y = 450;
          break;
          case 23:
          this.char.x = 330;
          this.char.y = 450;
          break;
          case 24:
          this.char.x = 280;
          this.char.y = 450;
          break;
          case 25:
          this.char.x = 230;
          this.char.y = 450;
          break;
          case 26:
          this.char.x = 180;
          this.char.y = 450;
          break;
          case 27:
          this.char.x = 130;
          this.char.y = 450;
          break;
          case 28:
          this.char.x = 130;
          this.char.y = 380;
          break;
          case 29:
          this.char.x = 180;
          this.char.y = 380;
          break;
          case 30:
          this.char.x = 230;
          this.char.y = 380;
          break;
          case 31:
          this.char.x = 280;
          this.char.y = 380;
          break;
          case 32:
          this.char.x = 330;
          this.char.y = 380;
          break;
          case 33:
          this.char.x = 380;
          this.char.y = 380;
          break;
          case 34:
          this.char.x = 430;
          this.char.y = 380;
          break;
          case 35:
          this.char.x = 480;
          this.char.y = 380;
          break;
          case 36:
          this.char.x = 530;
          this.char.y = 380;
          break;
          case 37:
          this.char.x = 580;
          this.char.y = 380;
          break;
          case 38:
          this.char.x = 630;
          this.char.y = 380;
          break;
          case 39:
          this.char.x = 680;
          this.char.y = 380;
          break;
          case 40:
          this.char.x = 730;
          this.char.y = 380;
          break;
          case 41:
          this.char.x = 780;
          this.char.y = 380;
          break;
          case 42:
          this.char.x = 830;
          this.char.y = 380;
          break;
          case 43:
          this.char.x = 830;
          this.char.y = 310;
          break;
          case 44:
          this.char.x = 780;
          this.char.y = 310;
          break;
          case 45:
          this.char.x = 730;
          this.char.y = 310;
          break;
          case 46:
          this.char.x = 680;
          this.char.y = 310;
          break;
          case 47:
          this.char.x = 630;
          this.char.y = 310;
          break;
          case 48:
          this.char.x = 580;
          this.char.y = 310;
          break;
          case 49:
          this.char.x = 530;
          this.char.y = 310;
          break;
          case 50:
          this.char.x = 480;
          this.char.y = 310;
          break;
          case 51:
          this.char.x = 430;
          this.char.y = 310;
          break;
          case 52:
          this.char.x = 380;
          this.char.y = 310;
          break;
          case 53:
          this.char.x = 330;
          this.char.y = 310;
          break;
          case 54:
          this.char.x = 280;
          this.char.y = 310;
          break;
          case 55:
          this.char.x = 230;
          this.char.y = 310;
          break;
          case 56:
          this.char.x = 180;
          this.char.y = 310;
          break;
          case 57:
          this.char.x = 130;
          this.char.y = 310;
          break;
          case 58:
          this.char.x = 130;
          this.char.y = 240;
          break;
          case 59:
          this.char.x = 180;
          this.char.y = 240;
          break;
          case 60:
          this.char.x = 230;
          this.char.y = 240;
          break;
          case 61:
          this.char.x = 280;
          this.char.y = 240;
          break;
          case 62:
          this.char.x = 330;
          this.char.y = 240;
          break;
          case 63:
          this.char.x = 380;
          this.char.y = 240;
          break;
          case 64:
          this.char.x = 430;
          this.char.y = 240;
          break;
          case 65:
          this.char.x = 480;
          this.char.y = 240;
          break;
          case 66:
          this.char.x = 530;
          this.char.y = 240;
          break;
          case 67:
          this.char.x = 580;
          this.char.y = 240;
          break;
          case 68:
          this.char.x = 630;
          this.char.y = 240;
          break;
          case 69:
          this.char.x = 680;
          this.char.y = 240;
          break;
          case 70:
          this.char.x = 730;
          this.char.y = 240;
          break;
          case 71:
          this.char.x = 780;
          this.char.y = 240;
          break;
          case 72:
          this.char.x = 830;
          this.char.y = 240;
          break;
          case 73:
          this.char.x = 830;
          this.char.y = 170;
          break;
          case 74:
          this.char.x = 780;
          this.char.y = 170;
          break;
          case 75:
          this.char.x = 730;
          this.char.y = 170;
          break;
          case 76:
          this.char.x = 680;
          this.char.y = 170;
          break;
          case 77:
          this.char.x = 630;
          this.char.y = 170;
          break;
          case 78:
          this.char.x = 580;
          this.char.y = 170;
          break;
          case 79:
          this.char.x = 530;
          this.char.y = 170;
          break;
          case 80:
          this.char.x = 480;
          this.char.y = 170;
          break;
          case 81:
          this.char.x = 430;
          this.char.y = 170;
          break;
          case 82:
          this.char.x = 380;
          this.char.y = 170;
          break;
          case 83:
          this.char.x = 330;
          this.char.y = 170;
          break;
          case 84:
          this.char.x = 280;
          this.char.y = 170;
          break;
          case 85:
          this.char.x = 230;
          this.char.y = 170;
          break;
          case 86:
          this.char.x = 180;
          this.char.y = 170;
          break;
          case 87:
          this.char.x = 130;
          this.char.y = 170;
          break;
          case 88:
          this.char.x = 130;
          this.char.y = 110;
          break;
          case 89:
          this.char.x = 180;
          this.char.y = 110;
          break;
          case 90:
          this.char.x = 230;
          this.char.y = 110;
          break;
          case 91:
          this.char.x = 280;
          this.char.y = 110;
          break;
          case 92:
          this.char.x = 330;
          this.char.y = 110;
          break;
          case 93:
          this.char.x = 380;
          this.char.y = 110;
          break;
          case 94:
          this.char.x = 430;
          this.char.y = 110;
          break;
          case 95:
          this.char.x = 480;
          this.char.y = 110;
          break;
          case 96:
          this.char.x = 530;
          this.char.y = 110;
          break;
          case 97:
          this.char.x = 580;
          this.char.y = 110;
          break;
          case 98:
          this.char.x = 630;
          this.char.y = 110;
          break;
          case 99:
          this.char.x = 680;
          this.char.y = 110;
          break;
          case 100:
            this.game.state.start('WinnerState');
          break;


        }
      }else{
        alert( 'Te has equivocado :(')
      }
      }

      //Las operaciones aleatorias del juego :3
      function randomsOperations( ){

      }

    //Exit button
    this.exit = this.game.add.button( 960, 640, 'exit', onClickExit, this, 2, 1, 0)
    this.exit.anchor.setTo( 1, 1.2 );
    this.exit.scale.setTo( 0.03)

    function onClickExit( sprite ){
      this.game.state.start('MenuState');
      this.gameAudio.pause();
    }
  },
  update: function(){
    if( this.contChar % 5 == 0 && this.contChar < 201 ){
      this.char.alpha = this.char.alpha == 1 ? 0.5 : 1;
    }
    this.contChar++;




  }
};

// Nombre del equipo
var AboutState = {
  preload : function(){
    this.load.image( 'logo', 'assets/logo.png' )
    this.load.image('exit', 'assets/exit.png' )
  },
  create : function(){
    this.logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY-150, 'logo' )
    this.logo.scale.setTo( 0.25 )
    this.logo.anchor.setTo( 0.5)

    //Exit button
    this.exit = this.game.add.button( 960, 640, 'exit', onClickExit, this, 2, 1, 0)
    this.exit.anchor.setTo( 1, 1.2 );
    this.exit.scale.setTo( 0.03)

    function onClickExit( sprite ){
      this.game.state.start('MenuState');
    }

    //Text About
    var content = [
        "Programador",
        "Leonardo Velarde",
        " devsave.me",        
    ];

    var line = [];
    var wordIndex = 0;
    var lineIndex = 0;
    var wordDelay = 120;
    var lineDelay = 400;

    text = game.add.text(this.game.world.centerX-230, this.game.world.centerY-100, '', { font: "20px Arial", fill: "#000" });
    nextLine();

    function nextLine() {
      if (lineIndex === content.length){ return;  }
      line = content[lineIndex].split(' ');
      wordIndex = 0;
      game.time.events.repeat(wordDelay, line.length, nextWord, this);
      lineIndex++;
    }

    function nextWord() {
      text.text = text.text.concat(line[wordIndex] + " ");
      wordIndex++;
      if (wordIndex === line.length){
          //  Add a carriage return
          text.text = text.text.concat("\n");

          //  Get the next line after the lineDelay amount of ms has elapsed
          game.time.events.add(lineDelay, nextLine, this);
      }
    }
  }
}


game.state.add( 'MenuState', MenuState );
game.state.add( 'BootState', BootState );
game.state.add( 'PreloadState', PreloadState );
game.state.add( 'AboutState', AboutState );
game.state.add( 'WinnerState', WinnerState );
game.state.start( 'WinnerState' );
