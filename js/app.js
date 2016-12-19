(function () {
    var dogList = [
        new Dog('Baby Bilbo', '/images/dog.png'),
        new Dog('Happy Bilbo', '/images/dog-2.png'),
    ];

    function Dog(name, url) {
        this.name = name;
        this.url = url;
        this.clickCounter = 0;
    };

    var dogListElement = document.getElementsByClassName('dog-list')[0];

    dogList.forEach(function (e) {
        var dogListItem = document.createElement('li');
        dogListItem.classList.add('dog-list__item');
        dogListElement.appendChild(dogListItem);
        
        var dogName = document.createElement('h2');
        dogName.innerText = e.name;
        dogListItem.appendChild(dogName);

        var clickCounter = document.createElement('p');
        clickCounter.classList.add('dog-list__click-counter');
        clickCounter.innerText = e.clickCounter;
        
        var img = new Image();
        img.src = e.url;
        img.classList.add('dog-list__dog');
        img.alt = 'A dog';
        img.setAttribute('width', 540);
        img.setAttribute('height', 540);
        img.addEventListener('click', function () {
            clickCounter.innerText = ++e.clickCounter;
        });

        dogListItem.appendChild(img);
        dogListItem.appendChild(clickCounter);
    });
})();