const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body')
buttons.forEach(function (buttons) {
    buttons.addEventListener('click', function (e) {
        console.log(e)
        console.log(e.target)
        if (e.target.id === 'grey')
         {
            body.style.background = e.target.id
        }
        if (e.target.id === 'black')
         {
            body.style.background = e.target.id
        }
        if (e.target.id === 'blue')
         {
            body.style.background = e.target.id
        }
        if (e.target.id === 'green')
         {
            body.style.background = e.target.id
        }
    });

});