String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};



import fs from 'fs';

export default class Sass2Scss {

  constructor(filePath) {
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

  _getFileData(filePath) {
    return fs.readFileSync(filePath, 'utf8',  (err, data) => {
      if (err) throw err;
      return data
    });
  }

//--- Public Methods
  tokenize(){

    while(this.input && this.index < this.input.length) {
      this.currentToken = this.input[this.index];

      if (this.currentToken === this.lexemes.breakline) {
        this.output+= this.lexemes.endline;
      }

      this.output+= this.currentToken;
      this.index++;
    }
    console.log('OUTPUT', this.output);
  }
}











const sass2scss = new Sass2Scss('./sassFile.sass');
sass2scss.tokenize();
