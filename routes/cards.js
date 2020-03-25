const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    return res.redirect(`/cards/${flashCardId}?side=question`);
});

router.get('/:id', (req, res) => {
    const name = req.cookies.username;
    const {
        side = 'question' 
    } = req.query;
    const totalQuestion = cards.length;
    const { id } = req.params;
    
    if(id >= totalQuestion){
        return res.redirect('/cards/0');
    }
    
    const text = cards[id][side];
    const { hint } = cards[id];
   
    let templateData = { id, text, name };
    let nextCard = parseInt(id) + 1;
    
    let sideToDisplayNext = 'Answer';
    let sideToShow = 'question';

    if (side == 'question') {
        sideToDisplayNext = 'Question';
        sideToShow = 'answer';
        cardClass = 'card-answer';
        templateData = { ...templateData, hint };
    }
    templateData = { ...templateData, sideToDisplayNext, sideToShow, nextCard, side }
    return res.render('card', templateData);
});

module.exports = router;