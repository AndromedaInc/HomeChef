# HomeChef

# Architecture
HomeChef is built using a microservice architecture laid out according to the HomeChef_Architecture.png diagram.

# Intro to the Tech Stack
- React and Apollo/GraphQL with some Redux on the front-end communicate with Express-based microservice services linked to MySQL and Postgres databases.
- The Dockerfile creates a Docker image on the main server - we initially Dockerize the app to deploy on AWS. After building an image, be sure and pass in ENV variables into any Docker container by running `docker run -d -p 5678:5678 --env-file=.env <image name>`
- The ecs.yml is a template to configure AWS deployment. This tutorial through "Stage 2: Deploying the Monolith" was used to initially deploy to AWS (we later took down - no current deployment exists): https://aws.amazon.com/getting-started/projects/break-monolith-app-microservices-ecs-docker-ec2/module-two/

# Deployed apps
- Main app: https://andromeda-chef.herokuapp.com/
- Authentication microservice: https://andromeda-chef-authentication.herokuapp.com/ (github repo: https://github.com/AndromedaInc/HomeChefAuthentication)
- Map microservice: https://andromedachef-map.herokuapp.com/ (github repo: https://github.com/AndromedaInc/HomeChefMap)

# GraphQL
 - GraphQL is layered on top of REST API
 - You can play with GraphQL queries in the browser at localhost:5678/graphql
 - Data flow: Front End > Server > GraphQL Resolvers/Schema > Database

 # CSS
 - Andromeda HomeChef is using CSS grids
 - index.jsx has the main grid container around the header and the app
 - "grid-subcontainer" can be used for the outer div in components
 - if there are extra divs without a grid class layered inbetween, it can mess up the formatting
 - additional style sheets (eg. grid.css) should be imported at the top of main.css
 - CSS stylesheets are loaded via webpack
 - helpful site on CSS grid: https://css-tricks.com/snippets/css/complete-guide-grid/

 # Contributing
 We welcome your contributions! See the contributing.md file for details, and reach out to Duke Goulden, Sarah Silva, or Stephen Zerfas with questions.