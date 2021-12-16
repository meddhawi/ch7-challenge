const { Room } = require('../models')
const utils = require('../utils/utils')
const sequelize = require('sequelize')
const express = require('express')
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

    roundResult: () =>{
        var getWinner = (result) =>{
            Room.update(
                {
                    roundResult: sequelize.fn('array_append', sequelize.col('roundResult'), result)
                },
                {where: {id: req.params.id}, returning: true}
            )  
        }
        Room.findOne({where: {id: req.params.id}})
            .then((result)=>{
                let playerOne = result.dataValues.playerOneMove;
                let playerTwo = result.dataValues.playerTwoMove;
                for (var i = 0; i < 3; i++){
                    if(playerOne[i] === playerTwo[i]){
                        getWinner("Draw");
                    }else if(playerOne[i] === "rock"){
                        if (playerTwo[i] === "paper") {
                            getWinner("Player 2 Win!");                            
                        } else {
                            getWinner("Player 1 Win!");
                        }
                    }else if(playerOne[i] ==="paper"){
                        if (playerTwo[i] === "scissor") {
                            getWinner("Player 2 Win!");                            
                        } else {
                            getWinner("Player 1 Win!");
                        }
                    }else if(playerOne[i] === "scissor"){
                        if (playerTwo[i] === "rock") {
                            getWinner("Player 2 Win!");                            
                        } else {
                            getWinner("Player 1 Win!");
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
              });
        
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