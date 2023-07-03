/*global KeyCodes*/
const KeyCodes = {
  81: 'q',
  87: 'w',
  69: 'e',
  82: 'r',
  84: 't',
  89: 'y',
  85: 'u',
  73: 'i',
  79: 'o',
  80: 'p',
  219: '[',
  221: ']',
  220: '\\',
  65: 'a',
  83: 's',
  68: 'd',
  70: 'f',
  71: 'g',
  72: 'h',
  74: 'j',
  75: 'k',
  76: 'l',
  186: ';',
  222: "'",
  90: 'z',
  88: 'x',
  67: 'c',
  86: 'v',
  66: 'b',
  78: 'n',
  77: 'm',
  188: ',',
  190: '.',
  191: '/',
  32: ' ',
};

let commandStack = [];
let commandIndex = 0;

//files
const files = [
  'about.txt',
  'education.txt',
  'experience.txt',
  'technologies.txt',
  'contact.txt',
];

const Info = {
  'about.txt': `I am Dhrubesh, a Front-end Devloper from India. I love web development and soft rock.`,
  'education.txt': 'B-tech Computer Science , SRM univ Chennai India',
  'experience.txt': `
Senior Front-end Developer @Allganize(May2021-July2023)
----------------
Senior Front-end Developer @Makeen(Jan2021-May2021) 
----------------
Front-end Developer @Razorpay(June2019-Dec2020) 
----------------
Front-end Intern @Razorpay(Jan2019-April2019) 
----------------
Front-end Intern @Inkmonk(Aug2018-Sept2018) 
----------------
Product Developer Intern @Postman(June2018-July2018)
----------------
Technical Content Manager @Programming HUB(Jan2018-May2018)
----------------
Content Creator @Programming HUB(Dec2017-Jan2018)
----------------
Front-end Intern @EdXengine(July2017-Nov2017)
----------------
UI Developer Intern @Pickyourtrail(May2017-July2017)
----------------
Front-End Intern @Try Cinema(Sept2016-Feb2017)`,
  'technologies.txt': 'JavaScript, ReactJS, Redux, Webpack etc..',
  'contact.txt': 'Email: dhrubesh97@gmail.com',
};

const commands = {
  ls: (x) => {
    if (x.replace(' ', '') == 'ls') {
      displayOutput(
        `about.txt education.txt experience.txt technologies.txt contact.txt`
      );
    } else {
      errorMessage(x);
    }
  },
  clear: (x) => {
    let terminal = document.getElementById('terminal');
    let bash = document.getElementById('bash');
    terminal.innerHTML = '';
    terminal.appendChild(bash);
    document.getElementById('input').innerHTML = '';
  },
  cat: (x) => {
    let info = x.replace('cat ', '');
    displayOutput(Info[info]);
  },
  echo: (x) => {
    let data = x.replace('echo ', '');
    displayOutput(data);
  },
  help: (x) => {
    let commandList = Object.keys(commands);
    let data = 'Try these commands to find out more about me: ';
    for (let i = 0; i < commandList.length; i++) {
      data += commandList[i] + ', ';
    }
    displayOutput(data.slice(0, data.length - 2));
  },
};

function displayOutput(output) {
  const elem = document.createElement('P');
  const terminal = document.getElementById('terminal');
  const bash = document.getElementById('bash');
  const NewTerminal = bash.cloneNode(true);
  document.getElementById('blinker').innerHTML = '';
  document.getElementById('blinker').setAttribute('id', '');
  document.getElementById('input').setAttribute('id', '');
  bash.setAttribute('id', '');
  elem.innerHTML = output;
  elem.style.whiteSpace = 'pre-wrap';
  terminal.appendChild(elem);
  terminal.appendChild(NewTerminal);
  document.getElementById('input').innerHTML = '';
}

function errorMessage(x) {
  displayOutput('bash: ' + x.innerHTML + ': command not found');
}

document.addEventListener('keydown', function (event) {
  let x = document.getElementById('input');
  key = event.keyCode;
  if (key == 13) {
    if (commands[x.innerHTML.split(' ')[0]] != undefined) {
      commands[x.innerHTML.split(' ')[0]](x.innerHTML);
      if (x.innerHTML != '') {
        commandStack.push(x.innerHTML);
      } else {
        commandStack.push('clear');
      }
      commandIndex = commandStack.length;
    } else if (x.innerHTML.split(' ')[0] == '') {
      displayOutput('');
    } else {
      errorMessage(x);
    }
  }

  if (key == 38) {
    if (commandIndex - 1 >= 0) {
      commandIndex -= 1;
      x.innerHTML = commandStack[commandIndex];
    }
  }
  if (key == 40) {
    if (commandIndex + 1 < commandStack.length) {
      commandIndex += 1;
      x.innerHTML = commandStack[commandIndex];
    }
  }
  if (key == 8) {
    x.innerHTML = x.innerHTML.slice(0, x.innerHTML.length - 1);
  } else if (KeyCodes[key] != undefined) {
    x.innerHTML = x.innerHTML + KeyCodes[key];
  }
  if (key == 9) {
    event.preventDefault();
    let command = x.innerHTML.split(' ')[0];
    let file = x.innerHTML.split(' ')[1];
    for (let i = 0; i < files.length; i++) {
      if (files[i].includes(file)) {
        x.innerHTML = command + ' ' + files[i];
        break;
      }
    }
  }
});

const details = navigator.userAgent;
const regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
if (isMobileDevice) {
  console.log('You are using a Mobile Device');
  alert('Please open the website on Desktop to get the full experience');
}
