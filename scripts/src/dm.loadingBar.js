dm.globalComponentFactory("loadingBar", function($) {
	
	var isRequestActive = false;

    var init = function () {
        addLoadingBar();
        bindEvents();  
    };
    
    var addLoadingBar = function () {
        if ($('#loading-bar').length === 0) {
            $('body').append('<div id="loading-bar" class="" style=""><div class="bar" style="width:0%; display: none;"><div class="peg"></div></div></div><div id="loading-bar-spinner" class="" style="display: none;"><div class="spinner-icon"></div></div>');
        }        
    };

    var show = function () {
        $('#loading-bar .bar').show();
        $('#loading-bar-spinner').show();
    };

    var hide = function () {
        setTimeout(function () {
            $('#loading-bar .bar').hide().css('width', '0px');
            $('#loading-bar-spinner').hide();
        }, 350);
    };

    var setPercent = function (val) {
        $('#loading-bar .bar').css('width', val + '%');
        this.currentPercent = val;
    };

    var getPercent = function () {
        return this.currentPercent;
    };

    var bindEvents = function () {
        $(document).on('dm-ajax-start', function (e, showLoadingBar) {
            if (showLoadingBar) {
                isRequestActive = true;
                setTimeout(function () {
                    if (isRequestActive) {
                        show();
                        setPercent(1);
                    }
                }, 350);
    
                var loadingInterval = setInterval(function () {
                    if (isRequestActive) {
                        var newPercent = getPercent() + (Math.floor(Math.random() * 20) + 1);
                        setPercent((newPercent > 95) ? 95 : newPercent);                    
                    } else {
                        clearInterval(loadingInterval);
                    }
                }, 350);    
            }            
        });

        $(document).on('dm-ajax-stop', function (e, response, status, xhr) {
            console.log(arguments);
            isRequestActive = false;
            setPercent(100);
            hide();
        });
    };
    
    $(function () {
        init();
    })

    return {
        show: show,
        hide: hide,
        setPercent: setPercent,
        getPercent: getPercent,
        bindEvents: bindEvents
    };
	
}, null, [jQuery]);