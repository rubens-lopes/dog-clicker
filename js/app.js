(function () {
    var dogList = [
        new Dog('Baby Bilbo', 'images/dog.png'),
        new Dog('Happy Bilbo', 'images/dog-2.png'),
        new Dog('Dancing Bilbo', 'images/dog-3.png'),
        new Dog('Formal Bilbo', 'images/dog-4.png'),
        new Dog('Rabbit Bilbo', 'images/dog-5.png'),
    ];
    var dogListElement = document.getElementsByClassName('dog-list')[0],
        dog = document.getElementsByClassName('dog')[0],
        dogName = document.getElementsByClassName('dog__name')[0],
        dogImage = document.getElementsByClassName('dog__image')[0],
        dogCounterClick = document.getElementsByClassName('dog__click-counter')[0],
        eventListener;

    function Dog(name, url) {
        this.name = name;
        this.url = url;
        this.clickCounter = 0;
    };
    function resetListState() {
        dogImage.removeEventListener('click', eventListener);
        dog.setAttribute('aria-hidden', true);

        var dogs = document.getElementsByClassName('dog-list__item');
        for (var i = 0; i < dogs.length; i++) {
            var d = dogs[i];
            d.classList.remove('dog-list__item--selected');
            d.tabIndex = 0;
        }
    };

    dogList.forEach(function (e) {
        var dogListItem = document.createElement('li');

        dogListItem.classList.add('dog-list__item');
        dogListItem.innerText = e.name;
        dogListItem.tabIndex = 0;

        var setDog = function () {
            if (dogListItem.classList.contains('dog-list__item--selected'))
                return resetListState();

            resetListState();
            dogListItem.classList.add('dog-list__item--selected');
            dogListItem.tabIndex = -1;

            dog.removeAttribute('aria-hidden');

            dogName.innerText = e.name;
            dogImage.src = e.url;
            dogCounterClick.innerText = e.clickCounter;

            eventListener = function () {
                dogCounterClick.innerText = ++e.clickCounter;
            };

            dogImage.addEventListener('click', eventListener);
        };
        dogListItem.addEventListener('keypress', function (e) {
            if (e.keyCode === 32)
                e.preventDefault();
        });
        dogListItem.addEventListener('keyup', function (e) {
            if (e.keyCode === 32)
                setDog();
        });
        dogListItem.addEventListener('click', setDog);

        dogListElement.appendChild(dogListItem);
    });
})();