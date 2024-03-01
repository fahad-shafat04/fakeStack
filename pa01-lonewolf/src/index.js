import Model from './model.js';
const model = new Model();

window.onload = function () {
  displayAllQuestions();
};

function displayAllQuestions() {
  const container = document.getElementById('questions-container');
  if (!container) {
    console.error('Questions container not found');
    return;
  }

  container.innerHTML = '';

  model.getAllQuestions().forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const titleElement = document.createElement('h3');
    titleElement.textContent = question.title;

    // const textElement = document.createElement('p');
    // textElement.textContent = question.text;

    questionElement.appendChild(titleElement);
    // questionElement.appendChild(textElement);

    container.appendChild(questionElement);
  });
}

function showQuestionsPageContainer() {
  document.getElementById('showMainPageContainer').style.display = 'none';
  document.getElementById('button-row').style.display = 'none';

  document.querySelector('.showQuestionsPage').style.display = 'block';
}

function showMainPageContainer() {
  document.querySelector('.showQuestionsPage').style.display = 'none';

  document.querySelector('.mainpage').style.display = 'none';
}

function postQuestion() {
  const title = document.getElementById('question-title').value;
  const text = document.getElementById('question-text').value;
  const tags = document.getElementById('question-tag').value;
  const username = document.getElementById('question-username').value;

  model.addQuestion(title, text, tags, username);

  // reset field
  document.getElementById('question-title').value = '';
  document.getElementById('question-text').value = '';
  document.getElementById('question-tag').value = '';
  document.getElementById('question-username').value = '';

  console.log("post successed")
}

function displayAllTags() {
  const container = document.getElementById('tags-container');//ref err
  if (!container) {
    console.error('Tags container not found');
    return;
  }
  container.innerHTML = '';

  model.data.tags.forEach(tag => {
    const tagElement = document.createElement('li');
    tagElement.textContent = tag.name;

    container.appendChild(tagElement);
  });

  if (model.data.tags.length === 0) {
    container.textContent = 'No tags found.';
  }
}


function displayQuestionByTitle(title) {
  const lowerCasedTitle = title.toLowerCase();
  const question = model.getAllQuestions().find(q => q.title.toLowerCase().includes(lowerCasedTitle));
  if (question) {
    document.getElementById("no-question-found").style.display = "none";
    document.getElementById("question-title").innerText = question.title;
    document.getElementById("question-text").innerText = question.text;
    document.getElementById("question-title").style.display = "block";
    document.getElementById("question-text").style.display = "block";
    console.log("searched question by title");
  } else {
    document.getElementById("no-question-found").style.display = "block";
    document.getElementById("question-title").style.display = "none";
    document.getElementById("question-text").style.display = "none";
    console.log("searching question by title failed");
  }
}

function displayQuestionByTag(tagName) {
  const tag = model.data.tags.find(t => t.name === tagName);

  if (tag) {
    const questions = model.getQuestionsByTagId(tag.tid);

    if (questions.length > 0) {
      const firstQuestion = questions[0];
      document.getElementById("no-question-found").style.display = "none";
      document.getElementById("question-title").innerText = firstQuestion.title;
      document.getElementById("question-text").innerText = firstQuestion.text;
      document.getElementById("question-title").style.display = "block";
      document.getElementById("question-text").style.display = "block";
      console.log("searched question by tag name");
    } else {
      document.getElementById("no-question-found").style.display = "block";
      document.getElementById("question-title").style.display = "none";
      document.getElementById("question-text").style.display = "none";
      console.log("tag name searched but no question");
    }
  } else {
    document.getElementById("no-question-found").style.display = "block";
    document.getElementById("question-title").style.display = "none";
    document.getElementById("question-text").style.display = "none";
    console.log("no tag searched");
  }
}


function incrementViewsByQid(qid) {
  model.incrementViewsByQid(qid);
}

function newest() {
  console.log("newest button clicked")
  const allQuestions = model.getAllQuestions();

  const sortedQuestions = allQuestions.sort((a, b) => {
    return new Date(b.askDate) - new Date(a.askDate);
  });

  const container = document.getElementById('showMainPageContainer');
  container.innerHTML = '';


  sortedQuestions.forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';

    const titleElement = document.createElement('h3');
    titleElement.textContent = question.title;

    const dateElement = document.createElement('p');
    dateElement.textContent = `Asked on: ${question.askDate}`;

    questionElement.appendChild(titleElement);
    questionElement.appendChild(dateElement);

    container.appendChild(questionElement);
  });

  if (sortedQuestions.length === 0) {
    document.getElementById("no-question-found").style.display = "block";
    document.getElementById("question-title").style.display = "none";
    document.getElementById("question-text").style.display = "none";
  }
}

function displayUnansweredQuestions() {
  console.log("Unanswered questions activated");
  const unansweredQuestions = model.getAllQuestions().filter(q => q.ansIds.length === 0);

  const container = document.getElementById('showMainPageContainer');
  container.innerHTML = '';

  unansweredQuestions.forEach(question => {
    const questionElement = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = question.title;

    questionElement.appendChild(title);
    questionElement.appendChild(text);
    container.appendChild(questionElement);
  });

  if (unansweredQuestions.length === 0) {
    document.getElementById("no-question-found").style.display = "block";
    document.getElementById("question-title").style.display = "none";
    document.getElementById("question-text").style.display = "none";
  } else {
    document.getElementById("no-question-found").style.display = "none";
    document.getElementById("question-title").style.display = "block";
    document.getElementById("question-text").style.display = "block";
  }
}



function displayAnsweredQuestions() {
  console.log("active button")
  const answeredQuestions = model.getAllQuestions().filter(q => q.ansIds.length > 0);

  const container = document.getElementById('showMainPageContainer');
  container.innerHTML = '';

  answeredQuestions.forEach(question => {
    const questionElement = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = question.title;

    // const text = document.createElement('p');
    // text.textContent = question.text;

    questionElement.appendChild(title);
    // questionElement.appendChild(text);
    container.appendChild(questionElement);
  });

  if (answeredQuestions.length === 0) {
    document.getElementById("no-question-found").style.display = "block";
    document.getElementById("question-title").style.display = "none";
    document.getElementById("question-text").style.display = "none";
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const postQuestionButton = document.getElementById('postQuestionButton');//reference error postQuestion
  const newestButton = document.getElementById('newestButton');
  const unansweredButton = document.getElementById('unansweredButton');
  const activeButton = document.getElementById('activeButton');

  postQuestionButton.addEventListener('click', postQuestion);
  newestButton.addEventListener('click', newest);
  activeButton.addEventListener('click', displayAnsweredQuestions);
  unansweredButton.addEventListener('click', displayUnansweredQuestions);
});


function displayTextByQid(qid) {
  const question = model.getQuestionByQid(qid);

  let textContainer = document.getElementById('question-text-container');
  if (!textContainer) {
    textContainer = document.createElement('div');
    textContainer.id = 'question-text-container';
    document.body.appendChild(textContainer);
  }

  if (question) {
    textContainer.textContent = question.text;
    textContainer.style.display = 'block';
  } else {
    textContainer.textContent = 'Question not found';
  }
}
