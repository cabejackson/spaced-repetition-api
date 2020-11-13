const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id });
  },

  getLanguageHead(db, user_id, newHead) {
    return db
      .from('language')
      .update({
        head: newHead
      })
      .where('language.user_id', user_id)
  },

  getNewWord(db, id, node) {
    return db
      .from('word')
      .where({ id })
      .update({
        next: node.next,
        memory_value: node.memory_value,
        correct_count: node.correct_count,
        incorrect_count: node.incorrect_count
      });
  },

  updateScore(db, user_id, newScore) {
    return db
      .from('language')
      .update({
        total_score: newScore
      })
      .where('language.user_id', user_id);
  },

  updateHead(db, user_id, newHead) {
    return db
      .from('language')
      .update({
        head: newHead
      })
      .where('language.user_id', user_id)
  }



};


module.exports = LanguageService;
