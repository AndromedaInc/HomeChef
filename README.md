# HomeChef

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