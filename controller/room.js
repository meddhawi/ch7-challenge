const { Room } = require('../models')
const sequelize = require('sequelize')
const express = require('express')
const { IGNORE } = require('sequelize/dist/lib/index-hints')

module.exports = {
    showRoomList: (req, res) => {
        Room.findAll()
            .then((room) => {
                res.render()
            })
    },

    createRoom: async (req, res) =>{
        await Room.create({ownerID: req.user.id})
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

}