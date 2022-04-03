const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('mouseenter', buttonHover));
buttons.forEach(button => button.addEventListener('mouseleave', buttonHover));

function buttonHover(){
    // console.log(this);
    this.classList.toggle('buttonHover');
}