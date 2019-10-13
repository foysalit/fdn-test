# Notes on my solution

- Testing. At least very basic integration tests for the react components and the api endpoints should be the priority as soon as (if not before) the code works as per the given spec.
- The solution is quite modular and it should be relatively easy to integrate a proper state management tool such as redux/mobx so before the codebase evolves into a monster of state and event handlers, one of those should be integrated. For a small implementation, context api can be a fit as well.
- There's no validation happening anywhere on the client or the server. Proper validation tools such as joi/yup should be integrated for handling validation before sending data off to the server and on the server before accepting the data.
- Server side of the code is very unorganized and everything is in one file. I like the 3 layer architecture with node and would recommend it to clean up the code.
- The server api does not use any real database and uses a local object to simulate storage. My thoughts on data storage can be found in the [OVERVIEW.md](./OVERVIEW.md) file and that should shed some light on why I decided to keep the code db agnostic for the test.
- The solution only includes creating schema and removing them. Even though the server api includes an endpoint that can be used to create an instance of a given schema, the client does not make use of it. The implementation of such feature would pretty much mimic the schema related CRUD operation.
- Building UI is quite time consuming so I threw in semantic-ui to quickly build out a decent looking interface. There might be better options out there or building our own branding design on top of existing toolkit can be an option as well.

# Notes on the scaffolding

- It feels a lot like a monorepo with yarn workspace setup. While I'm not completely against it, I do prefer the fredom of having separate repos for front and back. It could also be my lack of experience with the concept of yarn workspace.
- There should be some sort of testing hints included in the codebase. CRA comes with it's own testing setup but on the backend there's no such facilities. 
- It was easy to get started, I liked that but the eslint inclusion seems a bit too opinionated. I am a bit too picky about how my code looks so had to overwrite some rules. A few essential modules such as cors, body parser could be included and configured with express as well since almost every project needs them. I added those to but didn't add fine grain config for any of them.

***Sorry about the mind-dump style of the note, it's very raw and off the top of my head. as I'm writing the code***