## GitHub Actions x AWS CodePipeline

This GitHub Actions will help you trigger a pipeline in your AWS CodePipeline - assumming you already have the pipeline. This will not create the pipeline for you.

## Setup

### AWS IAM

Create an IAM user with `codepipeline:StartPipelineExecution` permission. You may take and customize the IAM policy below as starter point. Note that I'm using `"*"` in the policy. For better security, you can limit the policy to only execute specific pipelines. You can read more about IAM for CodePipeline [here](https://docs.aws.amazon.com/codepipeline/latest/userguide/permissions-reference.html).

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "codepipeline:StartPipelineExecution"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

### If using GitHub Secrets and not OIDC

Additional Parameters can be used, but not recommended.

    aws-access-key: ${{ secrets.AWS_PIPELINE_ACCESS_KEY }}
    aws-secret-key: ${{ secrets.AWS_PIPELINE_SECRET_KEY }}

After you create the IAM user with the right permission, add two variables below in your GitHub repository secrets area:

- `AWS_PIPELINE_ACCESS_KEY`: the Access Key ID for the user that you just created
- `AWS_PIPELINE_SECRET_KEY`: the Secret Key for the user that you just created

## Usage

### Basic Usage

**Note**:

- Please check the latest available version [here](https://github.com/marketplace/actions/aws-codepipeline-trigger-for-oidc) and replace it with `X.X.X` in the code examples below.

- Identify in which AWS region your pipeline is located. Use that region name for `aws-region` key below. AWS regions list is available [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).

```
jobs:
  deploy:
    steps:
      - name: Trigger AWS CodePipeline
        uses: just-ak/aws-codepipeline-action-for-oidc@v1.1.0
        with:
          aws-region: "ap-southeast-1"
          pipeline-name: "your-pipeline-name"
```

### Advance Usage

Below is the example for situation where:

- You only want to trigger the pipeline if previous job was successful
- You only want to trigger the pipeline if the Git branch that GitHub Actions currently running is a specific branch

```
jobs:
  job1:
    ... code for job1 ...
  deploy:
    needs: job1
    runs-on: ubuntu-latest
    steps:

      - name: Assume AWS Role
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-region: ${{ env.AWS_DEFAULT_REGION }}
          role-to-assume: arn:aws:iam::${{ env.YOUR_ACCOUNT }}:role/trigger-aws-code-pipeline-role
          role-session-name: trigger-aws-code-pipeline

      - name: Trigger AWS CodePipeline
        uses: just-ak/aws-codepipeline-action-for-oidc@v1.1.0
        with:
          aws-region: "ap-southeast-1"
          pipeline-name: "your-pipeline-name"
```

## Contribute

Feel free to fork and submit PRs for this project. I'm more than happy to review and merge it