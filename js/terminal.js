/*global KeyCodes*/
let KeyCodes = {
    81:"q",
    87:"w",
    69:"e",
    82:"r",
    84:"t",
    89:"y",
    85:"u",
    73:"i",
    79:"o",
    80:"p",
    219:"[",
    221:"]",
    220:"\\",
    65:"a",
    83:"s",
    68:"d",
    70:"f",
    71:"g",
    72:"h",
    74:"j",
    75:"k",
    76:"l",
    186:";",
    222:"'",
    90:"z",
    88:"x",
    67:"c",
    86:"v",
    66:"b",
    78:"n",
    77:"m",
    188:",",
    190:".",
    191:"/",
    32:" "
};


let commandStack = [];
let commandIndex = -1;

let Info = {
    "about.txt":`I am Dhrubesh, a CS student from India. I love web development and acoustic music.`,
    "education.txt":"B-tech Computer Science , SRM univ Chennai India",
    "experience.txt":"blank", //update this later
    "languages.txt":"JavaScript", //update this later
    "contact.txt":"Email: dhrubesh97@gmail.com"
}

let commands = {
    "ls":(x)=>{
        displayOutput("about.txt education.txt  experience.txt languages.txt contact.txt");
    },
    "clear":(x)=>{
        let terminal = document.getElementById("terminal");
        let bash = document.getElementById("bash");
        terminal.innerHTML = "";
        terminal.appendChild(bash);
        document.getElementById("input").innerHTML = "";
    },
    "cat":(x)=>{
        let info = x.replace("cat ","");
        displayOutput(Info[info]);
    },
    "echo":(x)=>{
        let data = x.replace("echo ","");
        displayOutput(data);
    }
    
}

function displayOutput(output){
    let elem = document.createElement("P");
    let text = document.createTextNode(output);
    let terminal = document.getElementById("terminal");
    let bash = document.getElementById("bash");
    let NewTerminal = bash.cloneNode(true);
    document.getElementById("blinker").innerHTML = "";
    document.getElementById("blinker").setAttribute("id","");
    document.getElementById("input").setAttribute("id","");
    bash.setAttribute("id","");
    elem.appendChild(text);
    terminal.appendChild(elem);
    terminal.appendChild(NewTerminal);
    document.getElementById("input").innerHTML = "";
}
    

function errorMessage(x){
    displayOutput("bash: "+x.innerHTML+": command not found");
}

document.addEventListener('keydown', function(event) {
     let x = document.getElementById("input");
     key = event.keyCode;
     if(key == 13){
        //  debugger;
         if (commands[x.innerHTML.split(" ")[0]]!=undefined){
             commands[x.innerHTML.split(" ")[0]](x.innerHTML);
             commandStack.push(x.innerHTML);
             commandIndex +=1;
             console.log(commandStack);
             console.log(commandIndex);
         }else if(x.innerHTML.split(" ")[0]==""){
             displayOutput("");
         }
         else{
             errorMessage(x);
         }
         
     }
     
     if(key == 38){
         x.innerHTML = commandStack[commandIndex];
         if(commandIndex-1>0){
             commandIndex -=1;
         }
     }
     if(key == 40){
         x.innerHTML = commandStack[commandIndex];
         if(commandIndex+1<commandIndex.length){
             commandIndex +=1;
         }
     }
     if(key == 8){
         x.innerHTML = x.innerHTML.slice(0,x.innerHTML.length-1);
     }else if(KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + KeyCodes[key];
     }
     
});