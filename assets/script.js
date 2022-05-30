const gridContainer = document.getElementById("grid-container");
const addPunti = document.getElementById('punti');

function gridGen(num1, num2){

    let num = 0;
    let punti = 0;

    for (let i = 0; i < (num1 * num2); i++){
        const cell = document.createElement("div");
        num = i + 1;
        cell.classList.add("cell");
        cell.setAttribute('id', `${num}`);
        cell.style.width = `calc(100% / ${num1})`;
        cell.style.aspectRatio = `1 / 1`;
        gridContainer.append(cell);
        cell.innerHTML = `<p>${num}</p>`;

        cell.addEventListener('click', function(){

            if(!(this.className === 'cell bomb' || this.className === 'cell bg-info')){
                if(bombList.includes(parseInt(this.id))){
                    this.classList.remove('flag');
                    for(let i = 0; i < bombList.length; i++){
                        document.getElementById(bombList[i]).classList.add('bomb');
                    }
                    document.getElementById('endBanner').classList.remove('d-none');
                    document.getElementById('perso').classList.remove('d-none');
                }else{
                    this.classList.remove('flag');
                    this.classList.add("bg-info");
                    punti = punti + 1;
                    if(punti < ((num1 * num2) - 16)){
                    
                    addPunti.innerHTML= `${punti}`;
                    } else {
                        document.getElementById('endBanner').classList.remove('d-none');
                        document.getElementById('vinto').classList.remove('d-none');
                    }
                }
            }
        });

        cell.addEventListener('contextmenu', function(event){
            event.preventDefault();
            if(!(this.className === 'cell bomb' || this.className === 'cell bg-info')){
            this.classList.add('flag');
            }
        });
    }

        const bombList = [];
        for (let i = 0; i < 16; i++){
            const randomNumber = Math.floor(Math.random()*(num1 * num2) + 1);
            if(bombList.indexOf(randomNumber) === -1){
                bombList.push(randomNumber);
            } else {
                i--;
            }
        }
        console.log(bombList);

        
}



document.getElementById("genera").addEventListener('click', function(){

    gridContainer.innerHTML= "";
    addPunti.innerHTML= "";
    document.getElementById('endBanner').classList.add('d-none');

    const difficolta = document.getElementById('difficolta').value;

    if (difficolta === '1'){
        gridGen(10,10);
    } else if (difficolta === '2'){
        gridGen(9, 9);
    } else {
        gridGen(7, 7);
    }
});