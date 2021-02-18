Link to Repository: https://github.com/perfectmak/udacity-devops-capstone

Application Description
=======================
The application is a simple transaction management application, that allows a user to log income and expenses and view
a summary of the total profit and losses.

The application consists of a frontend served from an s3 buckets distributed using cloudfront, and a backend deployed
to kubernetes and exposed via a kubernetes services (exposed via an AWS Load Balancer).

Test Details
============
The web apps frontend is served through cloudfront. Url for the Website is: http://d1uzle1oqvrl43.cloudfront.net

Test Login Credential:
email: root@email.com
password: default-root-password

Note: Currently only the http version of the cloudfront url works, the https version is broken because of no provision ssl certificate on the backends api.

Deployment Information
======================
The Kubernetes cluster is deployed through Cloudformation. See more information in the `infra` folder of the repository.

CI/CD is done using CirceCI.

Deployments uses a Blue/Green deployment strategy. Here is the highlighted steps:
- Backend code is built and deployed as a Deployment to the EKS Kubernetes cluster tags with the unique workflow id.
- Frontend code is then built with the new Backend API_URL and deployed to S3 using cloudformation and aws cli.
- Smoke test is run on new frontend and backend Deployments.
- If smoke tests pass, the cloudfront origin is updated to the the new s3 url (hence completing the blue/green deployment).

See the .circleci/config.yml in the repository for detailed commands of how each step is done.

SCREENSHOT LEGEND
=================
Screenshots can be found in the repository at this path: https://github.com/perfectmak/udacity-devops-capstone/tree/master/submission/screenshots

- `1 Deployment Pipeline.png`: Contains a screenshot of the Circle CI deployment Pipeline.
- `2 CI Linting Backend.png`: Screenshot of linting backend code before running tests in a CI Job.
- `3 CI Linting Frontend.png`: Screenshot of linting frontend code before running tests in a CI Job.
- `4 CI Building Docker Image.png`: Screenshot of building a docker image during a backend CI deployment Job.
- `5 CI Update Cloudfront Origin.png`: Shows CI Job step that updates cloudfront distributed to complete blue/green deployment.