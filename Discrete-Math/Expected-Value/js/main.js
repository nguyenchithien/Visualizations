main = {
    settings : null,
    canvasWindow : null,

    image : null,

    buttons : [],

    type : "Custom",

    actualValue : -1,
    expectedValue : -1,

    custom : {},

    getDistance: function( x1, y1, x2, y2 ) {
        var dx = x2-x1;
        var dy = y2-y1;
        return Math.sqrt( dx*dx + dy*dy );
    },

    init : function( pSettings, pCanvasWindow ) {
        main.settings = pSettings;
        main.canvasWindow = pCanvasWindow;
        
        main.homeImage = new Image();
        main.homeImage.src = "images/home.png";
        
        main.background = new Image();
        main.background.src = "images/background.png";

        main.buttonImage = new Image();
        main.buttonImage.src = "images/button-1.png";
        
        main.buttonClickedImage = new Image();
        main.buttonClickedImage.src = "images/button-2.png";

        window.addEventListener( "mousedown",   main.click, false );
        window.addEventListener( "mouseup",     main.release, false );
        window.addEventListener( "keydown",     main.keydown, false );
        window.addEventListener( "keyup",       main.keyup, false );

        main.buttons.push( { image : main.buttonImage, text : "Custom", x : 50, y : 200, textX : 40, width : 150, height : 75 } );
        main.buttons.push( { image : main.buttonImage, text : "Die", x : 300, y : 200, textX : 55, width : 150, height : 75 } );
        main.buttons.push( { image : main.buttonImage, text : "Card", x : 550, y : 200, textX : 50, width : 150, height : 75 } );
    },

    update : function() {
    },

    draw : function() {
        var bgColor = "#8afc90";
        var nodeColor = "#34086c";
        var edgeLabelColor = nodeColor;
        
        // Fill background
        main.canvasWindow.fillStyle = bgColor;
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );
        main.canvasWindow.drawImage( main.background, 0, 0 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "#ffc600";
        main.canvasWindow.fillText( "Expected Value in Games of Chance", 10, 15 );
        main.canvasWindow.fillText( "Click two nodes to connect them.", 10, 30 );
        main.canvasWindow.fillText( "'C' clears the path.", 500, 15 );
        main.canvasWindow.fillText( "'R' generates a random path.", 500, 30 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "#ffc600";
        main.canvasWindow.fillText( "Programmed by Rachel Morris", main.settings.width - 220, main.settings.height - 15 );

        for ( var i = 0; i < main.buttons.length; i++ )
        {
            main.canvasWindow.drawImage( main.buttons[i].image, main.buttons[i].x, main.buttons[i].y );
            
            main.canvasWindow.font = "20px Courier";
            main.canvasWindow.fillStyle = "#000000";
            main.canvasWindow.fillText( main.buttons[i].text, main.buttons[i].x + main.buttons[i].textX, main.buttons[i].y+45 );
        }

        if ( main.type == "Custom" )
        {
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillStyle = "#ffffff";
            main.canvasWindow.fillText( "2 Sides: Heads, Tails; (1/2) each", 10, 130 );
            
            main.canvasWindow.fillText( "Expected Value: " + main.expectedValue, 10, 420 );
            
            main.canvasWindow.font = "16px Arial";
            main.canvasWindow.fillText( "0*(1/2) + 1*(1/2)", 10, 450 );
        }
        else if ( main.type == "Die" )
        {
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillStyle = "#ffffff";
            main.canvasWindow.fillText( "6 Sides: 1, 2, 3, 4, 5, 6; (1/6) each", 10, 130 );
            
            main.canvasWindow.fillText( "Expected Value: " + main.expectedValue, 10, 420 );
            
            main.canvasWindow.font = "16px Arial";
            main.canvasWindow.fillText( "1*(1/6) + 2*(1/6) + 3*(1/6) + 4*(1/6) + 5*(1/6) + 6*(1/6)", 10, 450 );
        }

        else if ( main.type == "Card" )
        {
            main.canvasWindow.font = "16px Arial";
            main.canvasWindow.fillStyle = "#ffffff";
            main.canvasWindow.fillText( "4 Suits (Heart, Diamond, Club, Spade) each with values: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K; (1/52) each", 10, 130 );
            
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillText( "Expected Value: " + main.expectedValue, 10, 420 );
            
            main.canvasWindow.font = "16px Arial";
            main.canvasWindow.fillText( "2*(4/52) + 3*(4/52) + 4*(4/52) + ... + 10*(16/52) + 11*(4/52)", 10, 450 );
            main.canvasWindow.fillText( "(Note: A = 11, and 10, J, Q, and K = 10)", 10, 470 );
        }

        if ( main.actualValue != -1 )
        {
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillText( "Actual Value: (" + main.trialCount + " trials): " + main.actualValue, 10, 400 );
        }

    },

    isClicked : function( x, y, w, h, mouseX, mouseY )
    {
        return ( mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h );
    },

    runTrial: function( trialCount ) {
        var outcomes = [];
        
        if ( main.type == "Die" ) {
            outcomes.push( { value: 1, probability: 1.0/6.0 } );
            outcomes.push( { value: 2, probability: 1.0/6.0 } );
            outcomes.push( { value: 3, probability: 1.0/6.0 } );
            outcomes.push( { value: 4, probability: 1.0/6.0 } );
            outcomes.push( { value: 5, probability: 1.0/6.0 } );
            outcomes.push( { value: 6, probability: 1.0/6.0 } );
        }
        else if ( main.type == "Card" ) {
            for ( var i = 0; i < 4; i++ )
            {
                outcomes.push( { value: 11, probability: 1.0/52.0 } );
                outcomes.push( { value: 2, probability: 1.0/52.0 } );
                outcomes.push( { value: 3, probability: 1.0/52.0 } );
                outcomes.push( { value: 4, probability: 1.0/52.0 } );
                outcomes.push( { value: 5, probability: 1.0/52.0 } );
                outcomes.push( { value: 6, probability: 1.0/52.0 } );
                outcomes.push( { value: 7, probability: 1.0/52.0 } );
                outcomes.push( { value: 8, probability: 1.0/52.0 } );
                outcomes.push( { value: 9, probability: 1.0/52.0 } );
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
            }
        }

        var valueSum = 0;
        for ( var i = 0; i < trialCount; i++ )
        {
            var getRandom = Math.floor( Math.random() * outcomes.length );
            var value = outcomes[ getRandom ].value;
            //var probability = outcomes[ getRandom ].probability;

            valueSum = valueSum + value;
        }
        main.actualValue = valueSum / trialCount;
    },

    getExpectedValue: function() {
        var outcomes = [];
        
        if ( main.type == "Die" ) {
            outcomes.push( { value: 1, probability: 1.0/6.0 } );
            outcomes.push( { value: 2, probability: 1.0/6.0 } );
            outcomes.push( { value: 3, probability: 1.0/6.0 } );
            outcomes.push( { value: 4, probability: 1.0/6.0 } );
            outcomes.push( { value: 5, probability: 1.0/6.0 } );
            outcomes.push( { value: 6, probability: 1.0/6.0 } );
        }
        else if ( main.type == "Card" ) {
            for ( var i = 0; i < 4; i++ )
            {
                outcomes.push( { value: 11, probability: 1.0/52.0 } );
                outcomes.push( { value: 2, probability: 1.0/52.0 } );
                outcomes.push( { value: 3, probability: 1.0/52.0 } );
                outcomes.push( { value: 4, probability: 1.0/52.0 } );
                outcomes.push( { value: 5, probability: 1.0/52.0 } );
                outcomes.push( { value: 6, probability: 1.0/52.0 } );
                outcomes.push( { value: 7, probability: 1.0/52.0 } );
                outcomes.push( { value: 8, probability: 1.0/52.0 } );
                outcomes.push( { value: 9, probability: 1.0/52.0 } );
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
                outcomes.push( { value: 10, probability: 1.0/52.0 } ); // 10, J, Q, and K
            }
        }

        var sum = 0;
        for ( var i = 0; i < outcomes.length; i++ )
        {
            sum += outcomes[i].value * outcomes[i].probability;
        }
        main.expectedValue = sum;
    },

    // Events
    click : function( event )
    {
        var windowRect = $( "canvas" )[0].getBoundingClientRect();
        var mouseX = event.clientX - windowRect.left;
        var mouseY = event.clientY - windowRect.top;

        var clicked = "none";

        for ( var i = 0; i < main.buttons.length; i++ )
        {
            if ( main.isClicked( main.buttons[i].x, main.buttons[i].y, main.buttons[i].width, main.buttons[i].height, mouseX, mouseY ) )
            {
                main.buttons[i].image = main.buttonClickedImage;
                main.type = main.buttons[i].text;
                clicked = main.buttons[i].text;
            }
            else
            {
                main.buttons[i].image = main.buttonImage;
            }
        }

        if ( clicked == "Custom" )
        {
            var valueCount = window.prompt( "How many possible outcomes?" );
            //main.custom

            // Remove rows
            $(".custom-row").remove();

            // Create rows for table
            for ( var i = 0; i < valueCount; i++ )
            {
                console.log( i );
                var row = "<tr class='custom-row' style='text-align:center;'><td>" + (i+1) + "</td><td><input type='text' class='value' name='value'></td><td><input type='text' class='probability' name='probability'></td></tr>";
                $("#custom-data").find("tbody").append( row );
            }
            
            // Show modal
            $("#custom-modal").css("display", "block");

            for ( var i = 0; i < main.buttons.length; i++ )
            {
                main.buttons[i].y += 1000;
            }

            return;
        }

        else if  ( clicked == "Die" )
        {
            main.trialCount = window.prompt( "Run the trial how many times?" );
            main.runTrial( main.trialCount );
            main.getExpectedValue();
        }

        else if ( clicked == "Card" )
        {
            main.trialCount = window.prompt( "Run the trial how many times?" );
            main.runTrial( main.trialCount );
            main.getExpectedValue();
        }
    },
    
    release : function( event )
    {
        var windowRect = $( "canvas" )[0].getBoundingClientRect();
        var mouseX = event.clientX - windowRect.left;
        var mouseY = event.clientY - windowRect.top;

        
        for ( var i = 0; i < main.buttons.length; i++ )
        {
            main.buttons[i].image = main.buttonImage;
        }
    },

    keydown : function( event )
    {
        if ( event.key == "c" )
        {
            main.clear();
        }
        else if ( event.key == "r" )
        {
            main.generatePath( 1 );
        }
    },

    keyup : function( event )
    {
    },

    customOK : function() {
        console.log( "Bleep" );
        $("#custom-modal").css("display", "none");
        
        for ( var i = 0; i < main.buttons.length; i++ )
        {
            main.buttons[i].y -= 1000;
        }
        
        var outcomes = $(".custom-row");
        console.log( outcomes );

        main.custom.outcomes = [];
            
        for ( var i = 0; i < outcomes.length; i++ )
        {
            console.log( $(".custom-row")[i].find(".value").val() );
            console.log( $(".custom-row")[i].find(".probability").val() );
            //main.custom.outcomes.push( );
        }
    
        main.trialCount = window.prompt( "Run the trial how many times?" );
        main.runTrial( main.trialCount );
        main.getExpectedValue();

    }
};

$(document).ready( function() {
    $("#ok-custom").click( function() {
        main.customOK();
    } );
});
