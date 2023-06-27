const quizData = [
    {
        openness: "openness",
        question: "Are you curious about new topics?",
        a: "I am an adventurer!",
        b: "I dont care.",
        c: "My omniscience makes the universe seem small!",
    },
    {
        extraversion: "extraversion",
        question: "Are you excited about being in the center of attention?",
        a: "Where is my stage?",
        b: "I dont care.",
        c: "Leave me alone!",
    },
    {
        conscientiousness: "conscientiousness",
        question: "Do you prefer an organized desk or creative chaos?",
        a: "I will be president one day!",
        b: "I dont care.",
        c: "Two plus two equals 7985316",
    },
    {
        neuroticism: "neuroticism",
        question: "Is it easy for someone to upset you or are you an iron knight?",
        a: "I am shitting my pants right now!",
        b: "I dont care.",
        c: "I will defend thy honor!",
    },
    {
        agreeableness: "agreeableness",
        question: "Do you get along with most people well?",
        a: "Daisies and Ponies for all! <3",
        b: "I dont care.",
        c: "If its not cute, i'll get rude!",
    },
];


const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const quizHeader = document.getElementById('quizHeader')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const submitBtn = document.getElementById('submit')
// const imageContainer = document.getElementById('imageContainer')


let openness = 0
let extraversion = 0
let conscientiousness = 0
let neuroticism = 0
let agreeableness = 0
let personality = 0

let currentDimension = 0        //the personality dimension is determined by the index of the quizData array
let score = 0
loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentDimension]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c    
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

function determinePersonality(openness, extraversion, conscientiousness, neuroticism, agreeableness) {
    let highest = Math.max(openness, extraversion, conscientiousness, neuroticism, agreeableness);
    let personality = '';
  
    if (highest === openness) {
        personality = quizData[0].openness;
    } else if (highest === extraversion) {
        personality = quizData[1].extraversion;
    } else if (highest === conscientiousness) {
        personality = quizData[2].conscientiousness;
    } else if (highest === neuroticism) {
        personality = quizData[3].neuroticism;
    } else if (highest === agreeableness) {
        personality = quizData[4].agreeableness;
    }
  
  return personality;
}

function showResultImage(personality) {
    let resultImageSrc = '';  
    let result = '';
    const resultImage = document.getElementById('resultImage');
    /* const a_input = document.getElementById('a_text');
    const b_input = document.getElementById('b_text');
    const c_input = document.getElementById('c_text'); */
    const imageDiv = document.getElementById('imageDiv');
    const resultText = document.getElementById('resultText');

    
    

    if (personality === 'openness') {
        resultImageSrc = 'images/luna.jpeg';
        result = "That's Luna";
    } else if (personality === 'extraversion') {
        resultImageSrc = 'images/aslan.JPG';
        result = 'Say hello to Aslan';
    } else if (personality === 'conscientiousness') {   
        resultImageSrc = 'images/momo.jpeg';
        result = 'Momo is already at work';
    } else if (personality === 'neuroticism') {
        resultImageSrc = 'images/sigfried.jpeg';
        result = 'Sigfried wants to relax with you';
    } else if (personality === 'agreeableness') {
        resultImageSrc = 'images/enola.jpg';
        result = 'On a diplomatic mission, Enola';
    }

    resultText.innerHTML = result;
    resultText.setAttribute("style", "display: block");
    imageDiv.setAttribute("style", "display: block");
    /* a_input.setAttribute("style", "display: none");
    b_input.setAttribute("style", "display: none");
    c_input.setAttribute("style", "display: none"); */
    resultImage.setAttribute("style", "display: inline"); 
    resultImage.setAttribute("src", resultImageSrc);
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === "a") {
        score = score + 5;
       }
       if(answer === "b") {
        score = score + 3;
       }
       if(answer === "c") {
        score = score + 1;
       }
       currentDimension++

       switch(currentDimension){
        case 1:
            openness = openness + score;
            break;
        case 2:
            extraversion = extraversion + score;
            break;
        case 3:
            conscientiousness = conscientiousness + score;
            break;
        case 4:
            neuroticism = neuroticism + score;
            break;
        case 5:
            agreeableness = agreeableness + score;
            break;
        }

        if(currentDimension < quizData.length) {
           loadQuiz()
           score = 0;
        } else {
            personality = determinePersonality(openness, extraversion, conscientiousness, neuroticism, agreeableness);

            showResultImage(personality);

            questionEl.innerHTML = `
            You score high in ${personality}!<br>
            Check our animal section for a pet with your personality style. :)<br>
            `
                       

            submitBtn.setAttribute("onclick", "location.reload()")
            submitBtn.innerText = "Do it again!"
        }
    }
})