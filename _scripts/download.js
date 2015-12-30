//Wait for the page to load first
$(document).ready(function(){
    //Get the api and config files
    $.get("api.json", function (data) {
        $.get("config.json", function (configData) {
            //Set the recommended version based on the config file
            var recommendedVersion = configData.version_title.split('v')[1];

            //Get the amount of releases in the api file, subtract one for 0-based
            var apiLength = data.api.length -1;

            //Loop through all releases
            for (var i = apiLength; i >= 0; i--) {

                //current release version
                var version = data.api[i].version;
                var branding = "Node-Webkit";
                var majorSemVer = version.split('.')[0]; //the 0 from 0.12.3
                var minorSemVer = version.split('.')[1]; //the 12 from 0.12.3
                var patchSemVer = version.split('.')[2]; //the 3 from 0.12.3

                //At version 0.12.0 the product was renamed to NW.js
                if (majorSemVer > 0 || minorSemVer > 11) {
                    branding = "NW.js";
                }

                //Placeholder for when we inevitably change to a less terrible name
                //if (majorSemVer > 9000) {}

                //Check in a 32-Bit Linux version is available for this release
                if (data.api[i].lin32) {
                    var nw="", symbol="", chromedriver="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].lin32.nw) {
                        nw = '<a href="' + data.api[i].lin32.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].lin32.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].lin32.symbol) {
                        symbol = '<a href="' + data.api[i].lin32.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].lin32.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].lin32.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].lin32.sdk) {
                        sdk = '<a href="' + data.api[i].lin32.sdk + '">SDK</a>';
                    }
                    if (data.api[i].lin32.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].lin32.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].lin32.nacl) {
                        nacl = '<a href="' + data.api[i].lin32.nacl + '">NACL</a>';
                    }
                    if (data.api[i].lin32.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].lin32.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-lin32").append(row);
                }

                //Check in a 64-Bit Linux version is available for this release
                if (data.api[i].lin64) {
                    var nw="", symbol="", chromedriver="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].lin64.nw) {
                        nw = '<a href="' + data.api[i].lin64.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].lin64.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].lin64.symbol) {
                        symbol = '<a href="' + data.api[i].lin64.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].lin64.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].lin64.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].lin64.sdk) {
                        sdk = '<a href="' + data.api[i].lin64.sdk + '">SDK</a>';
                    }
                    if (data.api[i].lin64.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].lin64.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].lin64.nacl) {
                        nacl = '<a href="' + data.api[i].lin64.nacl + '">NACL</a>';
                    }
                    if (data.api[i].lin64.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].lin64.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-lin64").append(row);
                }

                //Check in a 32-Bit Windows version is available for this release
                if (data.api[i].win32) {
                    var nw="", symbol="", chromedriver="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].win32.nw) {
                        nw = '<a href="' + data.api[i].win32.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].win32.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].win32.symbol) {
                        symbol = '<a href="' + data.api[i].win32.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].win32.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].win32.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].win32.sdk) {
                        sdk = '<a href="' + data.api[i].win32.sdk + '">SDK</a>';
                    }
                    if (data.api[i].win32.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].win32.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].win32.nacl) {
                        nacl = '<a href="' + data.api[i].win32.nacl + '">NACL</a>';
                    }
                    if (data.api[i].win32.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].win32.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-win32").append(row);
                }

                //Check in a 64-Bit Windows version is available for this release
                if (data.api[i].win64) {
                    var nw="", symbol="", chromedriver="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].win64.nw) {
                        nw = '<a href="' + data.api[i].win64.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].win64.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].win64.symbol) {
                        symbol = '<a href="' + data.api[i].win64.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].win64.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].win64.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].win64.sdk) {
                        sdk = '<a href="' + data.api[i].win64.sdk + '">SDK</a>';
                    }
                    if (data.api[i].win64.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].win64.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].win64.nacl) {
                        nacl = '<a href="' + data.api[i].win64.nacl + '">NACL</a>';
                    }
                    if (data.api[i].win64.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].win64.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-win64").append(row);
                }

                //Check in a 32-Bit OSX version is available for this release
                if (data.api[i].osx32) {
                    var nw="", symbol="", chromedriver="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].osx32.nw) {
                        nw = '<a href="' + data.api[i].osx32.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].osx32.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].osx32.symbol) {
                        symbol = '<a href="' + data.api[i].osx32.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].osx32.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].osx32.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].osx32.sdk) {
                        sdk = '<a href="' + data.api[i].osx32.sdk + '">SDK</a>';
                    }
                    if (data.api[i].osx32.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].osx32.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].osx32.nacl) {
                        nacl = '<a href="' + data.api[i].osx32.nacl + '">NACL</a>';
                    }
                    if (data.api[i].osx32.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].osx32.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-osx32").append(row);
                }

                //Check in a 64-Bit OSX version is available for this release
                if (data.api[i].osx64) {
                    var nw="", symbol="", chromedriver="", mas="", symbolmas="", sdk="", symbolsdk="", nacl="", symbolnacl="";
                    if (data.api[i].osx64.nw) {
                        nw = '<a href="' + data.api[i].osx64.nw + '">' + branding + '</a>';
                        if (version == recommendedVersion) {
                            nw = '<a href="' + data.api[i].osx64.nw + '">' + branding + '</a><em class="recommended"></em>';
                        }
                    }
                    if (data.api[i].osx64.symbol) {
                        symbol = '<a href="' + data.api[i].osx64.symbol + '">Symbol</a>';
                    }
                    if (data.api[i].osx64.chromedriver) {
                        chromedriver = '<a href="' + data.api[i].osx64.chromedriver + '">Chrome Driver</a>';
                    }
                    if (data.api[i].osx64.mas) {
                        mas = '<a href="' + data.api[i].osx64.mas + '">Mac App Store</a>';
                    }
                    if (data.api[i].osx64.symbolmas) {
                        symbolmas = '<a href="' + data.api[i].osx64.symbolmas + '" title="Mac App Store Symbol">MAS Symbol</a>';
                    }
                    if (data.api[i].osx64.sdk) {
                        sdk = '<a href="' + data.api[i].osx64.sdk + '">SDK</a>';
                    }
                    if (data.api[i].osx64.symbolsdk) {
                        symbolsdk = '<a href="' + data.api[i].osx64.symbolsdk + '">SDK Symbol</a>';
                    }
                    if (data.api[i].osx64.nacl) {
                        nacl = '<a href="' + data.api[i].osx64.nacl + '">NACL</a>';
                    }
                    if (data.api[i].osx64.symbolnacl) {
                        symbolnacl = '<a href="' + data.api[i].osx64.symbolnacl + '">NACL Symbol</a>';
                    }
                    var row =
                        '<tr>' +
                          '<td class="version"     >V' + version      + '</td>' +
                          '<td class="nw"           >' + nw           + '</td>' +
                          '<td class="symbol"       >' + symbol       + '</td>' +
                          '<td class="chromedriver" >' + chromedriver + '</td>' +
                          '<td class="mas"          >' + mas          + '</td>' +
                          '<td class="symbolmas"    >' + symbolmas    + '</td>' +
                          '<td class="sdk"          >' + sdk          + '</td>' +
                          '<td class="symbolsdk"    >' + symbolsdk    + '</td>' +
                          '<td class="nacl"         >' + nacl         + '</td>' +
                          '<td class="symbolnacl"   >' + symbolnacl   + '</td>' +
                        '</tr>';
                    $("#dl-osx64").append(row);
                }
            }
        });
    });

    function updateTableVisibility() {
        //Hide all download tables
        $("#dl-win32, #dl-win64, #dl-osx32, #dl-osx64, #dl-lin32, #dl-lin64").hide();

        //Get the values of what the user has selected
        var os = $(".os-group input:checked").val();
        var arch = $(".arch-group input:checked").val();

        if (os == "win" && arch == "x86") {
            $("#dl-win32").show();
        } else if (os == "win" && arch == "x64") {
            $("#dl-win64").show();
        } else if (os == "osx" && arch == "x86") {
            $("#dl-osx32").show();
        } else if (os == "osx" && arch == "x64") {
            $("#dl-osx64").show();
        } else if (os == "lin" && arch == "x86") {
            $("#dl-lin32").show();
        } else if (os == "lin" && arch == "x64") {
            $("#dl-lin64").show();
        } else {
            //Show all tables if we can't get reliable data about their system
            $("#dl-win32, #dl-win64, #dl-osx32, #dl-osx64, #dl-lin32, #dl-lin64").show();
        }
        updateOptionalsVisibility();
    }

    function updateOptionalsVisibility() {
        $(".symbol, .chromedriver, .mas, .symbolmas, .sdk, .symbolsdk, .nacl, .symbolnacl").show();
        if (!$("#symbol").prop("checked")) {
            $(".symbol").hide();
        }
        if (!$("#chromedriver").prop("checked")) {
            $(".chromedriver").hide();
        }
        if (!$("#mas").prop("checked")) {
            $(".mas").hide();
        }
        if (!$("#symbolmas").prop("checked")) {
            $(".symbolmas").hide();
        }
        if (!$("#sdk").prop("checked")) {
            $(".sdk").hide();
        }
        if (!$("#symbolsdk").prop("checked")) {
            $(".symbolsdk").hide();
        }
        if (!$("#nacl").prop("checked")) {
            $(".nacl").hide();
        }
        if (!$("#symbolnacl").prop("checked")) {
            $(".symbolnacl").hide();
        }
    }

    //Anytime the controls at the top are clicked, update what tables are shown
    $(".radio-group input").change(updateTableVisibility);
    $(".checkbox-group input").change(updateOptionalsVisibility);

    //On load click the correct button for the user based on their OS
    //This information comes from crossbrowser.js
    if ($("html").hasClass("linux")) {
        $('label[for="lin"]').click();
    } else if ($("html").hasClass("mac")) {
        $('label[for="osx"]').click();
    } else {
        $('label[for="win"]').click();
    }

    //On load click the correct button for the user based on their machine
    //This information comes from 64or32.js
    if ($("html").hasClass("arch64")) {
        $('label[for="x64"]').click();
    } else {
        $('label[for="x86"]').click();
    }
});
