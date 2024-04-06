const message = {value: "A"};

class Vestaboard {
    #current_row = 0;
    #current_column = 0;
    constructor (rows = 20, columns = 20, container = "vestaboard-container") {
        this.CHARS = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        //this.NUMBERS = "1234567890".split("");
        this.MAX_ROWS = rows;
        this.MAX_COLUMNS = columns;
        this.ROOT_CONTAINER = document.getElementById(container);
        this.ANIMATION_CONTAINER = this.initialiseCharDiv();
        this.initialiseHTML();
    }
    initialiseHTML () {
        for (let r = 0; r < this.MAX_ROWS; ++r) {
            const row = document.createElement('div');
            const className = "row row_" + r;
            row.className = className;
            for (let c = 0; c < this.MAX_COLUMNS; ++c) {
                const col = document.createElement('span');
                const className = "col col_" + c;
                col.className = className;
                row.appendChild(col);
            }
            this.ROOT_CONTAINER.appendChild(row);
        }
    }
    initialiseCharDiv () {
        const charDiv = document.createElement('div');
        charDiv.id = "animate-chars";
        this.CHARS.forEach((e,i) => {
            const charChild = document.createElement('div');
            charChild.id = i;
            charChild.innerText = e;
            charChild.setAttribute('style', 'height: 50px'); // Set this to dynamic with the row
            charDiv.appendChild(charChild);
        })
        return charDiv;
    }
    transformMessage (msg) {
        let plotArr = null;
        if (msg && typeof msg == 'string' && msg.length > 0) {
            const msgArr = msg.split("");
            plotArr = [];
            msgArr.forEach (e => {
                const plotObj = this.#calculatePlot (e);
                plotObj && plotArr.push(plotObj);
            })
        }
        this.#plotMessage (plotArr);
    }

    #plotMessage (plotArr) {
        if (plotArr && Array.isArray(plotArr) && plotArr.length) {
            plotArr.forEach(e => {
                const query  = `.row_${e.row} > .col_${e.col}`;
                const nodeEl = document.querySelector(query);
                if (nodeEl) {
                    this.#animatePlot(nodeEl, e.value);
                }
            })
        }
    }

    sleep(ms) {
        const start = new Date().getTime(), expire = start + ms;
        while (new Date().getTime() < expire) { }
        return;
    }

    #animatePlot (nodeEl, value) {
        nodeEl.appendChild(this.ANIMATION_CONTAINER);
    };
    #calculatePlot (char) {
        let dataObj = null;
        if (char) {
            this.#current_row = this.#current_column == this.MAX_COLUMNS ? ++this.#current_row : this.#current_row;
            this.#current_column = this.#current_column == this.MAX_COLUMNS ? 0 : this.#current_column;
            if (this.#current_row < this.MAX_ROWS) {
                dataObj = {};
                dataObj.value = char;
                dataObj.row = this.#current_row;
                dataObj.col = this.#current_column;
            }
            this.#current_column += 1;
        }
        return dataObj;
    }

}

const initThis = new Vestaboard();