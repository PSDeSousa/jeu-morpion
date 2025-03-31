// Le plateau de jeu virtuel )
let virtualBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//cases
let plateau = document.getElementById("plateau");
let squares = document.querySelectorAll(".square");
//jettons
let scoreJ1 = document.querySelector(".score-j1");
let scoreJ2 = document.querySelector(".score-j2");
//score
let sco1 = 0;
let sco2 = 0;
//indique si la fonction jeu a été lancée
let enJeu = false;
// Fonction qui vérifie si toutes les casses du jeu sont jouées
function fullBoard(){
    let j = 0;
    for (let i = 1; i <= 9; i++){
        if (virtualBoard[i - 1] === 0){
            j = j + 1;
        }
    };
    if (j === 0){
        setTimeout(() => alert("La partie est terminée il n'y a pas de vainqueur !"), 300);
        return true;
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
// Fonction recommencer une manche ou une partie ou réactualise la page
function restart(){
    let choix = "vide";
    while ((choix != "manche") && (choix != "partie") && (choix != "arret")){
        choix = prompt("Rejouer une manche de la partie, une nouvelle partie ou arrêter de jouer ? (m : manche/p : partie/a : arret)");
        if (choix === "m"){
            reset("N");
            commentaire("Joueur " + p + " : à ton tour !");
            play();
        }else if (choix === "p"){
            reset("O");
            commentaire("Joueur " + p + " : à ton tour !");
            play();
        }else if (choix === "a"){
            reset("O");
            window.location.reload();
        }else{       
            alert("Le choix doit être m, p ou a !");
        }
    }
};
// Fonction affichage commentaires
let comment = document.getElementById("text-comment");
function commentaire(texte){
    comment.innerText = texte;
}
// Lance la partie si clique sur le bouton nouvelle partie
let jouer = document.getElementById("start-play");
let textJouer = document.getElementById("text-play");
jouer.addEventListener("click", function (){
    if (enJeu === false){
        alert("La partie commence !");
        accordionCloseAll();
        accordionContent2.classList.remove("hidden");
        textJouer.innerText = "REMISE A 0";
        if (plateau.classList.contains("hidden")){
            plateau.classList.remove("hidden");
        };
        commentaire("Joueur 1 : à toi de jouer !");
        play();
        enJeu = true;
    }else{
        window.location.reload();
    }
});
// Fonction jouer (clique sur une case, change le contenu avec le jetton du joueur en cours puis change de joueur)
function play(){
    // indice joueur
    let p = 1;
    //indice case du plateau (1 à 9 => 0 à 8 dans le tableau)
    let k = 0;
    //indice qui permet de vider tableau virtuel et visuellement dans la boucle forEach
    let arret = false;
    //boucle qui vérifie si on clique sur une case et déclenche les actions
    squares.forEach(function(carre){
        let c = carre.querySelector(".item");
        carre.addEventListener("click", function(){
            //ré-initialisation du plateau virtuel et viuellement quand arret = vrai
            if (arret){
                for (let m = 0; m < virtualBoard.length; m++ ){
                    virtualBoard[m] = 0;
                };
                squares.forEach(function(carre){
                    let c = carre.querySelector(".item");
                    if (c.classList.contains("p1-piece")){
                        c.classList.remove("p1-piece");
                    }
                    else if (c.classList.contains("p2-piece")){
                        c.classList.remove("p2-piece");
                    }
                });
                arret = false;
            }
            //identifie le numéro de la case (chaque case à une classe C1 à 9)
            for (let i = 1; i <= 9; i++){
                if (c.classList.contains("c" + i)){
                    k = i;
                }
            }
            if (virtualBoard[k-1] != 0){
                //alert("La case est déjà jouée !");
            }else{
                //jeu qd joueur 1
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
                    commentaire("Joueur " + p + " : à toi de jouer !");
                //jeu qd joueur 2
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
                    commentaire("Joueur " + p + " : à toi de jouer !");
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