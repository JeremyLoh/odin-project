# Knights Travails - JavaScript Course

https://www.theodinproject.com/lessons/javascript-knights-travails

For this project, you'll need to use a graph, a data structure that is similar (not identical) to a binary tree. For a good introduction on what graphs are, reference https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs
Don't forget to look at the [section on representing graphs](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs) as it should give you good ideas on how to actually implement graphs in your code

Given enough turns, [a knight on a standard 8x8 chess board can move from any square to any other square](https://cdn.statically.io/gh/TheOdinProject/curriculum/284f0cdc998be7e4751e29e8458323ad5d320303/ruby_programming/computer_science/project_knights_travails/imgs/00.png)

The basic move is two steps forward and one step to the side or one step forward and two steps to the side. It can face any direction

All possible places you can end up after one move look like this:
![possible one knight move](https://cdn.statically.io/gh/TheOdinProject/curriculum/d30038e0aaca1f35e58e205e37a21b2c9d31053d/javascript/computer_science/project_knights_travails/imgs/01.png)

Note: The picture is only to explain the problem, there is no need to create a GUI

# Assignment

Your task is to build a function `knightMoves` that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way

You can think of the board as having 2-dimensional coordinates. Your function would therefore look like:

- `knightMoves([0,0],[1,2]) == [[0,0],[1,2]]`

Sometimes there is MORE than one fastest path. e.g. shown below. Any answer is correct as long as it follows the rules and gives the shortest possible path

- `knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]]` OR `knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]`
- `knightMoves([3,3],[0,0]) == [[3,3],[2,1],[0,0]]` OR `knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]`
- `knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]` OR `knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]`

1. Think about the rules of the board and knight, and make sure to follow them
2. For every square there is a number of possible moves, choose a data structure that will allow you to work with them. Don't allow any moves to go off the board
3. Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series
4. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what the full path looks like, e.g.

```
> knightMoves([3,3],[4,3])
=> You made it in 3 moves! Here's your path:
  [3,3]
  [4,5]
  [2,4]
  [4,3]
```
