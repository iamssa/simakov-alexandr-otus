customElements.define('my-leaf',
    class extends HTMLElement {
        constructor() {
            super()
        }
        connectedCallback() {
            this.innerHTML = `${this.produceStars(this.dataset.level)}${this.dataset.id}<br>`

            if (this.dataset.leafdata) {
                const leafdata = JSON.parse(this.dataset.leafdata);
                leafdata.forEach(treeItem => {
                    this.innerHTML += treeItem.items ?
                        `<my-leaf data-id=${treeItem.id} data-leafdata=${JSON.stringify(treeItem.items)} data-level=${(parseInt(this.dataset.level) + 1)} />` :
                        `<my-leaf data-id=${treeItem.id} data-level=${(parseInt(this.dataset.level) + 1)} />`
                })
            }
        }

        produceStars(count) {
            let result = "";
            for (let idx = 0; idx < count; idx++) {
                result += "*"
            }
            return result;
        }
    }
);

customElements.define('my-tree',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            })
        }

        connectedCallback() {
            this.renderTree(JSON.parse(this.dataset.tree));
        }

        renderTree(treeData) {
            console.log(treeData)
            if (treeData.id) {
                this.shadowRoot.innerHTML = `<p><my-leaf data-id=${treeData.id} data-leafdata=${JSON.stringify(treeData.items)} data-level="0" /></p>`
            }
        }
    }
);