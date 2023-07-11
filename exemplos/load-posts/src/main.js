class MyPostTable extends HTMLTableElement {
    constructor() {
        super();
        this.init();
        this.render();
    }

    init() {
        this.thead = document.createElement('thead');
        this.thead.innerHTML = `<tr><th>ID</th><th>Title</th></tr>`
        this.append(this.thead);

        this.tbody = document.createElement('tbody');
        this.append(this.tbody);
    }

    render() {
        this._request(this._populate(this.tbody))
    }

    _populate(tbody) {
        return (json)=>{
            for (const i in json) {
                tbody.innerHTML += `<tr><td>${json[i]["id"]}</td><td>${json[i]["title"]}</td></tr>`
            }
        }
    }

    async _request(callback) {
        const url = this.getAttribute("data-url");
        let resp = await fetch(url)
        resp.json().then(callback);
    }

}

customElements.define('load-posts', MyPostTable, {extends: 'table'})
