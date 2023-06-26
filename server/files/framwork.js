import { ElementBuilder, ParentChildBuilder } from "./builders.js";

export function headerBuilder(element) {
    new ElementBuilder("div")
    .append(new ElementBuilder("div").class("logo")
        .append(new ElementBuilder("a").href("index.html")
            .append(new ElementBuilder("img").src("images/Pawship_nobackground.png").alt("Logo"))))
    .append(new ElementBuilder("nav")
        .append(new ElementBuilder("ul")
            .append(new ElementBuilder("li")
                .append(new ElementBuilder("a").href("pet-quiz.html").text("Pet Quiz")))
            .append(new ElementBuilder("li")
                .append(new ElementBuilder("a").href("our-animals.html").text("Our Animals")))
            .append(new ElementBuilder("li")
                .append(new ElementBuilder("a").href("contact.html").text("Contact")))))
    .appendTo(element);
}


export function footerBuilder(element) {
    new ElementBuilder("div")
    .append(new ElementBuilder("a").href("login.html").class("footer-button").text("Your Profile"))
    .append(new ElementBuilder("a").href("pet-quiz.html").class("footer-button").text("Pet Quiz"))
    .append(new ElementBuilder("a").href("our-animals.html").class("footer-button").text("Our Animals"))
    .append(new ElementBuilder("a").href("contact.html").class("footer-button").text("Contact"))
    .append(new ElementBuilder("a").href("impressum.html").class("footer-button").text("Impressum"))
    .appendTo(element);
}