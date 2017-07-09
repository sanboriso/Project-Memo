// cards collection as an array + flipped tiles counter

var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var tiles_flipped = 0;

// a loop randomizing the order of array elements, based on Fisher-Yates algorithm

Array.prototype.shuffle = function(){
    
    var i = this.length, j, temp; 

    while(--i > 0){
        j = Math.floor(Math.random()*(i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

// new board generated on page load

function newBoard(){
    
    tiles_flipped = 0;
    var output = '';
    memory_array.shuffle();
    
    for(var i = 0; i < memory_array.length; i++){
        
        output += '<div class="card-container"><div class="card '+memory_array[i]+'" id="tile_'+i+'")"><div class="front"></div><div class="back"><img src="'+memory_array[i]+'.jpg"></img></div></div></div>'
        
    }
    
    document.getElementById('game-board').innerHTML = output;
} 

// onclick interaction

$(document).ready(function(){
    
var id00 = "";
var id01 = "";
var counter = 0;
    
$(".card").click(function(){ 
    
    // flip 1st card
    
    if (!$(this).hasClass("flipped") && counter==0){
        $(this).toggleClass("flipped");
        counter++;
        id00 = $(this).attr('id');
    } 
    
    // flip 2nd card
    
    else if (!$(this).hasClass("flipped") && counter==1){
        $(this).toggleClass("flipped");
        counter++;
        id01 = $(this).attr('id');
        
        if ($('#'+id00).attr("class") == $('#'+id01).attr("class")){
            $('#'+id00).toggleClass("match");
            $('#'+id01).toggleClass("match");
            tiles_flipped += 2;
            id00 = "";
            id01 = "";
            counter = 0;
            
            if(tiles_flipped == memory_array.length){
                
                    function setNewGame(){
                        alert("Plansza wyczyszczona! Generowanie nowej planszy...");
                        /*document.getElementById('game-board').innerHTML="";
                        newBoard()*/
                        location.reload(true);
                    ;}
                
                    setTimeout(setNewGame, 800);
            }
        } 
        
        else {
                            
            // flip the two cards back
            
            function noMatch(){
                $('#'+id00).toggleClass("flipped");
                $('#'+id01).toggleClass("flipped");
                id00 = "";
                id01 = "";
                counter = 0;
            }
            
            setTimeout(noMatch, 800);
        }
    } 
/*        console.log($(this).attr("class"));
        console.log(counter);*/
});
});