const player = ["joueur 1", "joueur 2"];
// Le plateau de jeu virtuel )
let virtualBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let squares = document.querySelectorAll(".square");
let scoreJ1 = document.querySelector(".score-j1");
let scoreJ2 = document.querySelector(".score-j2");
let sco1 = 0;
let sco2 = 0;
// Fonction qui vérifie si toutes les casses du jeu sont jouées )
function fullBoard(){
    let j = 0;
    for (let i = 1; i <= 9; i++){
        if (virtualBoard[i - 1] === 0){
            j = j + 1;
        }
    };
    if (j === 0){
        setTimeout(() => alert("La partie est terminée il n'y a pas de vainqueur !"), 300);
    }
}
// Fonction qui vérifie si le joueur a gagné : test toutes les combinaisons victorieuses)
function checkResult(b, joueur){
    if 
    (((b[0] === joueur) && (b[1] === joueur) && (b[2] === joueur)) || 
    ((b[3] === joueur) && (b[4] === joueur) && (b[5] === joueur)) || 
    ((b[6] === joueur) && (b[7] === joueur) && (b[8] === joueur)) || 
    ((b[0] === joueur) && (b[3] === joueur) && (b[6] === joueur)) || 
    ((b[1] === joueur) && (b[4] === joueur) && (b[7] === joueur)) || 
    ((b[2] === joueur) && (b[5] === joueur) && (b[8] === joueur)) || 
    ((b[0] === joueur) && (b[4] === joueur) && (b[8] === joueur)) || 
    ((b[2] === joueur) && (b[4] === joueur) && (b[6] === joueur)))
    {
        setTimeout(() => alert("Le joueur " + joueur + " a gagné !"), 300);
        return true;
    }
        return false;
}
// Fonction qui vide la grille et la grille virtuelle + remet à 0 le score suivant ce que les joueurs ont répondu
function reset(x){
    if (x === "O"){
        scoreJ1.innerText = "0";
        scoreJ2.innerText = "0";
        sco1 = 0;
        sco2 = 0;
    };
    squares.forEach(function(carre2){
        let c2 = carre2.querySelector(".item");
        if (c2.classList.contains("p1-piece")){
            c2.classList.remove("p1-piece");
        }
        else if (c2.classList.contains("p2-piece")){
            c2.classList.remove("p2-piece");
        }
    });
}
// Fonction recommencer une manche ou une partie
function restart(){
    let choix = "vide";
    while ((choix != "manche") && (choix != "partie")){
        choix = prompt("Rejouer une manche de la partie, une nouvelle partie ou arrêter (manche/partie/arret) ?");
        if (choix === "manche"){
            reset("N");
            play();
        }else if (choix === "partie"){
            reset("O");
            play();
        }else if (choix === "arret"){
            window.location.reload;
        }else{       
            alert("Le choix doit être manche, partie ou arret !");
        }
    }
};
// Lance la partie si clique sur le bouton nouvelle partie
let jouer = document.getElementById("start-play");
jouer.addEventListener("click", function (){
    reset("O");
    alert("La partie commence !");
    play();
});
// Fonction jouer (clique sur une case, change le contenu)
function play(){
    let p = 1;
    let k = 0;
    let arret = false;
    squares.forEach(function(carre){
        let c = carre.querySelector(".item");
        carre.addEventListener("click", function(){
            if (arret){
                for (let m = 0; m < virtualBoard.length; m++ ){
                    virtualBoard[m] = 0;
                };
                squares.forEach(function(carre2){
                    let c2 = carre2.querySelector(".item");
                    if (c2.classList.contains("p1-piece")){
                        c2.classList.remove("p1-piece");
                    }
                    else if (c2.classList.contains("p2-piece")){
                        c2.classList.remove("p2-piece");
                    }
                });
                arret = false;
            }
            for (let i = 1; i <= 9; i++){
                if (c.classList.contains("c" + i)){
                    k = i;
                }
            }
            if (virtualBoard[k-1] != 0){
                //alert("La case est déjà jouée !")
            }else{
                if (p === 1){
                    c.classList.add("p1-piece");
                    virtualBoard[k - 1] = p;
                    if (checkResult(virtualBoard, p)){
                        sco1 = sco1 + 1;
                        scoreJ1.innerText = sco1;
                        setTimeout(restart, 1000);
                        arret = true;
                    }else{
                        if (fullBoard()){
                            setTimeout(restart, 1000);
                            arret = true;
                        };
                    };
                    p = 2;
                }else{
                    c.classList.add("p2-piece");
                    virtualBoard[k - 1] = p;
                    if (checkResult(virtualBoard, p)){
                        sco2 = sco2 + 1;
                        scoreJ2.innerText = sco2;
                        console.log(sco2);
                        setTimeout(restart, 1000);
                        arret = true;
                    }else{
                        if (fullBoard()){
                            setTimeout(restart, 1000);
                            arret = true;
                        };
                    };
                    p = 1;
                };
            }
        })
    })
}
/**************************************** Accordéon sans boucle****************************************************/
/************** Appels d'objets ****************/
let accordionBtn = document.querySelector(".accordion-btn");
let accordionContent = document.querySelector(".accordion-content");
let closed = document.querySelector(".closed");
let accordionBtn2 = document.querySelector(".accordion-btn2");
let accordionContent2 = document.querySelector(".accordion-content2");
let closed2 = document.querySelector(".closed2");
/************** Fonction Fermer tout ****************/
function accordionCloseAll(){
    accordionContent.classList.add("hidden");
    closed.innerText = "+";
    accordionContent2.classList.add("hidden");
    closed2.innerText = "+";
}
/************** Clique accordéons 1, 2 puis 3 ****************/
accordionBtn.addEventListener("click", function(){
    if (accordionContent.classList.contains("hidden")){
        accordionCloseAll();
        accordionContent.classList.remove("hidden");
        closed.innerText = "-";
    }else{
        accordionCloseAll();
    }
})
accordionBtn2.addEventListener("click", function(){
    if (accordionContent2.classList.contains("hidden")){
        accordionCloseAll();
        accordionContent2.classList.remove("hidden");
        closed2.innerText = "-";
    }else{
        accordionCloseAll();
    }
})