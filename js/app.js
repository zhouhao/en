var myApp = new Framework7({
    modalTitle: 'Logan Admin Portal',
    animateNavBackIcon: true
});

// Expose Internal DOM library
var $$ = Framework7.$;

// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function() {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
    myApp.hideIndicator();
});
//document.location = 'http://google.com';
// Events for specific pages when it initialized
$$(document).on('pageInit', function(e) {
    var page = e.detail.page;
    // Handle Modals Page event when it is init
    remoteURL = '';
    type = 'occupancy';
    isPrediction = 0;

    if (page.name === 'list') {
        remoteURL = 'http://smarking.net:8080/garage?garage=centralWest&';
        $.getJSON(remoteURL + 'type=' + type).done(function(data) {
            genChartByHighCharts(data, 'chart-content', type, type);
        });
    }
    
});

// Required for demo popover
$$('.popover a').on('click', function() {
    myApp.closeModal('.popover');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function() {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function() {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function() {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

// Generate Content Dynamically
var dynamicPageIndex = 0;

function createContentPage() {
    mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '	<div class="left"><a href="#" class="back link">Back</a></div>' +
        '	<div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '	<!-- Scrollable page content-->' +
        '	<div class="page-content">' +
        '	  <div class="content-block">' +
        '		<div class="content-block-inner">' +
        '		  <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '		  <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '		</div>' +
        '	  </div>' +
        '	</div>' +
        '  </div>' +
        '</div>'
    );
    return;
}

$$(document).on('click', '.ks-generate-page', createContentPage);