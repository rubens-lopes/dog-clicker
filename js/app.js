(function () {
    var counterValue = 0,
        counter = document.getElementById('click-counter'),    
        dog = document.getElementById('dog');
    
    dog.addEventListener('click', function () {
        counter.innerText = ++counterValue;
    })
})();