import {numbers} from '../../config/hunterUiDefaults';

export default {
  checkPassword(password) {
    let passwordValidator = require('password-validator');
    let schema = new passwordValidator();
    schema
      .is()
      .min(numbers.minPasswordLength)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .symbols()
      .has()
      .not()
      .spaces();

    const validationResult = schema.validate(password, {list: true});
    const complexity = (5 - validationResult.length) / 5 * 100;
    return {validationResult, complexity};
  }
};
