(function () {
    var model = {
        dogList: [
            new Dog('Baby Bilbo', 'images/dog.png'),
            new Dog('Happy Bilbo', 'images/dog-2.png'),
            new Dog('Dancing Bilbo', 'images/dog-3.png'),
            new Dog('Formal Bilbo', 'images/dog-4.png'),
            new Dog('Rabbit Bilbo', 'images/dog-5.png'),
        ],
        currentDog: null,
    };

    var octupus = {
        init: function () {
            listView.init();
            dogView.init();
        },
        getDogs: function () {
            return model.dogList;
        },
        setDog: function (dog) {
            var isSame = model.currentDog === dog;
            model.currentDog = !isSame ? dog : null;
            dogView.render();
        },
        getCurrentDog: function () {
            return model.currentDog;
        },
        incrementCounter: function () {
            model.currentDog.clickCount++;
            dogView.render();
        }
    };

    var listView = {
        init: function () {
            this.dogListElement = document.getElementsByClassName('dog-list')[0];

            this.render();
        },
        render: function () {
            var dogListElement = this.dogListElement;
            dogListElement.innerHTML = '';

            octupus.getDogs().forEach(function (dog, i) {
                var dogListItem = document.createElement('li');

                dogListItem.classList.add('dog-list__item');
                dogListItem.innerText = dog.name;
                dogListItem.tabIndex = 0;
                dogListItem.setAttribute('data-dog', i);
                dogListItem.setAttribute('aria-controls', 'dogView');

                dogListItem.addEventListener('keypress', function (e) {
                    if (e.keyCode === 32)
                        e.preventDefault();
                });
                dogListItem.addEventListener('keyup', function (e) {
                    if (e.keyCode === 32)
                        e.target.click();
                });
                dogListItem.addEventListener('click', (function (dogCopy) {
                    return function () {
                        octupus.setDog(dogCopy);
                        setAsCurrent(dogListItem);
                    };
                })(dog));

                dogListElement.appendChild(dogListItem);

                var setAsCurrent = function (item) {
                        var items = document.getElementsByClassName('dog-list__item--selected');
                        for (var i = 0; i < items.length; i++) {
                            var d = items[i];
                            d.classList.remove('dog-list__item--selected');
                            d.tabIndex = 0;
                        }
                        
                        if (octupus.getCurrentDog() !== null) {
                            item.classList.add('dog-list__item--selected');
                            item.tabIndex = -1;
                        }  
                };
            });
        }
    };
    var dogView = {
        init: function () {
            this.dog = document.getElementById('dogView');
            this.dogName = this.dog.getElementsByClassName('dog__name')[0];
            this.dogImage = this.dog.getElementsByClassName('dog__image')[0];
            this.dogClickCount = this.dog.getElementsByClassName('dog__click-count')[0];
            this.dogLoading = this.dog.getElementsByClassName('dog__loading')[0];

            this.dogImage.addEventListener('click', function () {
                octupus.incrementCounter();
            });

            this.render();
        },
        render: function () {
            var dogImage = this.dogImage,
                dogLoading = this.dogLoading;

            this.dog.setAttribute('aria-hidden', true);
            this.dog.removeAttribute('aria-expanded');
            dogImage.setAttribute('aria-hidden', true);
            dogLoading.removeAttribute('aria-hidden');

            var currentDog = octupus.getCurrentDog();
            if (currentDog === null)
                return;

            this.dog.removeAttribute('aria-hidden');
            this.dog.setAttribute('aria-expanded', true);

            this.dogName.innerText = currentDog.name;
            dogImage.src = currentDog.url;
            dogImage.onload = function () {
                dogImage.removeAttribute('aria-hidden');
                dogLoading.setAttribute('aria-hidden', true);
            };

            var dogClickCount = this.dogClickCount;
            dogClickCount.innerText = currentDog.clickCount + ' clicks';
        }
    };

    function Dog(name, url) {
        this.name = name;
        this.url = url;
        this.clickCount = 0;
    };

    octupus.init();
})();