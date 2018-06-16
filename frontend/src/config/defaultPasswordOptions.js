let defaultPasswordOptions = {
  minPasswordLength: 8,
  minComplexity: 100,
  listHeader: 'Dem Passwort fehlt: ',
  passwordComponents: new Map([
    ['min', 'die Minimallänge (min. 8 Zeichen)'],
    ['uppercase', 'ein Grossbuchstabe'],
    ['lowercase', 'ein Kleinbuchstabe'],
    ['digits', 'eine Nummer'],
    ['symbols', 'ein Sonderzeichen']
  ]),
  currentPasswordError: {
    header: 'Altes Passwort falsch',
    content: 'Das alte Passwort war falsch.'
  },
  newPasswordError: {
    header: 'Altes Passwort falsch',
    content: 'Die Passwörter sind nicht identisch.'
  },
  isPasswordWeak: {
    header: 'Schwaches Passwort',
    content: 'Das Passwort ist zu schwach gewählt, bitte richten Sie sich an die Vorgaben.'
  }
};

export default Object.freeze(Object.assign({}, defaultPasswordOptions));
