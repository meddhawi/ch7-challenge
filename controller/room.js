const { Room } = require('../models')
const sequelize = require('sequelize')
const express = require('express')
const room = require('../models/room')
module.exports = {
    showRoomList: (req, res) => {
        Room.findAll()
            .then((room) => {
                res.render()
            })
    },

    createRoom: async (req, res) =>{
        await Room.create({playerOneId: req.user.id})
            .then((room)=>{res.json(room)})
    },

    deleteRoom: async (req, res)=>{
        await Room.destroy({
            where: {id: req.params.id}
        })
    },

    getWinner: (player1, player2) => { //if false p1 lose and p2 win, if true p1 win and p2 lose
        if(player1 === player2){
            return "draw";
        }else if(player1 === "rock"){
            if (player2 === "paper") {
                return false;
            } else {
                return true;
            }
        }else if(player1 ==="paper"){
            if (player2 === "scissor") {
                return false;
            } else {
                return true;
            }
        }else if(player1 === "scissor"){
            if (player2 === "rock") {
                return false;
            } else {
                return true;
            }
        }
    },

    roundResult: (result) =>{
        if(this.getWinner == "draw"){
            result = "Draw!"
        }
        else if(this.getWinner){
            result = "Player 1 win!"
        }else{
            result = "Player 2 Win!"
        }
    },

    fight: async (req, res) => {
        const{ playerOneMove, playerTwoMove } = req.body
        //if function to determine which is player one and two
        Room.findOne({where: {id: req.params.id}})
            .then((result) =>{
                let playerOneId = result.dataValues.playerOneId
                let playerOneMoveDB = result.dataValues.playerOneMove
                let playerTwoMoveDB = result.dataValues.playerTwoMove
                //if this is not player one
                if(req.user.id !== playerOneId){
                    if(playerTwoMoveDB === null || playerTwoMoveDB.length < 3){
                        Room.update(
                            {
                                playerTwoId: req.user.id,
                                playerTwoMove: sequelize.fn('array_append', sequelize.col('playerTwoMove'), playerTwoMove)
                            },
                            {where: {id: req.params.id}, returning: true}
                        ).then((update)=>{
                            res.status(200).json(update)
                        }) .catch((err) => {
                            console.log(err);
                          });
                    }
                }
                //if this is player one
                else if (req.user.id === playerOneId){
                    if(playerOneMoveDB === null || playerOneMoveDB.length < 3){
                        Room.update(
                            {
                                playerOneMove: sequelize.fn('array_append', sequelize.col('playerOneMove'), playerOneMove)
                            },
                            {where: {id: req.params.id}, returning: true}
                        ).then((update)=>{
                            res.status(200).json(update)
                        }) .catch((err) => {
                            console.log(err);
                          });                            
                    }
                }
            })
            .catch((err) => {
                console.log(err);
              });
        
    }

}