let defaultPasswordOptions = {
  minPasswordLength: 10,
  passwordComponents: new Map([
    ['min', 'die Minimallänge (min. 10 Zeichen)'],
    ['uppercase', 'ein Grossbuchstabe'],
    ['lowercase', 'ein Kleinbuchstabe'],
    ['digits', 'eine Nummer'],
    ['symbols', 'ein Sonderzeichen']
  ])
};

export default Object.freeze(Object.assign({}, defaultPasswordOptions));
