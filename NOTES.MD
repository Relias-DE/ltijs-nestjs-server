- <del>Authorization via oauthv2.0 - this is done - the fw itself is doing this - True and in place</del>
- <del>Investigate on sharing content and features via LTI</del>
- It is possible to share features via LTIv1.3 in 2 options
  1. it will need to setup as a seperate LTI tool in the LMS
     without deep-linking and without ltiv3 services and a different app and a different callback url
     also as per conversation with Marco, there needs to be a authentication handshake ( kind of like a handoff) just once when the feature site is launched
     this handoff will have user data interpreted by the lti middleware
     and the frwded site needs to then accomodate its own api calls by making its own auth mechanism around the data obtained from lti during the first handshake/handoff
  2. we just use the lti handshake and launch us off in the new window, and we use the some lti creds and email to create another jwt token and redirect all api calls to the api server and not to the LTI server.
- <del>The idea is to leverage same auth but use a Redirect URL technique instead of redirecting to within app</de>
  use same tactic as v1p1-
  to take the user of the app to content or compliance or any other feature

MS-Teams
https://reliaslearning.webhook.office.com/webhookb2/44db532c-08bc-449a-bdb4-3dbd0b2cbbe7@838dd0ab-c484-4619-ac32-807ef6da0240/IncomingWebhook/3dca2a91bba646ef82a9140c8f0d6a55/6a340d33-313d-4a89-84c0-621f6650cb7a
