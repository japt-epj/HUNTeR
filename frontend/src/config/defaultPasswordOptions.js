let defaultPasswordOptions = {
  minPasswordLength: 10,
  listHeader: 'Dem Passwort fehlt: ',
  passwordComponents: new Map([
    ['min', 'die Minimallänge (min. 10 Zeichen)'],
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
  isPasswordWeek: {
    header: 'Schwaches Passwort',
    content: 'Das Passwort ist zu schwach gewählt, bitte richten Sie sich an die Vorgaben.'
  }
};

export default Object.freeze(Object.assign({}, defaultPasswordOptions));
