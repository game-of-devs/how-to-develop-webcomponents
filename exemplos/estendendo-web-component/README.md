#Exemplo 1: Estendendo um elemento HTML

URL do exemplo: https://game-of-devs.github.io/how-to-develop-webcomponents/exemplos/estendendo-web-component/

```javascript
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
        this._request(this._populate)
    }

    _populate(json) {
        for (const i in json) {
            this.tbody.innerHTML += `<tr><td>${json[i]["id"]}</td><td>${json[i]["title"]}</td></tr>`
        }
    }

    async _request(callback) {
        const url = this.getAttribute("data-url");
        let resp = await fetch(url)
        return resp.json().then(callback);
    }

}


customElements.define('my-post-table', MyPostTable, {extends: 'table'})
```

```html
<table is="my-post-table" data-url="https://jsonplaceholder.typicode.com/posts"></table>
```
