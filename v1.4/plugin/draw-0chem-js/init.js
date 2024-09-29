import chemDraw from "./main.vue";

const components = [{name: "draw-0chem", view: chemDraw}, {name: "ChemDraw", view: chemDraw}];
export default {
    install: (app, options) => {
        console.log("Welcome to 0chem.com\nname: draw-0chem or ChemDraw")
        components.forEach((item) => {
            app.component(item.name, item.view);
        });
    }
}