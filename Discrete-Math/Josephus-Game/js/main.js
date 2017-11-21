main = {
    settings : null,
    canvasWindow : null,

    image : null,

    circleCount : 10,
    dudes : [],

    init : function( pSettings, pCanvasWindow ) {
        main.circleCount = window.prompt( "How many people in the circle?" );

        main.settings = pSettings;
        main.canvasWindow = pCanvasWindow;

        window.addEventListener( "mousedown",   main.click, false );
        window.addEventListener( "keydown",     main.keydown, false );
        window.addEventListener( "keyup",       main.keyup, false );

        main.buildCircle();
    },

    buildCircle : function() {
        var circleRatio = 360 / main.circleCount;
        var w = 64;
        var h = 96;
        var radius = 300;
        var offsetY = 350;

        for ( var i = 0; i < main.circleCount; i++ )
        {
            var dude = [];

            // load image
            dude.image = new Image();
            dude.image.src = "images/" + String(i % 15 + 1) + ".png";

            var rads = (circleRatio * i) * Math.PI / 180;

            // set position
            dude.x = Math.cos( rads ) * radius + offsetY;
            dude.y = Math.sin( rads ) * radius + offsetY;
            dude.w = w;
            dude.h = h;

            // set attributes
            dude.isAlive = true;
            dude.number = i;

            main.dudes.push( dude );
        }
    },

    update : function() {
    },

    draw : function() {
        // Fill background
        main.canvasWindow.fillStyle = "#ace9ff";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "black";
        main.canvasWindow.fillText( "Josephus Game", 10, 15 );
        main.canvasWindow.fillText( "Click person toggle between \"dead\" and \"alive\".", 10, 30 );

        main.canvasWindow.fillStyle = "#0e7ca5";
        main.canvasWindow.fillText( "Programmed by Rachel Morris", main.settings.width - 220, main.settings.height - 15 );

        main.canvasWindow.fillStyle = "black";
        main.canvasWindow.font = "20px Arial";
        for ( var i = 0; i < main.dudes.length; i++ )
        {
            // Draw dude
            main.canvasWindow.drawImage( main.dudes[i].image, main.dudes[i].x, main.dudes[i].y );

            // Draw label
            main.canvasWindow.fillText( String( main.dudes[i].number + 1 ), main.dudes[i].x, main.dudes[i].y );
        }
    },

    // Events
    click : function( event )
    {
        var windowRect = $( "canvas" )[0].getBoundingClientRect();
        var mouseX = event.clientX - windowRect.left;
        var mouseY = event.clientY - windowRect.top;

        for ( var i = 0; i < main.dudes.length; i++ )
        {
            if (    main.dudes[i].x < mouseX && mouseX < main.dudes[i].x + main.dudes[i].w &&
                    main.dudes[i].y < mouseY && mouseY < main.dudes[i].y + main.dudes[i].h )
            {
                // Click!
                main.dudes[i].isAlive = !main.dudes[i].isAlive;

                // Change image
                if ( main.dudes[i].isAlive == true )
                {
                    main.dudes[i].image.src = "images/" + String(main.dudes[i].number % 15 + 1) + ".png";
                }
                else
                {
                    main.dudes[i].image.src = "images/dead.png";
                }
            }

        }
    },

    keydown : function( event )
    {
    },

    keyup : function( event )
    {
    }
};

