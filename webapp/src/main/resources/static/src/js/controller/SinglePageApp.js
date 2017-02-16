/**
 * @author Selcuk Onur Sumer
 */
function SinglePageApp(options)
{
    var _defaultOpts = {
        pageLoaderDelay: -1,
        appContent: "#app_content",
        appTemplateId: "main_page",
        pageContent: "#page_content",
        pageLoader: "#page_loader",
        mainView: "#main_view",
        mainContent: "#main_content",
        pages: {
            home: {
                name: "#home",
                template: "home_page"
            }
        }
    };

    // merge options with default options to use defaults for missing values
    var _options = jQuery.extend(true, {}, _defaultOpts, options);

    function switchContent(pageId, params)
    {
        // hide everything first
        $(_options.pageContent).children().hide();

        if (_options.pageLoaderDelay > 0)
        {
            // show the loader image before starting the transition
            $(_options.pageLoader).show();

            setTimeout(function() {
                loadPage(pageId, params);

                // hide the loader image after transition completed
                $(_options.pageLoader).hide();
            }, _options.pageLoaderDelay);
        }
        else
        {
            loadPage(pageId, params);
        }
    }

    function loadPage(id, params)
    {
        // init section if not initialized yet
        if (!$(_options.pages[id].name).length)
        {
            // var templateDivId = id + "_template";
            // $("#page_templates").append("<div id='" + templateDivId + "'></div>");

            $("#page_template").load("pages/" + id + ".html", function() {
                var templateFn = _.template($("#" + _options.pages[id].template).html());
                $(_options.pageContent).append(templateFn(params));
            });
        }

        $(_options.pages[id].name).show();
    }

    function init()
    {
        // init router
        var routerOpts = {};

        // default router options
        _.each(_options.pages, function(page, id) {
            var target = "/" + id;
            routerOpts[target] = function() {
                switchContent(id, page.params || {});
            };
        });

        var router = new Router(routerOpts);

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
