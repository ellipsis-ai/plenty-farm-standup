function(channel, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis).actions;
const ActionLogs = require('action-logs')(ellipsis);
const moment = require('moment-timezone');
const RandomResponse = require('ellipsis-random-response');
const greeting = RandomResponse.greetingForTimeZone(ellipsis.team.timeZone);

const userId = ellipsis.event.user.ellipsisUserId;

ActionLogs.logsFor('Check standup status', null, null, userId, 'scheduled').then(allQuestionLogs => {
  const questionLogs = ActionLogs.mostRecentPerUserInChannel(allQuestionLogs, channel);
  if (questionLogs.length) {
    const lastAskedTimestamp = moment(questionLogs[0].timestamp).toDate();
    ActionLogs.logsFor('Answer status questions', lastAskedTimestamp, null, userId).then(allAnswerLogs => {
      const answerLogs = ActionLogs.mostRecentPerUserInChannel(allAnswerLogs, channel);
      if (answerLogs.length) {
        ellipsis.noResponse(); // already answered
      } else {
        const args = [{ name: "channel", value: channel }];
        const response = `
${greeting}
Just checking in again with standup questions for ${channel}. Click the button when you’re ready to answer.`;
        ellipsis.success(response, {
          choices: [{
            label: "Answer now",
            actionName: "Answer status questions",
            args: args
          }]
        });
      }
    });
  } else {
    ellipsis.noResponse(); // wasn't asked
  }
});
}
