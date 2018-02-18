$(document).ready(function(){
    $('body').on('click', '.card-image', function(){
        $(this).parent().addClass('focus-card');
    });

    $(document).on('click', '.exit-card', function(){
        console.log($('.card'));
        $("div .card").removeClass('focus-card');

    });

    $.each(trails, function(k,v){
        setTimeout(function(){
            addCard(v);
        }, 10);
    });

});


function addCard(content){
    //content = trails[0];
    if (!content.distance) console.log(content)
    content = $.extend(test_trail[0], content);

    $.each(content.weather.daily, function(k,v){
        content.weather.daily[k].iconName = icons[v.icon.replace(/-/g, '_')];
    });

    var cardTemplate = "<div class='col xl4 m6 s12'>\n" +
        "            <div class='card'>\n" +
        "                <div class='card-image' style='background-image: url(" + content.imgLink + ")'>\n" +
        "                    <div class='stupid-card display-big'>\n" +
        "                        <span class='fa-layers fa-fw exit-card fa-2x'>\n" +
        "                            <i class='fas fa-circle' style='color:lightgray'></i>\n" +
        "                            <i class='fa-inverse fas fa-times' data-fa-transform='shrink-6'></i>\n" +
        "                        </span>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "\n" +
        "                <div class='card-content'>\n" +
        "                    <span class='card-title black-text bold'>" + content.name + "</span>\n" +
        "                    <p class='display-big'>" + content.schedule + "</p>\n" +
        "                    <div class='display-small secondary-info'>\n" +
        "                        <ul class='horizontal-bullet-list trail-properties'>\n" +
        "                            <li>" + content.difficulty + "</li>\n" +
        "                            <li>" + content.region + "</li>\n" +
        "                            <li>" + content.time + "</li>\n" +
        "                        </ul>\n" +
        "                        <ul class='horizontal-spaced-list trail-conditions'>\n" +
        "                            <li><svg aria-hidden='true' data-prefix='fas' data-icon='repeat' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-repeat fa-w-16 fa-3x'><path fill='currentColor' d='M512 256c0 88.224-71.775 160-160 160H170.067l34.512 32.419c9.875 9.276 10.119 24.883.539 34.464l-10.775 10.775c-9.373 9.372-24.568 9.372-33.941 0l-92.686-92.686c-9.373-9.373-9.373-24.568 0-33.941l92.686-92.686c9.373-9.373 24.568-9.373 33.941 0l10.775 10.775c9.581 9.581 9.337 25.187-.539 34.464L170.067 352H352c52.935 0 96-43.065 96-96 0-13.958-2.996-27.228-8.376-39.204-4.061-9.039-2.284-19.626 4.723-26.633l12.183-12.183c11.499-11.499 30.965-8.526 38.312 5.982C505.814 205.624 512 230.103 512 256zM72.376 295.204C66.996 283.228 64 269.958 64 256c0-52.935 43.065-96 96-96h181.933l-34.512 32.419c-9.875 9.276-10.119 24.883-.539 34.464l10.775 10.775c9.373 9.372 24.568 9.372 33.941 0l92.686-92.686c9.373-9.373 9.373-24.568 0-33.941l-92.686-92.686c-9.373-9.373-24.568-9.373-33.941 0L306.882 29.12c-9.581 9.581-9.337 25.187.539 34.464L341.933 96H160C71.775 96 0 167.776 0 256c0 25.897 6.186 50.376 17.157 72.039 7.347 14.508 26.813 17.481 38.312 5.982l12.183-12.183c7.008-7.008 8.786-17.595 4.724-26.634z' class=''></path></svg>" + content.distance.toString().replace('km',' km') + "</li>\n" +
        "                            <li><i class='fas fa-long-arrow-alt-up' data-fa-transform='rotate-45'></i> " + content.elevation.toString().replace('meters','m').replace('kilometers','km') + "</li>\n" +
        "                            <li><i class='wi wi-wu-clear'></i>" + content.weather.current.temperature + "&deg;F</li>\n" +
        "                        </ul>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class='display-big'>\n" +
        "                        <div class='row'>\n" +
        "                            <p>DESCRIPTION</p>\n" +
        "                            <p class='description'>" + content.description + "</p>\n" +
        "                        </div>\n" +
        "                        <div class='row weather'>\n" +
        "                            <div class='row'><p>WEATHER</p></div>\n" +
        "                            <div class='row center-align'>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[0].summary + " " + content.weather.daily[0].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[1].summary + " " + content.weather.daily[1].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[2].summary + " " + content.weather.daily[2].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[3].summary + " " + content.weather.daily[3].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[4].summary + " " + content.weather.daily[4].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                                <div class='col s2'>\n" +
        "                                    <i class='wi wi-wu-clear'></i>\n" +
        "                                    <p class='condition'>" + content.weather.daily[5].summary + " " + content.weather.daily[5].temperature + "&deg;C</p>\n" +
        "                                    <p class='weather-date'>Feb 24</p>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class='card-action display-big center-align'>\n" +
        "                    <a href='" + content.link + "'>More Information</a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>";
    $("#trail-card-row").append(cardTemplate);
}