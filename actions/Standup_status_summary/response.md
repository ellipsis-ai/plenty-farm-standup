{if successResult.nobodyWasAsked}
Nobody was asked for that channel. You can set up a new standup using `@{ellipsis.team.botName} setup farm standup`
{else}
Here’s where everyone’s at this week:

{for userResult in successResult.answeredResults}

**<@{userResult.user}> responded at {userResult.when}:** 

**Wins:** {userResult.wins}  
**Blockers:** {userResult.blockers}  
**Suggested improvements:** {userResult.improvements}  
**How to solve blockers:** {userResult.solutions}  

{endfor}

{if successResult.hasSlackers}
I'm missing responses from the following people:

{for slacker in successResult.slackers}
**<@{slacker}>**
{endfor}

No big deal! You can still add one now by typing `/dm @{ellipsis.team.botName} farm standup checkin for {channel}`.
Once you are done you can type `@{ellipsis.team.botName} farm standup status for {channel}` here to have an updated summary posted.
{else}
Everyone accounted for. Nicely done.
{endif}

{endif}