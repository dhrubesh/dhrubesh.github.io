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
let commandIndex = 0;

//files
let files = ["about.txt" ,"education.txt"  ,"experience.txt", "languages.txt","contact.txt"];
        
let Info = {
    "about.txt":`I am Dhrubesh, a CS student from India. I love web development and acoustic music.`,
    "education.txt":"B-tech Computer Science , SRM univ Chennai India",
    "experience.txt":"Front-end Developer: ''Edxengine'' :-July 2017 to Present  ---||--- UI Developer : Pickyourtrail:- May 2017 - July 2017 || Front-End Developer : Try Cinema:- Sept 2016 - Feb 2017", //update this later
    "languages.txt":"JavaScript , AngularJS and ReactJS", //update this later
    "contact.txt":"Email: dhrubesh97@gmail.com"
}

let commands = {
    "ls":(x)=>{
        if(x.replace(" ","")=="ls"){
            displayOutput(`about.txt education.txt experience.txt languages.txt contact.txt`);
        }else{
            errorMessage(x);
        }
        
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
    },
    "help":(x)=>{
        let commandList = Object.keys(commands);
        let data = "Try these commands to find out more about me: ";
        for(let i=0;i<commandList.length;i++){
            data += commandList[i] + ", "
        }
        displayOutput(data.slice(0,data.length-2));
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
         if (commands[x.innerHTML.split(" ")[0]]!=undefined){
             commands[x.innerHTML.split(" ")[0]](x.innerHTML);
             if(x.innerHTML!=""){
                 commandStack.push(x.innerHTML);
             }else{
                 commandStack.push("clear");
             }
             commandIndex = commandStack.length;
         }else if(x.innerHTML.split(" ")[0]==""){
             displayOutput("");
         }
         else{
             errorMessage(x);
         }
         
     }
     
     if(key == 38){
         if(commandIndex-1>=0){
             commandIndex -=1;
             x.innerHTML = commandStack[commandIndex];
         }
     }
     if(key == 40){
         if(commandIndex+1<commandStack.length){
             commandIndex +=1;
             x.innerHTML = commandStack[commandIndex];
         }
     }
     if(key == 8){
         x.innerHTML = x.innerHTML.slice(0,x.innerHTML.length-1);
     }else if(KeyCodes[key]!= undefined){
         x.innerHTML = x.innerHTML + KeyCodes[key];
     }
     if(key == 9){
         event.preventDefault();
         let command = x.innerHTML.split(" ")[0];
         let file = x.innerHTML.split(" ")[1];
         for(let i=0;i<files.length;i++){
             if(files[i].includes(file)){
                 x.innerHTML = command +" "+files[i];
                 break;
             }
         }
     }
     
});