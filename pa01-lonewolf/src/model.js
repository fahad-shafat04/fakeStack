export default class Model {
  constructor() {
    this.data = {
      questions: [
        {
          qid: 'q1',
          title: 'Programmatically navigate using React router',
          text: 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.',
          tagIds: ['t1', 't2'],
          askedBy: 'JoJi John',
          askDate: new Date('December 17, 2020 03:24:00'),
          ansIds: ['a1', 'a2'],
          views: 10,
        },
        {
          qid: 'q2',
          title: 'android studio save string shared preference, start activity and load the saved string',
          text: 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
          tagIds: ['t3', 't4', 't2'],
          askedBy: 'saltyPeter',
          askDate: new Date('January 01, 2022 21:06:12'),
          ansIds: ['a3', 'a4', 'a5'],
          views: 121,
        }
      ],
      tags: [
        {
          tid: 't1',
          name: 'react',
        },
        {
          tid: 't2',
          name: 'javascript',
        },
        {
          tid: 't3',
          name: 'android-studio',
        },
        {
          tid: 't4',
          name: 'shared-preferences',
        }
      ],

      answers: [
        {
          aid: 'a1',
          text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
          ansBy: 'hamkalo',
          ansDate: new Date('March 02, 2022 15:30:00'),
        },
        {
          aid: 'a2',
          text: 'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
          ansBy: 'azad',
          ansDate: new Date('January 31, 2022 15:30:00'),
        },
        {
          aid: 'a3',
          text: 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
          ansBy: 'abaya',
          ansDate: new Date('April 21, 2022 15:25:22'),
        },
        {
          aid: 'a4',
          text: 'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
          ansBy: 'alia',
          ansDate: new Date('December 02, 2022 02:20:59'),
        },
        {
          aid: 'a5',
          text: 'I just found all the above examples just too confusing, so I wrote my own. ',
          ansBy: 'sana',
          ansDate: new Date('December 31, 2022 20:20:59'),
        }
      ]
    };
  }
  getAllQuestions() {
    return this.data.questions;
  }

  getQuestionByQid(qid) {
    return this.data.questions.find(question => question.qid === qid);
  }

  getQidByTitle(title) {
    const question = this.data.questions.find(question => question.title === title);
    return question ? question.qid : null;
  }

  getNumOfAnswers(qid) {
    const question = this.getQuestionById(qid);
    return question ? question.ansIds.length : 0;// if ? true : question = undefined
  }

  getQuestionsByTagId(tagId) {//tag assign to question
    return this.data.questions.filter(question => question.tagIds.includes(tagId));
  }

  getTagNameById(tid) {//existing tag
    const tag = this.data.tags.find(tag => tag.tid === tid);
    return tag ? tag.name : null; // avoid undefine
  }

  getNumQuestionsOfTag(tagName) {
    const tag = this.data.tags.find(tag => tag.name === tagName);// tag{bool}
    if (tag) {
      return this.getQuestionsByTagId(tag.tid).length;
    }
    return 0;
  }

  getViews(qid) {
    const question = this.getQuestionByQid(qid);
    if (question) {
      return question.views;
    } else {
      return null; // if question = undefined
    }
  }

  getTimeByQid(qid) {
    const question = this.getQuestionByQid(qid);
    if (question) {
      return this.getTimePassed(question.askDate);
    } else {
      return "Question not found";
    }
  }


  getTimePassed(askDate) {
    const currTime = new Date();
    const askedTime = new Date(askDate);
    const difference = currTime - askedTime; // ms

    const secondsPassed = Math.floor(difference / 1000);
    const minutesPassed = Math.floor(secondsPassed / 60);
    const hoursPassed = Math.floor(minutesPassed / 60);
    const daysPassed = Math.floor(hoursPassed / 24);

    if (daysPassed) {
      return `${daysPassed} days ago`;
    } else if (hoursPassed) {
      return `${hoursPassed} hours ago`;
    } else if (minutesPassed) {
      return `${minutesPassed} minutes ago`;
    } else {
      return `${secondsPassed} seconds ago`;
    }
  }
  getTagLength() {
    return this.data.tags.length;
  }

  incrementViewsByQid(qid) {
    const question = this.getQuestionById(qid);
    if (question) {
      question.views += 1;
    }
  }
  addQuestion(title, text, tags, askedBy) {
    const newQuestion = {
      qid: `q${this.data.questions.length + 1}`,
      title: title,
      text: text,
      tagIds: tags.split(' ').map(tag => `t${this.data.tags.findIndex(t => t.name === tag) + 1}`),
      askedBy: askedBy,
      askDate: new Date(),
      ansIds: [],
      views: 0,
    };
    this.data.questions.push(newQuestion);
  }
}
