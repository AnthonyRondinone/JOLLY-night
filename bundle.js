/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(4);

var _player2 = _interopRequireDefault(_player);

var _ghoul = __webpack_require__(5);

var _ghoul2 = _interopRequireDefault(_ghoul);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.players = [];
    this.ghouls = [];
  }

  _createClass(Game, [{
    key: 'add',
    value: function add(object) {
      if (object instanceof _player2.default) {
        this.players.push(object);
      } else if (object instanceof _ghoul2.default) {
        this.ghouls.push(object);
      }
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      return [].concat(this.players, this.ghouls);
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer() {
      var anthonyCharImg = new Image();
      anthonyCharImg.src = 'assets/rondsprite.png';

      var anthonyCharOptions = {
        width: 3197,
        height: 2656,
        image: anthonyCharImg,
        dx: 300,
        dy: 350,
        numberOfFrames: 8,
        spriteAnimationRows: 8,
        game: this
      };

      var anthony = new _player2.default(anthonyCharOptions);

      this.add(anthony);

      return anthony;
    }
  }, {
    key: 'addGhouls',
    value: function addGhouls() {
      var ghoulImg = new Image();
      ghoulImg.src = 'assets/gool.png';
      var ghoulCollided = new Image();
      ghoulCollided.src = 'assets/goolCollided.png';

      var ghoulStartDx = [-20, 1000][Math.floor(Math.random() * 2)];
      var ghoulOptions = {
        image: ghoulImg,
        altImage: ghoulCollided,
        sx: 0,
        sy: 0,
        sWidth: 265,
        sHeight: 263,
        dx: ghoulStartDx,
        startSide: ghoulStartDx,
        dy: Math.floor(Math.random() * (420 - 400) + 400),
        dWidth: 265 / 1.5,
        dHeight: 263 / 1.5,
        speed: Math.floor(Math.random() * 2.5) + 1,
        game: this
      };

      var newGhoul = new _ghoul2.default(ghoulOptions);

      this.add(newGhoul);
      return newGhoul;
    }
  }, {
    key: 'ghoulsOnParade',
    value: function ghoulsOnParade() {
      var _this = this;

      setInterval(function () {
        _this.addGhouls();
      }, 900);
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision() {
      var player = this.players[0];
      var ghouls = this.ghouls;
      for (var i = 0; i < ghouls.length; i++) {
        var ghoul = ghouls[i];
        if (ghoul.isCollidedWith(player)) {
          player.collision(ghoul);
        }
      }
    }
  }, {
    key: 'isOutOfBounds',
    value: function isOutOfBounds(posX) {
      return posX < -100 || posX > Game.DIM_X + 100;
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
      this.scoreDraw(ctx);
    }
  }, {
    key: 'scoreDraw',
    value: function scoreDraw(ctx) {
      ctx.font = '60px Slackey';
      ctx.fillText('SCORE', 50, 120);
      ctx.fillText(this.players[0].score, 330, 120);
      ctx.fillStyle = 'white';
    }
  }, {
    key: 'endDraw',
    value: function endDraw(ctx) {
      ctx.font = '95px Slackey';
      ctx.fillText('Nice Try!', 300, 230);
      ctx.fillText(this.players[0].score, 500, 330);
      ctx.fillText('Ghouls', 360, 430);
      ctx.fillStyle = 'white';
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects() {
      this.allObjects().forEach(function (object) {
        object.move();
      });
    }
  }, {
    key: 'step',
    value: function step() {
      this.moveObjects();
      this.checkCollision();
    }
  }, {
    key: 'remove',
    value: function remove(ghoul) {
      this.ghouls.splice(this.ghouls.indexOf(ghoul), 1);
    }
  }, {
    key: 'replace',
    value: function replace(ghoul) {
      ghoul.image = ghoul.altImage;
    }
  }]);

  return Game;
}();

Game.DIM_X = 1035;
Game.DIM_Y = 700;

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
  function Sprite(options) {
    _classCallCheck(this, Sprite);

    this.ctx = options.ctx;
    this.image = options.image;
    this.sx = options.sx;
    this.sy = options.sy;
    this.sWidth = options.sWidth;
    this.sHeight = options.sHeight;
    this.dx = options.dx;
    this.dy = options.dy;
    this.dWidth = options.dWidth;
    this.dHeight = options.dHeight;
    this.game = options.game;
  }

  _createClass(Sprite, [{
    key: "collideWith",
    value: function collideWith(otherObject) {}
  }, {
    key: "draw",
    value: function draw(ctx) {

      ctx.drawImage(this.image, this.sx, // source x
      this.sy, //source y
      this.sWidth, //source width
      this.sHeight, // source height
      this.dx, // destination x
      this.dy, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.image.onload = function () {
        _this.context.drawImage(_this.image, _this.sx, // source x
        _this.sy, //source y
        _this.sWidth, //source width
        _this.sHeight, // source height
        _this.dx, // destination x
        _this.dy, // destination y
        _this.dWidth, // destination width
        _this.dHeight // destination height
        );
      };
    }
  }]);

  return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx, playingMusic, deadAudio, modalMusic) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    // this.player = this.game.addPlayer();
    // this.game.ghoulsOnParade();
    // this.willRender = true;
    // this.playingMusic = playingMusic;
    // this.deadAudio = deadAudio;
    // this.modalMusic = modalMusic;
    this.modal = "open";
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.player = this.game.addPlayer();
      this.game.ghoulsOnParade();
      this.playingMusic = playingMusic;
      this.deadAudio = deadAudio;
      this.modalMusic = modalMusic;

      document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
          case 37:
            // left
            _this.player.moveBool.left = true;
            _this.player.direction = "left";
            _this.player.animationSelector = 4;
            break;
          case 39:
            // right
            _this.player.moveBool.right = true;
            _this.player.direction = "right";
            _this.player.animationSelector = 0;
            break;
        }
      });

      document.addEventListener('keypress', function (e) {
        switch (e.keyCode) {
          case 32:
            // punch
            _this.player.punch();
            break;
          case 115:
            _this.player.alive = true;
            break;
        }
      });

      document.addEventListener('keyup', function (e) {

        switch (e.keyCode) {
          case 37:
            // left
            _this.player.moveBool.left = false;
            break;
          case 39:
            // right
            _this.player.moveBool.right = false;
            break;
        }
      });
      this.playingMusic.play();
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.game.step();
      this.game.draw(this.ctx);
      if (this.player.alive) {
        requestAnimationFrame(this.animate.bind(this));
      }
      if (!this.player.alive) {

        this.deadAudio.play();
        this.playingMusic.pause();
        this.game.endDraw(this.ctx);
        var scope = this;
        window.setTimeout(function () {
          scope.callStartModal(scope);
          document.addEventListener('keypress', window.startGame);
        }, 3400);
      }
    }
  }, {
    key: 'callStartModal',
    value: function callStartModal(scope) {
      this.modal = "open";
      var startModal = document.getElementsByClassName('start-modal');
      [].forEach.call(startModal, function (el) {
        el.className = el.className.replace('hidden', 'show');
      });
      this.modalMusic.currentTime = 0;
      scope.modalMusic.play();
    }
  }, {
    key: 'closeStartModal',
    value: function closeStartModal() {
      this.modal = "close";
      var startModal = document.getElementsByClassName('start-modal');
      [].forEach.call(startModal, function (el) {
        el.className = el.className.replace('show', 'hidden');
      });
      playingMusic.currentTime = 0;
      modalMusic.pause();
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(2);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var playingMusic = document.getElementById('playingMusic');
  var deadAudio = document.getElementById('deadAudio');
  var modalMusic = document.getElementById('modalMusic');

  var game = new _game2.default();
  var gameView = new _game_view2.default(game, ctx);
  modalMusic.play();

  window.startGame = function (e) {
    if (e.keyCode === 13) {
      var newGame = new _game2.default();
      gameView.game = newGame;
      gameView.closeStartModal();
      gameView.start();
      document.removeEventListener('keypress', window.startGame);
    }
  };

  document.addEventListener('keypress', window.startGame);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _sprite = __webpack_require__(1);

var _sprite2 = _interopRequireDefault(_sprite);

var _game_view = __webpack_require__(2);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Sprite) {
  _inherits(Player, _Sprite);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.alive = true;
    _this.ctx = options.ctx;
    _this.image = options.image;
    _this.width = options.width;
    _this.height = options.height;
    _this.dx = options.dx;
    _this.dy = options.dy;
    _this.numberOfFrames = options.numberOfFrames;
    _this.spriteAnimationRows = options.spriteAnimationRows;
    _this.spriteAnimationCounter = 0;
    _this.animationSelector = 1;
    _this.frameIndex = 0;
    _this.ticksPerFrame = 2;
    _this.frameWidth = _this.width / options.numberOfFrames;
    _this.frameHeight = _this.height / options.spriteAnimationRows;
    _this.direction = "idle";
    _this.prevAnimation = null;
    _this.action = null;
    _this.score = 0;
    _this.moveBool = {
      left: false,
      right: false
    };
    return _this;
  }

  _createClass(Player, [{
    key: 'ghoulFall',
    value: function ghoulFall(ghoul) {
      if (ghoul.image.src === ghoul.altImage.src) {
        ghoul.dy = 150;
      }
    }
  }, {
    key: 'collision',
    value: function collision(ghoul) {
      if (this.action === "punch") {
        if (ghoul.image !== ghoul.altImage) {
          this.score += 1;
        }
        this.game.replace(ghoul);
        this.ghoulFall(ghoul);
      } else if (this.action === null && ghoul.image !== ghoul.altImage) {
        this.dead();
      }
    }
  }, {
    key: 'dead',
    value: function dead() {
      if (this.animationSelector === 0 || this.animationSelector === 1) {
        this.animationSelector = 3;
      } else if (this.animationSelector === 4 || this.animationSelector === 5) {
        this.animationSelector = 7;
      }
      this.frameIndex = 4;
      this.alive = false;
    }
  }, {
    key: 'setIdleDirection',
    value: function setIdleDirection(direction) {
      if (direction === "right") {
        this.animationSelector = 1;
      } else if (direction === "left") {
        this.animationSelector = 5;
      }
    }
  }, {
    key: 'punch',
    value: function punch() {
      if (this.action === null) {
        this.action = "punch";
        if (this.animationSelector !== 2 && this.animationSelector !== 6) {}
        if (this.direction === "right" || this.animationSelector === 1) {
          this.animationSelector = 2;
        } else if (this.direction === "left" || this.animationSelector === 5) {
          this.animationSelector = 6;
        }
        this.spriteAnimationCounter = 0;
        this.frameIndex = 0;
      }
    }
  }, {
    key: 'isOutOfBounds',
    value: function isOutOfBounds(dx) {
      return dx < 0 || dx > _game2.default.DIM_X;
    }
  }, {
    key: 'repositionAfterPunch',
    value: function repositionAfterPunch() {
      if (this.direction === "right" || this.direction === "left") {
        switch (this.animationSelector) {
          case 2:
            this.animationSelector = 0;
            break;
          case 6:
            this.animationSelector = 4;
            break;
        }
      }
      if (this.direction === "idle") {
        switch (this.animationSelector) {
          case 2:
            this.animationSelector = 1;
            break;
          case 6:
            this.animationSelector = 5;
            break;
        }
      }
    }
  }, {
    key: 'move',
    value: function move() {
      this.spriteAnimationCounter += 1;
      if (this.action === "punch" && this.frameIndex === 7) {
        this.spriteAnimationCounter = 0;
        this.frameIndex = 0;
        this.action = null;
        this.repositionAfterPunch();
      }

      if (Object.values(this.moveBool).every(function (bool) {
        return bool === false;
      })) {
        this.setIdleDirection(this.direction);
        this.direction = "idle";
      }

      switch (this.direction) {
        case "left":
          // left
          if (this.dx > -150) {
            this.dx -= 5;
          }
          break;
        case "right":
          // right
          if (this.dx < 800) {
            this.dx += 5;
          }
          break;
        case "idle":
          this.dx = this.dx;
          break;
      }

      if (this.spriteAnimationCounter > this.ticksPerFrame) {
        this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
        this.spriteAnimationCounter = 0;
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.frameIndex * this.frameWidth, // source x
      this.animationSelector * this.frameHeight, //source y
      this.frameWidth, //source width
      this.frameHeight, // source height
      this.dx, // destination x
      this.dy, // destination y
      this.width / this.numberOfFrames, // destination width
      this.height / 8 // destination height
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.image.onload = function () {
        _this2.context.drawImage(_this2.image, _this2.width / _this2.numberOfFrames, // source x
        0, //source y
        _this2.width / _this2.numberOfFrames, //source width
        _this2.height / _this2.spriteAnimationRows, // source height
        _this2.dx, // destination x
        _this2.dy, // destination y
        _this2.width / _this2.numberOfFrames, // destination width
        _this2.height / _this2.spriteAnimationRows // destination height
        );
      };
    }
  }]);

  return Player;
}(_sprite2.default);

exports.default = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(1);

var _sprite2 = _interopRequireDefault(_sprite);

var _util = __webpack_require__(6);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ghoul = function (_Sprite) {
  _inherits(Ghoul, _Sprite);

  function Ghoul(options) {
    _classCallCheck(this, Ghoul);

    var _this = _possibleConstructorReturn(this, (Ghoul.__proto__ || Object.getPrototypeOf(Ghoul)).call(this, options));

    _this.altImage = options.altImage;
    _this.wobble = "up";
    _this.startSide = options.startSide;
    _this.speed = options.speed;
    return _this;
  }

  _createClass(Ghoul, [{
    key: 'move',
    value: function move() {
      if (this.startSide === -20) {
        this.dx += this.speed * 5;
      } else if (this.startSide === 1000) {
        this.dx -= this.speed * 5;
      }

      if (this.game.isOutOfBounds(this.dx)) {
        this.game.remove(this);
      }
    }
  }, {
    key: 'isCollidedWith',
    value: function isCollidedWith(player) {
      if (Util.distance(player.dx, this) > 20 && Util.distance(player.dx, this) < 40) {
        return true;
      }
      return false;
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.game.remove();
    }
  }]);

  return Ghoul;
}(_sprite2.default);

exports.default = Ghoul;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var distance = exports.distance = function distance(playerXPos, ghoul) {
  if (ghoul.startSide === -20) {
    return Math.abs(playerXPos + 70 - ghoul.dx);
  } else {
    return Math.abs(playerXPos + 170 - ghoul.dx);
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map