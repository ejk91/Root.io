const db = require('../db.js');

module.exports = {
  //add list to db
  addBoard: (name, userId) =>{
    return db.query(`INSERT INTO boards (boardname) VALUES ('${name}') RETURNING id`)
      .then(board => {
        //after adding a board update join table for users and boards
        return db.query(`INSERT INTO users_boards (user_id, board_id) VALUES (${userId},${board.id})`)
      })
  },
  //edit list name in db
  editBoardName: (name, boardId) => {
    return db.query(`UPDATE boards SET boardname='${name}' WHERE board_id=${boardId}`)
  },
  //delete task from db using list id
  deleteBoard: (boardId) => {
    return db.query(`DELETE FROM boards WHERE id=${boardId}`)
  },
  //fetch board with an id
  fetchBoard: (boardId) => {
    return db.query(`SELECT * FROM boards LEFT JOIN lists ON boards.id=lists.board_id LEFT JOIN tasks on lists.id = tasks.list_id WHERE boards.id=${boardId}`)
  }

}
