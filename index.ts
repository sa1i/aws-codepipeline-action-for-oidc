import * as AWS from "aws-sdk";
import * as core from "@actions/core";


try {
  var awsRegion = core.getInput("aws-region");
  var awsAccessKey = core.getInput("aws-access-key");
  var awssecretKey = core.getInput("aws-secret-key");
  var pipelineName = core.getInput("pipeline-name");

  let AWSConfig = new AWS.Config();
  AWSConfig.region = awsRegion;
  AWSConfig.accessKeyId = awsAccessKey;
  AWSConfig.secretAccessKey = awssecretKey;

  var codepipeline = new AWS.CodePipeline();
  var pipeline = {
    name: pipelineName,
  };

  codepipeline.startPipelineExecution(pipeline, function (err, okData) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(okData);
    }
  });
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    // Handle other types of errors or unknown values
    core.setFailed('An unknown error occurred.');
  }
}
