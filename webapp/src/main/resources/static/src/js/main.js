/**
 * Main flow starts here
 *
 * @author Selcuk Onur Sumer
 */
$(document).ready(function() {
    var app = new SinglePageApp({
        pages: {
            home: {
                name: "#home",
                template: "home_page"
            },
            korkut: {
                name: "#korkut",
                template: "korkut_page"
            },
            research: {
                name: "#research",
                template: "research_page"
            },
            opportunities: {
                name: "#opportunities",
                template: "opportunities_page"
            },
            publications: {
                name: "#publications",
                template: "publications_page"
            },
            contact: {
                name: "#contact",
                template: "contact_page"
            }
        }
    });

    app.init();
});
