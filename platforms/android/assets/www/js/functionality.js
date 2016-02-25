var initialize = function () {
    document.addEventListener('deviceready', initialization, false);
};

var initialization = function () {
    // source
    var laptopSource = {
        datatype: "json",
        datafields: [
                    { name: 'imgName', type: 'string' },
                    { name: 'ram', type: 'string' },
                    { name: 'cpu', type: 'string' },
                    { name: 'price', type: 'int' },
                    { name: 'display', type: 'float' },
                    { name: 'model', type: 'string' },
                    { name: 'video', type: 'string' },
                    { name: 'hdd', type: 'string' },
                    { name: 'promo', type: 'bool' },
                    { name: 'LAN', map: 'connectivity>LAN', type: 'string' },
                    { name: 'wifi', map: 'connectivity>wifi', type: 'string' },
                    { name: 'bluetooth', map: 'connectivity>bluetooth', type: 'string' },
                    { name: 'USB3', map: 'interfaces>USB3', type: 'string' },
                    { name: 'USB2', map: 'interfaces>USB2', type: 'string' },
                    { name: 'webcam', map: 'interfaces>webcam', type: 'bool' },
                    { name: 'mic', map: 'interfaces>mic', type: 'bool' },
                    { name: 'audio', map: 'interfaces>audio', type: 'bool' },
                    { name: 'hdmi', map: 'interfaces>hdmi', type: 'bool' },
                    { name: 'vga', map: 'interfaces>vga', type: 'bool' },
                    { name: 'thunderbolt', map: 'interfaces>thunderbolt', type: 'bool' },
                    { name: 'miniDisplay', map: 'interfaces>miniDisplay', type: 'bool' },
                    { name: 'cardReader', map: 'interfaces>cardReader', type: 'bool' },
                    { name: 'battery', type: 'string' },
                    { name: 'weight', type: 'float' },
                    { name: 'OS', type: 'string' }
                ],
        id: 'model',
        url: 'sources/laptops.txt',
        async: false
    };

    var dataAdapter = new $.jqx.dataAdapter(laptopSource, { autoBind: true });
    var records = dataAdapter.records;
    var laptopArray = new Array();
    var tempLaptopArray = new Array();
    for (var i = 0; i < records.length; i++) {
        laptopArray.push(records[i]);
    };

    var view = "table";

    var loginName = "";
    var itemsInCart = 0;
    var selectedLaptop = 0;

    var deviceWidth = $(window).width();
    var oldWidth;
    var dataTableWidth;

    var loginDialog = $("#loginDialog");

    // login functionality
    var loginFunctionality = function () {
        var login = $("#login");

        var checkLogin = function () {
            if (loginName == "") {
                return true;
            } else {
                return false;
            };
        };

        login.on("mouseenter", function () {
            if (checkLogin()) {
                login.css("cursor", "pointer");
            } else {
                login.css("cursor", "default");
            };
        });

        login.on("mousedown", function () {
            if (checkLogin()) {
                login.css("background-color", "#004691");
            };
        });

        $(document).on("mouseup", function () {
            login.css("background-color", "#002570");
        });

        login.on("click", function () {
            if (checkLogin()) {
                loginDialog.jqxWindow({ position: "center" });
                loginDialog.jqxWindow("open");
            };
        });
    };

    // details view title height adjustement
    var titleHeightAdjust = function () {
        var titleHeight10 = $("#laptopTitle10").height();
        var titleHeight11 = $("#laptopTitle11").height();
        var modifier = deviceWidth < 452 ? 0 : 15;
        var titleHeight = Math.max(titleHeight10, titleHeight11) - modifier;

        for (var i = 0; i < laptopArray.length; i++) {
            $("#laptopTitle" + i).height(titleHeight);
        };
    };

    // loads laptop details
    var loadLaptop = function (index) {
        var currentLaptop = laptopArray[index];
        $("#RAM")[0].innerHTML = currentLaptop.ram;
        $("#CPU")[0].innerHTML = currentLaptop.cpu;
        $("#video")[0].innerHTML = currentLaptop.video;
        $("#HDD")[0].innerHTML = currentLaptop.hdd;
        $("#display")[0].innerHTML = currentLaptop.display + "''";
        $("#connectivity")[0].innerHTML = (currentLaptop.LAN ? "LAN: " + currentLaptop.LAN + ", " : "") + "Wi-Fi: " + currentLaptop.wifi + (currentLaptop.bluetooth ? ", Bluetooth " + currentLaptop.bluetooth : "");
        var interfacesHTML = "<ul>" + (currentLaptop.USB3 ? "<li>" + currentLaptop.USB3 + "x USB 3.0</li>" : "") + (currentLaptop.USB2 ? "<li>" + currentLaptop.USB2 + "x USB 2.0</li>" : "") + (currentLaptop.webcam ? "<li>Webcam</li>" : "") + (currentLaptop.mic ? "<li>Microphone</li>" : "") + (currentLaptop.audio ? "<li>3.5mm audio jacks</li>" : "") + (currentLaptop.hdmi ? "<li>HDMI</li>" : "") + (currentLaptop.vga ? "<li>VGA</li>" : "") + (currentLaptop.thunderbolt ? "<li>Thunderbolt</li>" : "") + (currentLaptop.miniDisplay ? "<li>Mini DisplayPort</li>" : "") + (currentLaptop.cardReader ? "<li>Card reader</li>" : "") + "</ul>";
        $("#interfaces")[0].innerHTML = interfacesHTML;
        $("#battery")[0].innerHTML = currentLaptop.battery;
        $("#weight")[0].innerHTML = currentLaptop.weight + " kg";
        $("#OS")[0].innerHTML = currentLaptop.OS;
    };

    var tableFlag = false;
    var detailsFlag = false;

    var renderCommon = function () {
        var headerTable = $("#headerTable");
        var login = loginName == "" ? "Login" : "Welcome, " + loginName;
        if (deviceWidth >= 896) {
            dataTableWidth = 896;
            headerTable.html('<tr><td id="logoTd" colspan="2"><img id="headerImage" src="img/Notebook.png" /></td><td id="headerTd1"></td><td id="headerTd2"></td><td id="headerTd3"><table><tr><td id="login">' + login + '</td><td id="itemsInCart"><img src="img/cart.png" /><span>(' + itemsInCart + ')</span></td></tr></table></td></tr>');
        } else if (deviceWidth >= 674) {
            dataTableWidth = 674;
            headerTable.html('<tr><td id="logoTd" colspan="2"><img id="headerImage" src="img/Notebook.png" /></td><td id="headerTd2"></td><td id="headerTd3"><table><tr><td id="login">' + login + '</td><td id="itemsInCart"><img src="img/cart.png" /><span>(' + itemsInCart + ')</span></td></tr></table></td></tr>');
        } else if (deviceWidth >= 452) {
            dataTableWidth = 452;
            headerTable.html('<tr><td id="logoTd" colspan="2"><img id="headerImage" src="img/Notebook.png" /></td><td id="headerTd3"><table><tr><td id="login">' + login + '</td><td id="itemsInCart"><img src="img/cart.png" /><span>(' + itemsInCart + ')</span></td></tr></table></td></tr>');
        } else {
            dataTableWidth = 230;
            headerTable.html('<tr><td id="logoTd" colspan="2"><img id="headerImage" style="width: 100%;" src="img/Notebook.png" /></td></tr><tr><td><table><tr><td id="login" style="white-space: normal;">' + login + '</td><td id="itemsInCart" style="white-space: normal;"><img src="img/cart.png" /><span>(' + itemsInCart + ')</span></td></tr></table></td></tr>');
        };

        $("#headerTable, #footer").width(dataTableWidth);

        loginFunctionality();
    };

    var renderTableView = function () {
        var laptopsPerRow;
        if (deviceWidth >= 896) {
            laptopsPerRow = 4;
        } else if (deviceWidth >= 674) {
            laptopsPerRow = 3;
        } else if (deviceWidth >= 452) {
            laptopsPerRow = 4;
        } else {
            laptopsPerRow = 1;
        };

        var data = new Array();
        var tempLaptopArray = new Array();
        for (var i = 0; i < records.length; i++) {
            tempLaptopArray.push(records[i]);
        };
        var laptopRows = 12 / laptopsPerRow;

        for (var i = 0; i < laptopRows; i++) {
            var currentRowLaptops = new Array();
            for (var j = 0; j < laptopsPerRow; j++) {
                currentRowLaptops.push(tempLaptopArray[0]);
                tempLaptopArray.splice(0, 1);
            };
            data.push({ laptops: currentRowLaptops });
        };

        var source =
                {
                    localData: data,
                    dataType: "array"
                };

        var dataAdapter = new $.jqx.dataAdapter(source);

        var titleInitialization = false;

        $("#dataTable").jqxDataTable(
                {
                    width: dataTableWidth,
                    source: dataAdapter,
                    pageable: false,
                    enableHover: false,
                    selectionMode: 'none',
                    rendered: function () {
                        var buyButtons = $(".buy");
                        buyButtons.jqxButton({ width: "70%", height: 35 });
                        buyButtons.mouseenter(function () {
                            buyButtons.css("cursor", "pointer");
                        });
                        buyButtons.on("click", function () {
                            itemsInCart++;
                            $("#itemsInCart span").text("(" + itemsInCart + ")");
                        });
                        var laptopImages = $(".laptopImage");
                        laptopImages.mouseenter(function () {
                            laptopImages.css("cursor", "pointer");
                        });
                        laptopImages.on("click", function (event) {
                            laptopDetailedView.fadeIn();
                            $("#dataTable").css("display", "none");
                            view = "details";
                            // renders from table view to details view
                            render();

                            for (var i = 0; i < laptopArray.length; i++) {
                                var currentLaptop = laptopArray[i];
                                if (event.target.attributes.src.nodeValue == "img/laptop pictures/" + currentLaptop.imgName) {
                                    $("#laptopScrollView").jqxScrollView("changePage", i);
                                    break;
                                };
                            };
                            $(document).scrollTop(0);
                        });
                    },
                    columns: [
                            {
                                text: 'Product catalog', align: 'center', dataField: 'model', renderer: function (value) {
                                    return "<div id='catalog'>" + value + "</div>";
                                },
                                cellsRenderer: function (row, column, value, rowData) {
                                    var laptops = rowData.laptops;
                                    var container = "<div>";
                                    for (var i = 0; i < laptops.length; i++) {
                                        var laptop = laptops[i];
                                        var item = "<div style='float: left; height: 250px; margin: 5px; border: 1px solid #8CB6FF; border-radius: 5px; position: relative; width: 210px;'>";
                                        var laptopName = "<span class='laptopName'>" + laptop.model + "</span>";
                                        var image = "<div style='margin: 5px; margin-bottom: 3px; position: relative;'>";
                                        var imgurl = "img/laptop pictures/" + laptop.imgName;
                                        var img = '<img class="laptopImage" width=160 height=120 title="More information" style="display: block; margin:0px auto;" src="' + imgurl + '"/>';
                                        image += img;
                                        if (laptop.promo == true) {
                                            image += "<img class='promo' src='img/star.png' />";
                                        }
                                        image += "</div>";

                                        var info = "<div class='info' style='margin: 3px;'>";
                                        info += "<div style='border: 1px dashed #8CB6FF; border-radius: 2px; background-color: #EDF3FF;'><span class='featureLabel'>Price</span>: $" + laptop.price + "</div>";
                                        info += "<div><span class='featureLabel'>RAM</span>: " + laptop.ram + "</div>";
                                        info += "<div><span class='featureLabel'>CPU</span>: " + laptop.cpu + "</div>";
                                        info += "<div><span class='featureLabel'>Display</span>: " + laptop.display + "''</div>";
                                        info += "</div>";

                                        var buy = "<button class='buy' style='position: relative; bottom: 0; border-radius: 7px; margin: 0 auto;'>Add to cart</button>";

                                        item += laptopName;
                                        item += image;
                                        item += info;
                                        item += buy;
                                        item += "</div>";
                                        container += item;
                                    }
                                    container += "</div>";
                                    return container;
                                }
                            }
                    ]
                });
    };

    var laptopDetailedView = $("#laptopDetailedView");
    var laptopDetails = $("#laptopDetails");
    var laptopDetailsHTML = '<tr><th colspan="2" id="featuresHeader" class="featureLabel">Features</th></tr><tr><td class="featureLabel leftTd">RAM:</td><td class="rightTd" id="RAM"></td></tr><tr class="altRow"><td class="featureLabel leftTd">CPU:</td><td class="rightTd" id="CPU"></td></tr><tr><td class="featureLabel leftTd">Video card:</td><td class="rightTd" id="video"></td></tr><tr class="altRow"><td class="featureLabel leftTd">HDD:</td><td class="rightTd" id="HDD"></td></tr><tr><td class="featureLabel leftTd">Display:</td><td class="rightTd" id="display"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Connectivity:</td><td class="rightTd" id="connectivity"></td></tr><tr><td class="featureLabel leftTd">Interfaces:</td><td class="rightTd" id="interfaces"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Battery:</td><td class="rightTd" id="battery"></td></tr><tr><td class="featureLabel leftTd">Weight:</td><td class="rightTd" id="weight"></td></tr><tr class="altRow" id="lastRow"><td class="featureLabel leftTd OSFeature">OS:</td><td class="rightTd" id="OS"></td></tr>';

    var renderDetailsView = function () {
        var borderSpacing = "6px";
        var imageMargin;
        var titleBottomMargin = "20px";
        var priceTableMargin = "25px";
        var starRight;
        var tr = "";
        var colgroup = '<colgroup><col style="width: 60%;"><col style="width: 40%;"></colgroup>';
        var scrollViewHeight;

        if (deviceWidth >= 896) {
            imageMargin = 0;
            starRight = "35px";
            scrollViewHeight = 420;
            laptopDetails.html(laptopDetailsHTML);
        } else if (deviceWidth >= 674) {
            imageMargin = "10px";
            starRight = "15px";
            scrollViewHeight = 340;
            laptopDetails.html(laptopDetailsHTML);
        } else if (deviceWidth >= 452) {
            imageMargin = "20px";
            starRight = 0;
            scrollViewHeight = 300;
            laptopDetails.html(laptopDetailsHTML);
        } else {
            borderSpacing = "0px";
            imageMargin = "30px";
            titleBottomMargin = 0;
            priceTableMargin = "0px";
            starRight = 0;
            tr = "</tr><tr>";
            colgroup = '<colgroup><col style="width: 100%;"></colgroup>';
            scrollViewHeight = 465;
            laptopDetails.html('<tr><th colspan="2" id="featuresHeader" class="featureLabel">Features</th></tr><tr class="altRow"><td class="featureLabel leftTd">RAM:</td></tr><tr><td class="rightTd" id="RAM"></td></tr><tr class="altRow"><td class="featureLabel leftTd">CPU:</td></tr><tr><td class="rightTd" id="CPU"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Video card:</td></tr><tr><td class="rightTd" id="video"></td></tr><tr class="altRow"><td class="featureLabel leftTd">HDD:</td></tr><tr><td class="rightTd" id="HDD"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Display:</td></tr><tr><td class="rightTd" id="display"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Connectivity:</td></tr><tr><td class="rightTd" id="connectivity"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Interfaces:</td></tr><tr><td class="rightTd" id="interfaces"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Battery:</td></tr><tr><td class="rightTd" id="battery"></td></tr><tr class="altRow"><td class="featureLabel leftTd">Weight:</td></tr><tr><td class="rightTd" id="weight"></td></tr><tr class="altRow"><td class="featureLabel leftTd">OS:</td></tr><tr><td class="rightTd OSFeature" id="OS"></td></tr>');
        };

        laptopDetailedView.width(dataTableWidth);

        // scroll view
        $("#laptopScrollView").remove();
        laptopDetails.before('<div id="laptopScrollView"></div>');

        var laptopScrollViewHTML = "";
        for (var i = 0; i < laptopArray.length; i++) {
            var currentLaptop = laptopArray[i];
            var model = currentLaptop.model;
            var imageSrc = currentLaptop.imgName;
            var price = currentLaptop.price;
            var promo = "";
            if (currentLaptop.promo == true) {
                var promo = "<img style='position: absolute; right: " + starRight + "' class='detailsStar' src='img/star.png' />";
            };
            laptopScrollViewHTML += '<div><table class="laptopDetailsTable" style="width: ' + dataTableWidth + 'px;" border-spacing: ' + borderSpacing + ';">' + colgroup + '<tr><td id="laptopImage' + i + '" valign="top" style="border: none;"><div style="width: 100%; height: 100%; position: relative;"><img src="img/laptop pictures big/' + imageSrc + '" style="width: 100%; margin-top: ' + imageMargin + '" />' + promo + '</div></td>' + tr + '<td valign="top" style="border: none;"><table class="priceTable" style="margin-top: ' + priceTableMargin + ';">   <tr><td class="name featureLabel"><div id="laptopTitle' + i + '" style="margin-bottom: ' + titleBottomMargin + ';">' + model + '</div></td></tr><tr><td class="price">$' + price + '</td></tr><tr><td><button class="buyNow">Buy now</button></td></tr></table></td></tr></table></div>';
        };

        $("#laptopScrollView")[0].innerHTML = laptopScrollViewHTML;

        var buyNow = $(".buyNow");
        buyNow.jqxButton({ theme: "darkblue" });
        buyNow.addClass("buyNow");
        buyNow.mouseenter(function () {
            buyNow.css("cursor", "pointer");
        });
        buyNow.on("click", function () {
            itemsInCart++;
            $("#itemsInCart span").text("(" + itemsInCart + ")");
        });

        $("#laptopScrollView").jqxScrollView({ width: "100%", height: scrollViewHeight, currentPage: selectedLaptop, moveThreshold: 0.2 });
        $("#laptopScrollView").on("pageChanged", function (event) {
            var page = event.args.currentPage;
            loadLaptop(page);
            selectedLaptop = page;
        });

        titleHeightAdjust();

        loadLaptop(selectedLaptop);
    };

    var render = function () {
        if (view == "table" && tableFlag == false) {
            renderCommon();
            renderTableView();
            tableFlag = true;
        } else if (view == "details" && detailsFlag == false) {
            renderCommon();
            renderDetailsView();
            detailsFlag = true;
        };
    };

    render();

    // login window
    loginDialog.jqxWindow({ theme: "darkblue", width: 300, height: 160, resizable: false, headerHeight: 30, autoOpen: false, isModal: true, position: "center" });
    $("#usernameInput").jqxInput({ theme: "darkblue", width: 200, height: 25 });
    $("#passwordInput").jqxPasswordInput({ theme: "darkblue", width: 200, height: 25 });
    $("#submit").jqxButton({ theme: "darkblue", height: 35 });

    $('#form').on('validationSuccess', function (event) {
        loginName = $("#usernameInput").val();
        $("#login").text("Welcome, " + loginName);
        loginDialog.jqxWindow("close");
    });

    $("#submit").click(function () {
        $("#form").jqxValidator("validate");
    });

    // login validation
    $('#form').jqxValidator({
        hintType: 'label',
        animationDuration: 0,
        rules: [
                    { input: '#usernameInput', message: 'Please enter your username.', action: 'none', rule: 'required' },
                    { input: '#passwordInput', message: 'Please enter your password.', action: 'none', rule: 'required' }
                ]
    });

    $('#form').on('validationError', function (event) {
        var tableHeight = $("#loginTable").height();
        loginDialog.jqxWindow({ height: tableHeight + 50 });
    });

    // back arrow
    var backArrow = $("#backArrow");

    backArrow.on("mouseenter", function () {
        backArrow.css("cursor", "pointer");
    });

    backArrow.on("click", function () {
        laptopDetailedView.css("display", "none");
        $("#dataTable").fadeIn();
        view = "table";
        // renders from details view to table view
        render();
    });

    // removes event handlers
    var removeEventHandlers = function () {
        $("#login").off();
        $(document).off("mouseup");
        $(".buy").off();
        $(".laptopImage").off();
        $(".buyNow").off();
        $("#laptopScrollView").off("pageChanged");
    };

    // handles orientation change
    $(window).on("orientationchange orientationchanged", function () {
        setTimeout(function () {
            removeEventHandlers();
            deviceWidth = $(window).width();
            if (deviceWidth != oldWidth) {
                tableFlag = false;
                detailsFlag = false;
                render();
                loginDialog.jqxWindow({ position: "center" });
            };
        }, 200);
    });
};