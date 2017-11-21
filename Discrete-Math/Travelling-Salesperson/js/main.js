main = {
    settings : null,
    canvasWindow : null,

    image : null,

    nodes : [],
    edges : [],
    distance : 0,

    lastClick : -1,

    getDistance: function( x1, y1, x2, y2 ) {
        var dx = x2-x1;
        var dy = y2-y1;
        return Math.sqrt( dx*dx + dy*dy );
    },

    init : function( pSettings, pCanvasWindow ) {
        main.settings = pSettings;
        main.canvasWindow = pCanvasWindow;

        window.addEventListener( "mousedown",   main.click, false );
        window.addEventListener( "keydown",     main.keydown, false );
        window.addEventListener( "keyup",       main.keyup, false );

        main.generateNodes();
    },

    generateNodes : function() {
        console.log( "Generate nodes" );
        main.nodes.push( { name : "Olathe", x : 100, y : 600 } );
        main.nodes.push( { name : "Overland Park", x : 200, y : 400 } );
        main.nodes.push( { name : "Lee's Summit", x : 500, y : 575 } );
        main.nodes.push( { name : "Raytown", x : 450, y : 375 } );
        main.nodes.push( { name : "Kansas City", x : 400, y : 200 } );
        main.nodes.push( { name : "Independence", x : 500, y : 250 } );
    },

    update : function() {
    },

    draw : function() {
        // Fill background
        main.canvasWindow.fillStyle = "#ace9ff";
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "black";
        main.canvasWindow.fillText( "Travelling Salesperson", 10, 15 );
        main.canvasWindow.fillText( "Click two nodes to connect them.", 10, 30 );
        main.canvasWindow.fillText( "'C' clears the path.", 10, 45 );
        
        main.canvasWindow.font = "20px Arial";
        main.canvasWindow.fillText( "Total distance: " + main.distance, 10, 750 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "#0e7ca5";
        main.canvasWindow.fillText( "Programmed by Rachel Morris", main.settings.width - 220, main.settings.height - 15 );

        // Draw edges
        for ( var i = 0; i < main.edges.length; i++ )
        {
            main.canvasWindow.strokeStyle = "#000000";
            main.canvasWindow.beginPath();
            main.canvasWindow.moveTo( main.edges[i].startX, main.edges[i].startY );
            main.canvasWindow.lineTo( main.edges[i].endX, main.edges[i].endY );
            main.canvasWindow.stroke();
            main.canvasWindow.font = "15px Arial";
            main.canvasWindow.fillText( main.edges[i].counter, (main.edges[i].startX + main.edges[i].endX) / 2, (main.edges[i].startY + main.edges[i].endY) / 2 );
        }

        // Draw nodes
        for ( var i = 0; i < main.nodes.length; i++ )
        {
            main.canvasWindow.fillStyle = "#0e7ca5";
            main.canvasWindow.fillRect( main.nodes[i].x, main.nodes[i].y, 5, 5 );
            main.canvasWindow.font = "15px Arial";
            main.canvasWindow.fillText( main.nodes[i].name, main.nodes[i].x + 10, main.nodes[i].y + 10 );
        }

        // Draw selection
        if ( main.lastClick != -1 && main.nodes.length > 0 )
        {
            main.canvasWindow.beginPath();
            var ctrX = main.nodes[main.lastClick].x;
            var ctrY = main.nodes[main.lastClick].y;
            main.canvasWindow.strokeStyle = "#ff0000";
            main.canvasWindow.arc( ctrX, ctrY, 15, 0, 2 * Math.PI );
            main.canvasWindow.stroke();
        }
    },

    // Events
    click : function( event )
    {
        var windowRect = $( "canvas" )[0].getBoundingClientRect();
        var mouseX = event.clientX - windowRect.left;
        var mouseY = event.clientY - windowRect.top;

        var lastClick = main.lastClick;
        var newClick = lastClick;

        var error = 10;

        for ( var i = 0; i < main.nodes.length; i++ )
        {
            if (    mouseX >= main.nodes[i].x - error && mouseX <= main.nodes[i].x + error
                && mouseY >= main.nodes[i].y - error && mouseY <= main.nodes[i].y + error )
            {
                console.log( "Clicked ", i );
                newClick = i;
            }
        }

        // Add path
        if ( lastClick != newClick )
        {
            main.lastClick = newClick;
            main.distance += main.getDistance( main.nodes[lastClick].x, main.nodes[lastClick].y, main.nodes[newClick].x, main.nodes[newClick].y );
            var edge = {
                startX : main.nodes[lastClick].x,
                startY : main.nodes[lastClick].y,
                endX : main.nodes[newClick].x,
                endY : main.nodes[newClick].y,
                counter : main.edges.length + 1
            };
            main.edges.push( edge );
        }
    },

    keydown : function( event )
    {
        if ( event.key == "c" )
        {
            main.distance = 0;
            main.edges.splice( 0, main.edges.length );
            main.lastClick = -1;
        }
    },

    keyup : function( event )
    {
    }
};

