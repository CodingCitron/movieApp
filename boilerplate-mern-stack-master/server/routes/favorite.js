const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    console.log('favoriteNumber');
    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ 'movieId': req.body.movieId })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        //그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

router.post('/favorited', (req, res) => {
    console.log('favorited');
    // 내가 이 영화를 Favorited 리스트에 넣었는 지 정보를 DB에서 가져오기
    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ 'movieId': req.body.movieId, 'userFrom': req.body.userFrom })
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        //그 다음에 프론트에 다시 숫자 정보를 보내주기
        let result = false;
        if(info.length !== 0){
            result = true
        }
        res.status(200).json({ success: true, favorited: result })
    })
})
//api/favorite/removeFromFavorite
router.post('/removeFromFavorite', (req, res) => {
    console.log('removeFromFavorite');
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })
})

router.post('/addToFavorite', (req, res) => {
    console.log('addToFavorite');
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })
})

router.post('/GetFavoriteMovie', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
    .exec((err, favorite) => {
        console.log(favorite)
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, favorite })
    })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, result) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

module.exports = router;
