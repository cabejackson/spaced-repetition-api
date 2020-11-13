const express = require('express');
const LanguageService = require('./language-service');
const llService = require('./ll-service');
const SLL = require('./LinkedList');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const jsonBodyParser = express.json();


languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      //gets words and basically whole word table
      res.status(200).json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    // implement me
    // res.send('implement me!')
    try {
      //gets user id to identify their lang
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );
      //gets words and basically whole word table
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.user.id,
        words[0].id
      );

      res.status(200).json({
        nextWord: words[0].original,
        totalScore: language.total_score,
        wordCorrectCount: words[0].correct_count,
        wordIncorrectCount: words[0].incorrect_count,
      });
    } catch (error) {
      next(error);
    }
  })

languageRouter
  //async await waits for all the promisess to be fufilled
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    // // implement me
    // res.send('implement me!')
    // if there is no body or no guess, return 400 & error message
    if (!req.body || !req.body.guess) {
      res.status(400).json({
        error: `Missing 'guess' in request body`
      });
    }
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id,
    );
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id,
    );
    const currentWord = words[0];
    // initiate SLL from LinkedList.js
    let languageLL = new SLL();
    languageLL = llService.createList(languageLL, words);
    // console.log(currentWord)
    //if incorrect
    if (currentWord && req.body.guess !== currentWord.translation) {
      // console.log(currentWord)
      try {
        // llService for data manipulation
        llService.incorrectGuess(languageLL);
        // updates database
        let currNode = languageLL.head;
        while (currNode !== null) {
          await LanguageService.getNewWord(
            req.app.get('db'),
            currNode.value.id,
            currNode.value
          );
          currNode = currNode.next;
        }

        // return next word,  tScore, correctWordCount & incorrect word count with status 200
        res.status(200)
          .json({
            nextWord: words[1].original,
            totalScore: language.total_score,
            wordCorrectCount: currentWord.correct_count,
            wordIncorrectCount: currentWord.incorrect_count,
            answer: currentWord.translation,
            isCorrect: false,
          });
      } catch (error) {
        next(error);
      }
    }
    //if correct
    if (currentWord && req.body.guess === currentWord.translation) {
      try {
        // llService for data manipulation
        llService.correctGuess(languageLL);
        // updates database
        let currNode = languageLL.head;
        while (currNode !== null) {
          await LanguageService.getNewWord(
            req.app.get('db'),
            currNode.value.id,
            currNode.value
          );
          currNode = currNode.next;
        }

        const updatedScore = (language.total_score + 1);

        await LanguageService.updateScore(
          req.app.get('db'),
          req.user.id,
          updatedScore
        );

        const updatedTotalScore = await LanguageService.getUsersLanguage(
          req.app.get('db'),
          req.user.id,
        );


        // return next word, tScore, correctWordCount & incorrect word count with status 200
        res.status(200)
          .json({
            nextWord: words[1].original,
            totalScore: updatedTotalScore.total_score,
            wordCorrectCount: currentWord.correct_count,
            wordIncorrectCount: currentWord.incorrect_count,
            answer: currentWord.translation,
            isCorrect: true,
          });
      } catch (error) {
        next(error);
      }
    }
  });

module.exports = languageRouter
