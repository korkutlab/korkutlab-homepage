/**
 * @author Selcuk Onur Sumer
 */
function App(options)
{
    var _defaultOpts = {
        pageLoaderDelay: -1,
        appContent: "#app_content",
        appTemplateId: "main_page",
        pageContent: "#page_content",
        pageLoader: "#page_loader",
        // TODO move these into pages!
        mainView: "#main_view",
        mainContent: "#main_content",
        homePage: "#home",
        homeTemplateId: "home_page",
        contactPage: "#contact",
        contactTemplateId: "contact_page",
        korkutPage: "#korkut",
        korkutTemplateId: "korkut_page",
        researchPage: "#research",
        researchTemplateId: "research_page",
        opportunitiesPage: "#opportunities",
        opportunitiesTemplateId: "opportunities_page",
        publicationsPage: "#publications",
        publicationsTemplateId: "publications_page",
        pages: {
            home: {
                name: "",
                template: ""
            },
            korkut: {
                name: "",
                template: ""
            },
            research: {
                name: "",
                template: ""
            },
            opportunities: {
                name: "",
                template: ""
            },
            publications: {
                name: "",
                template: ""
            },
            contact: {
                name: "",
                template: ""
            }
        }
    };

    // merge options with default options to use defaults for missing values
    var _options = jQuery.extend(true, {}, _defaultOpts, options);

    function switchContent(routeFn, params)
    {
        // hide everything first
        $(_options.pageContent).children().hide();

        if (_options.pageLoaderDelay > 0)
        {
            // show the loader image before starting the transition
            $(_options.pageLoader).show();

            setTimeout(function() {
                routeFn(params);

                // hide the loader image after transition completed
                $(_options.pageLoader).hide();
            }, _options.pageLoaderDelay);
        }
        else
        {
            routeFn(params);
        }
    }

    function loadPage(id, params)
    {
        // init section if not initialized yet
        if (!$(_options.pages[id].name).length)
        {
            var templateFn = _.template($("#" + _options.pages[id].template).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.pages[id].name).show();
    }

    function home(params)
    {
        // init section if not initialized yet
        if (!$(_options.homePage).length)
        {
            var templateFn = _.template($("#" + _options.homeTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.homePage).show();
    }

    function korkut(params)
    {
        // init section if not initialized yet
        if (!$(_options.korkutPage).length)
        {
            var templateFn = _.template($("#" + _options.korkutTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.homePage).show();
    }

    function research(params)
    {
        // init section if not initialized yet
        if (!$(_options.homePage).length)
        {
            var templateFn = _.template($("#" + _options.researchTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.homePage).show();
    }

    function opportunities(params)
    {
        // init section if not initialized yet
        if (!$(_options.opportunitiesPage).length)
        {
            var templateFn = _.template($("#" + _options.opportunitiesTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.homePage).show();
    }

    function publications(params)
    {
        // init section if not initialized yet
        if (!$(_options.publicationsPage).length)
        {
            var templateFn = _.template($("#" + _options.publicationsTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.homePage).show();
    }

    function contact(params)
    {
        // init section if not initialized yet
        if (!$(_options.contactPage).length)
        {
            var templateFn = _.template($("#" + _options.contactTemplateId).html());
            $(_options.pageContent).append(templateFn(params));
        }

        $(_options.contactPage).show();
    }


    function init()
    {
        // init router
        var router = new Router({
            '/home': function() {
                switchContent(home, {});
            },
            '/korkut': function() {
                switchContent(korkut, {});
            },
            '/research': function() {
                switchContent(research, {});
            },
            '/opportunities': function() {
                switchContent(opportunities, {});
            },
            '/publications': function() {
                switchContent(publications, {});
            },
            '/contact': function() {
                switchContent(contact, {});
            }

        });

        router.configure({notfound: function() {
            // TODO switch to the not found page! (a static error page)
            //switchContent(unknown);
            $(_options.pageContent).children().hide();
        }});


        // init static content
        var templateFn = _.template($("#" + _options.appTemplateId).html());
        $(_options.appContent).append(templateFn());

        // load home page content initially
        router.init("/home");
    }

    this.init = init;
}
