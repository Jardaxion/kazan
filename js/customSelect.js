//Function for on or off visible options
function OnOffselect(idSelect, idOption){
    $(idSelect).toggleClass('active')
    $(idOption).toggleClass('active')
}

//Function for replace text from options to headline select
function replace(idSelect, idOption, idOptions){
    $(idSelect+' p:first-of-type').text($('.'+idOption).text());
    OnOffselect(idSelect, idOptions)
}

//Function fro first replace text from options to headline select
function firstReplace(idSelect, idOption){
    $(idSelect+' p:first-of-type').text($(idOption).text())
}

$('.select_body').each(function(){//Applying functions for all 
    let selectBody = '#'+$(this).attr('id') //We write down Id select (It is necessary to distinguish them from each other)

    $(selectBody + ' select option').each(function(i){
        $(selectBody + ' .options').append('<p class="option option'+i+'">'+$(this).text()+"</p>")
    })

    if(!$(this).data('placholder')){ //on or off first visible placeholder
        firstReplace(selectBody+' .select', selectBody+' .options .option0')//Aplying frist replace function
    }
    
    $(selectBody + ' .select').click(function(){ //Set click on header custom select
        OnOffselect(selectBody + ' .select', selectBody + ' .options')//Aplying on or off function
    })
    
    $(selectBody + ' .options .option').click(function(){ //Set click on option
        replace(selectBody + ' .select', $(this).attr('class').replace('option ', ''), selectBody + ' .options') //Aplying replace function
        $(selectBody + ' select').prop('selectedIndex', $(this).attr('class').replace('option ', '').replace(/[^\d]/g, '')) //We look at which element we have selected and select the same element in the usual select
    });

    $(selectBody + ' .options .option').css('width', $(selectBody).width());
    $(selectBody + ' .select').css('width', $(selectBody).width());
})