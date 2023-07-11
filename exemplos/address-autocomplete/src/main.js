// https://servicodados.ibge.gov.br/api/v1/localidades/estados
const template = document.createElement("template")
template.innerHTML = `
    <style>
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
    </style>
    <input id="autocomplete" type="number" pattern="\d{5}-\d{3}" placeholder="09990-000"/><br/><br/>
    <output id="address"></output><br/>
    <output id="district"></output><br/>
    <output id="location"></output>`

class CEPAutocomplete extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: "closed"});
        this.root.append(template.content.cloneNode(true));
        this.root.querySelector("#autocomplete").addEventListener("change", this.obtainData() )
    }

    obtainData(){
        let address = this.root.querySelector("#address")
        let district = this.root.querySelector("#district")
        let location = this.root.querySelector("#location")

        return async (evt) =>{

            const url = `https://viacep.com.br/ws/${evt.target.value}/json/`;
            let response = await fetch(url);
            let json = await response.json();

            address.innerHTML = `<b>Logradouro: </b>${json["logradouro"]}`;
            district.innerHTML = `<b>Bairro: </b>${json["bairro"]}`;
            location.innerHTML = `<b>Localidade: </b>${json["localidade"]}`;
        };

        /*



        fetch(url).then((resp)=>{
            console.log("ok")
           resp.json().then((json)=>{
                    console.log("ok")

               }
           )
        });
        */
    }
}

customElements.define('cep-autocomplete', CEPAutocomplete);
