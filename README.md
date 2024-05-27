## URLs to be shared with the customer, or to be set in Customer LMS

- LTI v1.3 needs to be setup with the customer, following

| Urls/Env           | DEV                                                              | Staging                                                      | PROD                                                 |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| Platform URL       | https://relias-ltiv1p3-api.development.hallopflege.net           | https://relias-ltiv1p3-api.staging.hallopflege.net           | https://relias-ltiv1p3-api.pflegeclever.de           |
| Initiate Login URL | https://relias-ltiv1p3-api.development.hallopflege.net/lti/login | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/login | https://relias-ltiv1p3-api.pflegeclever.de/lti/login |
| Keyset URL         | https://relias-ltiv1p3-api.development.hallopflege.net/lti/keys  | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/keys  | https://relias-ltiv1p3-api.pflegeclever.de/lti/keys  |
| Tool URL           | https://relias-ltiv1p3-api.development.hallopflege.net/lti/      | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/      | https://relias-ltiv1p3-api.pflegeclever.de/lti/      |
| Redirect URL       | https://relias-ltiv1p3-api.development.hallopflege.net/lti/      | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/      | https://relias-ltiv1p3-api.pflegeclever.de/lti/      |
| Deeplinking URL    | https://relias-ltiv1p3-api.development.hallopflege.net/lti/      | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/      | https://relias-ltiv1p3-api.pflegeclever.de/lti/      |
| Ping URL           | https://relias-ltiv1p3-api.development.hallopflege.net/lti/ping  | https://relias-ltiv1p3-api.staging.hallopflege.net/lti/ping  | https://relias-ltiv1p3-api.pflegeclever.de/lti/ping  |

## When creating/deleting platforms

- Please note the at email used registering platforms is unique
- And platform data is stored in 2 diffrent databases
- One of them hard deletes the data when unregistering the platform and the other one just disables that platform
- Hence when creating the same platform again please use the `PATCH` request.

## For Developers

### When coding on this application : -

- To verify `/lti` middle setup use `http://localhost:XXX/lti/ping` url, you should see `pong`, if all good then setup works.
- Please map all customer facing controllers to go through `/lti/XXX` so that the user info, learner email, customer information is all decoded( refer controllers for code )
- For controllers with `/lti/XXX`
  - Please use `res` from `express` and `res.json()` to extract information from token and to send response to the FE.
  - Please dont use `return` in controller functions just use `res.send()` to avoid `.emit` method undefined exceptions
- Other controllers marked with `/api/XXX` work as usual like in NestJs
- Please keep the value of `LTI_KEY` in your `.env` more than 16 characters to avoid Bad decrypt exceptions during deep linking
- When configuring LTIv1.3 in customer LMS please keep Tool URL (this may be called something else like `Login URL` as well like in the case for ilias) , Redirect URL and Deeplinking URL same
- `LTI_KEY` please do not change this env variable once decided for any env..if you do change this midst during dev or due to any other reason on any env., ..then the `lti-platforms` db needs to be dropped and re-created and re-register all the platforms,
  ohtherwise this will cause the `/keys` url to fail and give bad_decrypt exception

---Need to test DEV with register, de-register (both with token)- mod the env vars if need be, launch, courses etc and then handover to Ivan
