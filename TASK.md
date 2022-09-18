Live Coding Session


Write a Tic Tac Toe game based on NestJS framework. Game should be played in turns between two players locally.

Assume that there might be multiple parallel games played at the same time. Each game’s state must be kept in database.
Players should take turns and game should finish at one point with either one side winning or a draw.


Player shall interact with the game via REST API:
Preview the state of a certain game ( board + game status )
GET /api/games/:id

Create a new game
POST /api/games

Make move
PUT /api/games/:id/board

The state of the game must be persisted/read from a text file using a Repository pattern.
In this task you can omit issues regarding file system locks, in the case of parallel requests coming in.

The focus of this excersise is to write a readable and well designed code in OOP paradigm.
Classes should represent real-life objects and their behaviours. 
