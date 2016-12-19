(function () {
    var model = {
        dogList: [
            new Dog('Baby Bilbo', 'images/dog.png'),
            new Dog('Happy Bilbo', 'images/dog-2.png'),
            new Dog('Dancing Bilbo', 'images/dog-3.png'),
            new Dog('Formal Bilbo', 'images/dog-4.png'),
            new Dog('Rabbit Bilbo', 'images/dog-5.png'),
        ],
        selectedDog: null,
    };

    var octupus = {
        init: function () {
            listView.init();
            listView.render();

            dogView.init();
            dogView.render();
        },
        getDogs: function () {
            return model.dogList;
        },
        setDog: function (e) {
            var listItem = e.target,
                selectedDog = model.dogList[listItem.getAttribute('data-dog')],
                isSame = model.selectedDog === selectedDog;
            model.selectedDog = !isSame ? selectedDog : null;

            var items = document.getElementsByClassName('dog-list__item--selected');
            for (var i = 0; i < items.length; i++) {
                var d = items[i];
                d.classList.remove('dog-list__item--selected');
                d.tabIndex = 0;
            }

            if (!isSame) {
                listItem.classList.add('dog-list__item--selected');
                listItem.tabIndex = -1;
            }

            dogView.render();
        },
        selectedDog: function () {
            return model.selectedDog;
        }
    };

    var listView = {
        init: function () {
            this.dogListElement = document.getElementsByClassName('dog-list')[0];
        },
        render: function () {
            var dogListElement = this.dogListElement;
            dogListElement.innerHTML = '';

            octupus.getDogs().forEach(function (e, i) {
                var dogListItem = document.createElement('li');

                dogListItem.classList.add('dog-list__item');
                dogListItem.innerText = e.name;
                dogListItem.tabIndex = 0;
                dogListItem.setAttribute('data-dog', i);
                dogListItem.setAttribute('aria-controls', 'dogView');

                dogListItem.addEventListener('keypress', function (e) {
                    if (e.keyCode === 32)
                        e.preventDefault();
                });
                dogListItem.addEventListener('keyup', function (e) {
                    if (e.keyCode === 32)
                        octupus.setDog(e);
                });
                dogListItem.addEventListener('click', function (e) {
                    octupus.setDog(e);
                });

                dogListElement.appendChild(dogListItem);
            });
        }
    };
    var dogView = {
        init: function () {
            this.dog = document.getElementById('dogView');
            this.dogName = this.dog.getElementsByClassName('dog__name')[0];
            this.dogImage = this.dog.getElementsByClassName('dog__image')[0];
            this.dogClickCount = this.dog.getElementsByClassName('dog__click-count')[0];
            this.eventListener;
            this.dogLoading = this.dog.getElementsByClassName('dog__loading')[0];
        },
        render: function () {
            var dogImage = this.dogImage,
                dogLoading = this.dogLoading;
            
            dogImage.removeEventListener('click', this.eventListener);
            this.dog.setAttribute('aria-hidden', true);
            this.dog.removeAttribute('aria-expanded');
            dogImage.setAttribute('aria-hidden', true);
            dogLoading.removeAttribute('aria-hidden');

            var selectedDog = octupus.selectedDog();
            if (selectedDog === null)
                return;

            this.dog.removeAttribute('aria-hidden');
            this.dog.setAttribute('aria-expanded', true);

            this.dogName.innerText = selectedDog.name;
            dogImage.src = selectedDog.url;
            dogImage.onload = function () {
                dogImage.removeAttribute('aria-hidden');
                dogLoading.setAttribute('aria-hidden', true);
            };

            var dogClickCount = this.dogClickCount;
            dogClickCount.innerText = selectedDog.clickCount + ' clicks';

            this.eventListener = function () {
                dogClickCount.innerText = ++selectedDog.clickCount + ' clicks';
            };

            dogImage.addEventListener('click', this.eventListener);
        }
    };

    function Dog(name, url) {
        this.name = name;
        this.url = url;
        this.clickCount = 0;
    };

    octupus.init();
})();