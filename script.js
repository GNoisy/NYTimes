console.log('I am here');
$(document).ready(function () {

    var articleName;
    var editor;
    var section;
    var datePub;
    var link;
    var articleCount;
    var searchTerm = 'election';
    var key = 'iS6ymDj7QSieYhjaWjDXRqmsjtTIt1LS';
    var year = 2015;
    var queryURL;

    // 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=' + key;
    // fq=pub_year:("2015" "2016")

    //var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm +'&api-key=' + key + '&fq=pub_year:(' + year + ')';
    console.log(queryURL);

    $('form').on('submit', function (event) {
        event.preventDefault();
        getResponse();
        searchTerm = $('#search-term');
        year = $('#start-year');
        queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm +'&api-key=' + key + '&fq=pub_year:(' + year + ')';
    })

    function getResponse() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.response.docs;
            articleCount = $('#article-count') ? $('#article-count') : 10;

            for (let i = 0; i < articleCount.length; i++) {
                articleName = results[i].headline.main;
                editor = results[i].byline.original;
                section = results[i].section_name;
                datePub = results[i].pub_date;
                link = results[i].web_url;

                //create card
                let articleSection = $('<div class="card-body" id="article-section">')
                $('.card').append(cardBody);

                var articleNameEl = $('<p>').text(articleName);
                articleSection.append(articleNameEl);

                var editorEl = $('<p>').text(editor);
                articleSection.append(editorEl);

                var sectionEl = $('<p>').text(section);
                articleSection.append(sectionEl);

                var dateEl = $('<p>').text(datePub);
                articleSection.append(dateEl);

                var urlEl = $('<a>').text(link);
                urlEl.attr('href', link);
                articleSection.append(urlEl);
            }
        });
    }
});