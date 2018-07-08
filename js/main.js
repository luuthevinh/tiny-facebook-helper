const FACEBOOK_CONTENT = ".fb_content";
const HAS_LISTENER = "has_listener";

const POST = "._5pcr";
const COMMENT_HIDDEN = "comment_hidden";
const COMMENT_LIST = "._3b-9._j6a > div:first";
const HIDE_COMMENT = "hide_cmt";
const COMMENT_BTN = ".comment_link:first";

const SHOW_COMMENT_TEXT = "Show Comment";
const HIDE_COMMENT_TEXT = "Hide Comment";


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var newsfeed = $(FACEBOOK_CONTENT).not("." + HAS_LISTENER);
    if (newsfeed.length > 0) {
        new ResizeSensor(newsfeed, function () {
            newsfeed.addClass(HAS_LISTENER);

            var comments = $(POST).not("." + COMMENT_HIDDEN);
            comments.each(function () {
                let element = this;
                $(element).addClass(COMMENT_HIDDEN);
                $(element).find(COMMENT_LIST).addClass(HIDE_COMMENT);

                let btn = $(element).find(COMMENT_BTN)
                btn.text(SHOW_COMMENT_TEXT);
                btn.click(() => {
                    let cmt = $(element).find(COMMENT_LIST)
                    cmt.toggleClass(HIDE_COMMENT);
                    btn.text(cmt.hasClass(HIDE_COMMENT) ? SHOW_COMMENT_TEXT : HIDE_COMMENT_TEXT);
                });
            });
        });
    }
});


