$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual("");
            });
        });

        it('all name are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual("");
            });
        });
    });

    describe('The menu', function(){

        it('is hiding by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('can show or hide when it is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        var originalTimeout;

        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

            loadFeed(0, function() {
                done();
            });
        });

        it('init entries work as expected', function(done){
            var entrys = $('.feed .entry');
            expect(entrys.length).not.toEqual(0);
            done();
        });


        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

    describe('New Feed Selection', function() {
        var originalTimeout;
        var contentInInitContainer;

        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

            loadFeed(0, function() {
                var container = $('.feed');
                contentInInitContainer = container.html();

                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('work as expected', function(done){
            var newContainer = $('.feed');
            expect(newContainer.html()).not.toEqual(contentInInitContainer);
            done();
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
}());
