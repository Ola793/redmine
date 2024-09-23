const randomizer = {
    randomName() {
      let name = "";
      let randomNumber = 0;
  
      do {
        randomNumber = this.randomNumber();
      } while (randomNumber < 2 || randomNumber >= 20);
  
      while (name.length < randomNumber) {
        name += String.fromCharCode(97 + this.randomNumber());
      }
  
      let firstLetter = String(name.split("")[0].toUpperCase());
      let nameArr = name.split("");
  
      nameArr.shift();
  
      return firstLetter + nameArr.join("");
    },
  
    randomLastName() {
      return this.randomName();
    },

    randomLogin() {
      return this.randomName();
    },

    randomPassword() {
      return `${this.randomName()}${this.randomNumber()}`.length >= 8 ? `${this.randomName()}${this.randomNumber()}` : this.randomPassword();
    },
  
    randomEmail() {
      return `${this.randomName()}${this.randomNumber()}@gmail.com`;
    },
  
    randomNumber() {
      return Math.floor(Math.random() * 26);
    },

    randomWord() {
      return this.randomName();
    }
  };
  
  export default randomizer;