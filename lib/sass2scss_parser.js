'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

var Sass2Scss = function () {
  function Sass2Scss(filePath) {
    _classCallCheck(this, Sass2Scss);

    this.index = 0;
    this.input = this._getFileData(filePath);
    this.output = '';
    this.lexemes = {
      char: 'qwertyuiopasdfghjklzcvbnm_-',
      separator: ':',
      endline: ';',
      breakline: '\n',
      value: '1234567890.'
    };
  }

  _createClass(Sass2Scss, [{
    key: '_getFileData',
    value: function _getFileData(filePath) {
      return _fs2.default.readFileSync(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        return data;
      });
    }

    //--- Public Methods

  }, {
    key: 'tokenize',
    value: function tokenize() {

      while (this.input && this.index < this.input.length) {
        this.currentToken = this.input[this.index];

        // console.log(this.currentToken, this.lexemes.breakline);
        if (this.currentToken === this.lexemes.breakline) {
          this.output += this.lexemes.endline;
          // this.output = this.input.splice(this.index, 0, this.lexemes.endline);
        }
        this.output += this.currentToken;
        this.index++;
      }
      console.log('OUTPUT', this.output);
    }
  }]);

  return Sass2Scss;
}();

exports.default = Sass2Scss;


var sass2scss = new Sass2Scss('./sassFile.sass');
sass2scss.tokenize();