let arr = [], steps = [], step = 0;

function render(a, highlight=[]) {
    let box = document.getElementById("array");
    box.innerHTML = "";
    a.forEach((v,i)=>{
        let d = document.createElement("div");
        d.className = "bar";
        d.style.height = v*3 + "px";
        if(highlight.includes(i)) d.style.background="red";
        box.appendChild(d);
    });
}

function randomArray(){
    arr = Array.from({length:10},()=>Math.floor(Math.random()*50)+5);
    render(arr);
}

function setArray(){
    let val = document.getElementById("input").value;
    arr = val.split(",").map(Number);
    render(arr);
}

function save(a,msg,h=[]){
    steps.push({a:[...a],msg,h});
}

function start(type){
    steps=[]; step=0;
    if(type==="bubble") bubble();
    if(type==="selection") selection();
    if(type==="insertion") insertion();
    show();
}

function bubble(){
    let a=[...arr];
    for(let i=0;i<a.length;i++){
        for(let j=0;j<a.length-i-1;j++){
            save(a,`Comparing ${a[j]} & ${a[j+1]}`,[j,j+1]);
            if(a[j]>a[j+1]){
                [a[j],a[j+1]]=[a[j+1],a[j]];
                save(a,"Swapped",[j,j+1]);
            }
        }
    }
}

function selection(){
    let a=[...arr];
    for(let i=0;i<a.length;i++){
        let min=i;
        for(let j=i+1;j<a.length;j++){
            save(a,`Checking ${a[j]}`,[j,min]);
            if(a[j]<a[min]) min=j;
        }
        [a[i],a[min]]=[a[min],a[i]];
        save(a,"Placed minimum",[i,min]);
    }
}

function insertion(){
    let a=[...arr];
    for(let i=1;i<a.length;i++){
        let key=a[i], j=i-1;
        while(j>=0 && a[j]>key){
            a[j+1]=a[j];
            save(a,"Shifting",[j,j+1]);
            j--;
        }
        a[j+1]=key;
        save(a,"Inserted",[j+1]);
    }
}

function show(){
    let s=steps[step];
    render(s.a,s.h);
    document.getElementById("explanation").innerText=s.msg;
}

function next(){
    if(step<steps.length-1) step++;
    show();
}

function prev(){
    if(step>0) step--;
    show();
}