const { Room } = require('../models')
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
        Room.create({ownerID: req.user.id})
            .then((room)=>{res.json(room)})
    },

    deleteRoom: async (req, res)=>{
        Room.destroy({
            where: {id: req.params.id}
        })
    },

    // fight: 
}