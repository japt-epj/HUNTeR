import {numbers} from '../../config/hunterUiDefaults';
import {OK} from 'http-status-codes';
import {apiGetHandler} from '../hunterApiHandler';

export default {
  getLeaderBoard(executionId) {
    apiGetHandler.getLeaderBoard(executionId).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      let {leaderBoard, scoreList} = this.calculateLeaderBoard(resData.data);
      leaderBoard = this.checkMoreParticipants(leaderBoard, scoreList);
      this.setState({leaderBoard, loading: false});
    });
  },

  checkMoreParticipants(leaderBoard, scoreList) {
    if (this.state.teacher) {
      leaderBoard = leaderBoard.concat(scoreList);
    } else if (!leaderBoard.some(element => element[1].me)) {
      leaderBoard = leaderBoard.concat(scoreList.filter(element => element[1].me));
    }
    return leaderBoard;
  },

  calculateLeaderBoard(scoreData) {
    let ranking = {startPosition: 0, currentScore: -1};
    const scoreList = this.sortLeaderBoard(scoreData).map(element => {
      if (element[1].userScore !== ranking.currentScore) {
        ranking.currentScore = element[1].userScore;
        ranking.startPosition += 1;
      }
      element.ranking = ranking.startPosition;
      return element;
    });
    let leaderBoard = scoreList.splice(0, numbers.maxTrophyValue);
    return {leaderBoard, scoreList};
  },

  sortLeaderBoard(scoreData) {
    return Object.entries(scoreData).sort((a, b) => b[1].userScore - a[1].userScore || a[1].me);
  },
  getScore(rankingValue) {
    return (rankingValue * 100).toFixed(2) + '%';
  }
};
