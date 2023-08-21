# Tic-Tac-Toe
A Game of Tic Tac Toe

Wireframe
tic-tac-toe-wireframe.png

* three columns for body

* grid container for board - 9 square divs

* new game button and game history in first column, blocks

* right column has win and tie counters in a flex container in a row

* turn display for whose turn it is in right column

Planned features

for MVP
1. logic for game win/tie
2. new game button
3. mark elements as clickable or not

extra features
    
* local storage
* game history
* hover effects for valid turns

8/15

Completed initial layout, ready to start coding logic

8/16

Comepleted tic-tac-toe logic, playable game, completed all required user stories

Bonus features added: Game history, win/tie counters

To-do: local storage, better styling, future---> online multiplayer
   
potentially update check winner logic, not very clean right now

8/17

Bonus feature added: Local Storage
* Uses the browser's Window.localStorage property, which is an object
* Stores data in key value pairs that persists across page reloads and opening and closing tab/browser
* get/set data with localStorage.getItem, localStorage.setItem
* https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

To-do: better styling, online multiplayer (websockets)

8/21
UI tries to emulate this theme: https://webflow.com/templates/html/dashdark-x-devlink-website-template
Added hover/preview effects for the board
* Using mouseEnter to change things when mouse pointer enters a square and mouseOut to revert the square back to default state
* Didn't use mouseOver, was having issues changing back to original state when no longer mousing over