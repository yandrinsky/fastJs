let __fastJsMethods = {

    Matrix(x, y) {
        class Matrix {
            constructor(x, y) {
                this.maxX = x
                this.maxY = y
                this.currentX = 0
                this.currentY = 0
                this._matrix = {}
            }


            _isTooBigCoordinates(x, y) {
                if (x >= this.maxX || y >= this.maxY) {
                    throw new Error('Too big coordinates ')
                }
            }

            fill(...args) {
                args.forEach(el => {
                    if (this.currentX === this.maxX) {
                        this.currentY++
                        this.currentX = 0
                    }

                    if (this.currentY === this.maxY) {
                        throw new Error('Matrix is full')
                    }

                    this._matrix[((this.currentY * this.maxY) + this.currentX)] = el
                    this.currentX++
                })
            }

            get(x, y) {
                this._isTooBigCoordinates(x, y)

                return this._matrix[y * this.maxY + x]
            }

            set(x, y, value) {
                this._isTooBigCoordinates(x, y)

                if (this._matrix[y * this.maxY + x] !== undefined) {
                    throw new Error(`Сell ${'x: ' + x + ', y: ' + y} has a property`)
                }
                this._matrix[y * this.maxY + x] = value
            }

            rewrite(x, y, value) {
                this._isTooBigCoordinates(x, y)

                this._matrix[y * this.maxY + x] = value
            }

            get getMatrix() {
                return this._matrix
            }

        }
        return new Matrix(x, y)
    },
    List() {
        class List {
            constructor() {
                this.data = {}
                this.link = this.data
                this.isClear = true
            }

            push(...data) {

                if (this.isClear) {
                    this.isClear = false
                }

                data.forEach(el => {
                    this.link.value = el
                    this.link.rest = {}
                    this.link = this.link.rest
                })
            }

            unshift(data) {
                if (this.isClear) {
                    this.value = data
                    this.rest = {}
                    this.link = this.link.rest
                    this.isClear = false
                } else {
                    let list = this._prepareList()
                    this.value = data
                    this.rest = list
                }

            }

            each(func) {
                let link = this.data
                let i = -1
                while (link.value !== undefined) {
                    i++
                    func(link.value, i)

                    link = link.rest
                }
            }

            [Symbol.iterator]() {
                let link = this.data
                let i = -1

                return {
                    next() {
                        if (link.value !== undefined) {
                            i++
                            let value = link.value
                            link = link.rest
                            return {value, done: false}
                        } else {
                            return {value: undefined, done: true}
                        }
                    }
                }
            }

            isExist(item) {
                let link = this.data
                let answer = false
                while (link.value !== undefined) {
                    if (link.value === item) answer = true
                    link = link.rest
                }
                return answer
            }

            nth(number) {
                let link = this.data
                for (let i = 0; i < number; i++) {
                    if (link.value !== undefined) link = link.rest
                    else return undefined
                }
                return link.value
            }


            get getList() {
                return this.data
            }

            get getArray() {
                let link = this.data
                let arr = []
                while (link.value !== undefined) {
                    arr.push(link.value)
                    link = link.rest
                }
                return arr
            }
        }
        return new List()
    },

    each: function (func) {
        if (_select.length === undefined) {
            func(this, 0)
        } else {
            _select.forEach((el, id) => {
                _select = el
                func(this, id)
            })
        }
    },

    sel: function (selector) {
        let find = document.querySelectorAll(selector);
        if (find.length === 0) {
            throw new Error(`Не удалось найти элемент ${selector}. Возможно, неверно задан селектор`)
        }
        if (find.length > 1) {
            _select = find;
        } else {
            document.querySelector(selector);
            _select = find[0]
        }
        return this
    },

    id: function (selector) {
        document.getElementById(selector);
        _select = document.getElementById(selector);
        return this;
    },

    click: function (func) {
        _select.addEventListener('click', func);
        return this;
    },

    text: function (content) {
        _select.textContent = content;
        return this;
    },

    random: function (to, from = 0) {
        if (from > 1) {
            return Math.floor(Math.random() * (to - (from - 1))) + from;
        } else if (from === 1) {
            return Math.floor(Math.random() * to) + from;
        } else {
            return Math.floor(Math.random() * (to + 1)) + from;
        }
    },

    addClass: function (classes = []) {
        for (let i = 0; i < classes.length; i++) {
            _select.classList.add(classes[i]);
        }
        return this;
    },

    removeClass: function (classes = []) {
        for (let i = 0; i < classes.length; i++) {
            _select.classList.remove(classes[i]);
        }
        return this;
    },

    removeEvent: function (event, func) {
        if (event === 'cl') {
            _select.removeEventListener('click', func);
        }
    },

    toggleClass: function (classes) {
        for (let i = 0; i < classes.length; i++) {
            _select.classList.toggle(classes[i]);
        }
        return this;
    },

    hide: function () {
        _select.style.display = 'none';
        return this;
    },

    show: function () {
        _select.style.display = '';
        return this;
    },

    insertHTML: function (html, place = 'beforeend') {
        _select.insertAdjacentHTML(place, html);
        return this;
    },
    sort: function (arr, type) {
        if (arr.length > 1) {
            let pivot = arr[0]
            let less = []
            let greater = []
            for (let b = 1; b < arr.length; b++) {
                if (arr[b] < pivot) {
                    less.push(arr[b])
                } else {
                    greater.push(arr[b])
                }
            }
            if (type === 'to-high') {
                return this.sort(less, type).push(pivot).concat(this.sort(greater, type))
            } else {
                return this.sort(greater, type).push(pivot).concat(this.sort(less, type))
            }
        } else {
            return arr
        }

    },
    clearWord: function (word) {
        return word.trim()
    },
    log: function (...elems) {
        console.log(...elems)
    },

    range: function (start = 0, end = 0, step = 1) {
        let arr = []
        if (start <= end) {
            for (let i = start; i <= end; i += step) {
                arr.push(i)
            }
        } else {
            if (step === 1) step = -1
            for (let i = start; i >= end; i += step) {
                arr.push(i)
            }
        }
        return arr
    },

    createList: function () {
        return new List()
    },

    deepEqual: function (item1, item2) {
        function arraysEqual(item1, item2) {
            if (item1.length === item2.length) {
                for (let i = 0; i < item1.length; i++) {
                    if (item1[i] !== item2[i]) {
                        return false
                    }
                }
                return true
            } else return false
        }

        function objectsEqual(item1, item2) {
            let keys1 = Object.keys(item1)
            let keys2 = Object.keys(item2)
            if (arraysEqual(keys1, keys2)) {
                for (let key of keys1) {
                    if (item1[key] !== item2[key]) {
                        return false
                    }
                }
                return true
            } else {
                return false
            }
        }

        if ((typeof item1) === (typeof item2)) {
            if (typeof item1 === "object") {
                if (Array.isArray(item1) === Array.isArray(item2)) { //Оба массивы или оба не массивы
                    if (Array.isArray(item1)) { //Если элементы массивы
                        return arraysEqual(item1, item2)
                    } else {//Если элементы НЕЕЕЕЕЕ массивы
                        return objectsEqual(item1, item2)
                    }

                }
            } else if (typeof item1 === 'none') {
                return false ///// Заглушка!
            }

        }
        return false
    },

    get vanilla() {
        return _select
    },

    set html(html) {
        _select.innerHTML = html
        return this;
    },
}

function fs(selector) {

    _select = ''

    if (selector) {
        fs.sel(selector)
        return fsObj
    } else {
        return fsObj
    }
}

fs.__proto__ = __fastJsMethods




let list = fs.List()

fs.log(list.getArray)





