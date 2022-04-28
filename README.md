# Bitrise API + AWS Lambda Functions

In this series of articles, we shared some hands-on experience on how to use the** AWS Lambda**, learn to design and build a Serverless function to trigger Bitrise builds with **Bitrise API** via the custom Lambda function.

[Alexa for Bitrise CI/CD: Introduction to serverless with AWS Lambda and Bitrise API - Part 1](https://blog.bitrise.io/post/alexa-for-bitrise-ci-cd-introduction-to-serverless-with-aws-lambda-and-bitrise-api-part-1)


[Alexa for Bitrise CI/CD: Introduction to Amazon Alexa and Alexa Skills - Part 2](https://blog.bitrise.io/post/alexa-for-bitrise-ci-cd-introduction-to-amazon-alexa-and-alexa-skills-part-2)


[Alexa for Bitrise CI/CD: Putting it all together - Part 3](https://blog.bitrise.io/post/alexa-for-bitrise-ci-cd-part-3)

## The solution
As we know AWS Lambda function needs to be triggered by any supported triggers. Because of this, we will use **Alexa** and **Alexa Skill Kit (ASK) **to trigger the function. Inside the function, we will add our logic to receive the voice command from Alexa and pass it to Bitrise API using the POST endpoint to trigger a new build in our Bitrise app. Then, we will get the response from Lambda to the Alexa as a JSON output. 

![design](/images/design.png)

### Pre-Requisites: 

- [AWS Free Tier account](https://portal.aws.amazon.com/billing/signup)
- IDE such as [VS Code](https://code.visualstudio.com/download) or [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [NodeJS](https://nodejs.org/en/) and npm
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configure it with your AWS Account
- An [Amazon developer account](http://developer.amazon.com/): If you already have an Amazon.com account, but not an Amazon developer account, you have the option to use your Amazon.com account as a developer account.
- Alexa Skills Kit Command Line Interface [(ASK CLI)](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html): A tool for you to manage your Alexa skills and related resources, such as AWS Lambda functions.
- [Git](https://git-scm.com/)
- [AWS IAM user](https://console.aws.amazon.com/iam/)
 
### How to use this repository
- Clone the repository
- Inside the project, run the following command `npm install`
- We need to zip the project to be able to upload it to the AWS Lambda function by the following command (Don’t worry about the API Key and App Slug because we can use Lambda Environment variables to replace the hardcoded values) 

`zip -r LambdaBitrise.zip index.js node_modules` 

![upload](/images/upload.png)

- In Lambda function, click on the **Configuration** tab to add the Environment variables: 
  - APP_SLUG
  - API_KEY

![upload](/images/config.png)

- You can replace the **app_slug** and **API_Key** with the Lambda Environment variables:

 - ${process.env.APP_SLUG}
 - ${process.env.Api_KEY}