class MyPostTable extends HTMLTableElement{
    constructor() {
        super();
        this.init();
        this.render();
    }

    init() {
        this.thead = document.createElement('thead');
        this.append(this.thead);

        this.tbody = document.createElement('tbody');
        this.append(this.tbody);
    }

    render(){
        this.thead.innerHTML = `<tr><th>ID</th><th>Title</th></tr>`
        this.request().then(
            (json)=>{
                for (const i in json) {
                    this.tbody.innerHTML +=  `<tr><td>${json[i]["id"]}</td><td>${json[i]["title"]}</td></tr>`
                }

            }
        )
    }

    async request(){
        const url = this.getAttribute("data-url");
        let resp = await fetch(url)
        return resp.json();
    }

}

customElements.define('my-post-table', MyPostTable, {extends:'table'})
