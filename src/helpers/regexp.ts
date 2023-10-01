const RegExp = {
  leastOneLatinLetter: /(?=.*[A-Za-z]).{1,}/,
  leastOneDigit: /(?=.*\d).{1,}/,
  notSymbol: /^[^0-9!@#$%^&*()]+$/,
  leastEightCharacters: /[A-Za-z0-9]{8,}/,
  capitalized: /(?=.*[A-Z])/,
  numbers: /(?=.*[0-9])/,
  email:
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  postIndex: /^\d{6}$/,
};

export default RegExp;
