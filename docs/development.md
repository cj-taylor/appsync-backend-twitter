# Development

1. Configure SES Verified Identity in us-east-1 for Cognito emails
    - https://us-east-1.console.aws.amazon.com/ses/home?region=us-east-1#/verified-identities

2. Fetch project code 

```bash
# download project
git clone git@github.com:cj-taylor/appsync-backend-twitter.git
cd appsync-backend-twitter
```

3. Update value in serverless.yml for email 

```yaml
    CognitoUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        EmailConfiguration:
          EmailSendingAccount: DEVELOPER
          SourceArn: $EMAIL_CONFIGURED
```

4. Setup project and deploy to AWS Account 

```bash


# install dependencies
npm i

# deploy to AWS account
npm run deploy
```

5. Configure local environment from Stack outputs 

```bash
npm run exportEnv
```

6. Run unit tests

```bash
npm run test
```

7. Run integration tests

```bash
npm run integration-test
```

8. Run end-to-end tests

```bash
npm run e2e-test
```