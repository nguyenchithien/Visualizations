main = {
    settings : null,
    canvasWindow : null,

    image : null,

    nodes : [],
    edges : [],
    staticEdges : [],
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

        // Outer nodes
        main.nodes.push( { name : "", x : 100, y : 350 } );
        main.nodes.push( { name : "", x : 650, y : 350 } );
        
        main.nodes.push( { name : "", x : 200, y : 650 } );
        main.nodes.push( { name : "", x : 550, y : 650 } );
        
        main.nodes.push( { name : "", x : 375, y : 100 } );

        main.staticEdges.push( { startX : 100, startY : 350, endX : 200, endY : 650 } );
        main.staticEdges.push( { startX : 550, startY : 650, endX : 200, endY : 650 } );
        main.staticEdges.push( { startX : 550, startY : 650, endX : 650, endY : 350 } );
        main.staticEdges.push( { startX : 100, startY : 350, endX : 375, endY : 100 } );
        main.staticEdges.push( { startX : 650, startY : 350, endX : 375, endY : 100 } );

        // Middle nodes
        main.nodes.push( { name : "", x : 200, y : 375 } );
        main.nodes.push( { name : "", x : 550, y : 375 } );
        
        main.nodes.push( { name : "", x : 285, y : 285 } );
        main.nodes.push( { name : "", x : 460, y : 285 } );
        
        main.staticEdges.push( { startX : 100, startY : 350, endX : 200, endY : 375 } );
        main.staticEdges.push( { startX : 650, startY : 350, endX : 550, endY : 375 } );
        
        main.nodes.push( { name : "", x : 250, y : 550 } );
        main.nodes.push( { name : "", x : 500, y : 550 } );
        
        main.nodes.push( { name : "", x : 225, y : 470 } );
        main.nodes.push( { name : "", x : 520, y : 470 } );
        
        main.staticEdges.push( { startX : 200, startY : 650, endX : 250, endY : 550 } );
        main.staticEdges.push( { startX : 550, startY : 650, endX : 500, endY : 550 } );
        
        main.nodes.push( { name : "", x : 375, y : 200 } );
        main.nodes.push( { name : "", x : 375, y : 548 } );
        main.staticEdges.push( { startX : 375, startY : 100, endX : 375, endY : 200 } );
        
        main.staticEdges.push( { startX : 375, startY : 200, endX : 200, endY : 375 } );
        main.staticEdges.push( { startX : 375, startY : 200, endX : 550, endY : 375 } );
        main.staticEdges.push( { startX : 200, startY : 375, endX : 250, endY : 550 } );
        main.staticEdges.push( { startX : 550, startY : 375, endX : 500, endY : 550 } );
        main.staticEdges.push( { startX : 250, startY : 550, endX : 500, endY : 550 } );

        // Inner nodes
        main.nodes.push( { name : "", x : 300, y : 350 } );
        main.nodes.push( { name : "", x : 450, y : 350 } );
        main.staticEdges.push( { startX : 300, startY : 350, endX : 285, endY : 285 } );
        main.staticEdges.push( { startX : 450, startY : 350, endX : 460, endY : 285 } );
        
        main.nodes.push( { name : "", x : 275, y : 425 } );
        main.nodes.push( { name : "", x : 475, y : 425 } );
        main.staticEdges.push( { startX : 275, startY : 425, endX : 225, endY : 470 } );
        main.staticEdges.push( { startX : 475, startY : 425, endX : 520, endY : 470 } );
        
        main.nodes.push( { name : "", x : 375, y : 500 } );
        main.staticEdges.push( { startX : 375, startY : 500, endX : 375, endY : 548 } );
        
        main.staticEdges.push( { startX : 300, startY : 350, endX : 450, endY : 350 } );
        main.staticEdges.push( { startX : 450, startY : 350, endX : 475, endY : 425 } );
        main.staticEdges.push( { startX : 475, startY : 425, endX : 375, endY : 500 } );
        main.staticEdges.push( { startX : 375, startY : 500, endX : 275, endY : 425 } );
        main.staticEdges.push( { startX : 275, startY : 425, endX : 300, endY : 350 } );
    },

    update : function() {
    },

    draw : function() {
        var bgColor = "#ffffff";
        var nodeColor = "#34086c";
        var edgeLabelColor = nodeColor;
        
        // Fill background
        main.canvasWindow.fillStyle = bgColor;
        main.canvasWindow.fillRect( 0, 0, main.settings.width, main.settings.height );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "black";
        main.canvasWindow.fillText( "Hamiltonian Cycle", 10, 15 );
        main.canvasWindow.fillText( "Click two nodes to connect them.", 200, 15 );
        main.canvasWindow.fillText( "'C' clears the path.", 500, 15 );
        //main.canvasWindow.fillText( "'R' generates a random path.", 10, 60 );
        
        //main.canvasWindow.font = "20px Arial";
        //main.canvasWindow.fillText( "Total distance: " + main.distance, 10, 750 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = nodeColor;
        main.canvasWindow.fillText( "Programmed by Rachel Morris", main.settings.width - 220, main.settings.height - 15 );
        
        // Draw edges
        for ( var i = 0; i < main.staticEdges.length; i++ )
        {
            main.canvasWindow.strokeStyle = "#999999";
            main.canvasWindow.lineWidth = 1;
            main.canvasWindow.beginPath();
            main.canvasWindow.moveTo( main.staticEdges[i].startX, main.staticEdges[i].startY );
            main.canvasWindow.lineTo( main.staticEdges[i].endX, main.staticEdges[i].endY );
            main.canvasWindow.stroke();
        }
        
        // Draw edges
        for ( var i = 0; i < main.edges.length; i++ )
        {
            main.canvasWindow.strokeStyle = "#ff0000";
            main.canvasWindow.lineWidth = 10;
            main.canvasWindow.beginPath();
            main.canvasWindow.moveTo( main.edges[i].startX, main.edges[i].startY );
            main.canvasWindow.lineTo( main.edges[i].endX, main.edges[i].endY );
            main.canvasWindow.stroke();
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillStyle = edgeLabelColor;
            main.canvasWindow.fillText( main.edges[i].counter, (main.edges[i].startX + main.edges[i].endX) / 2, (main.edges[i].startY + main.edges[i].endY) / 2 );
        }

        // Draw nodes
        for ( var i = 0; i < main.nodes.length; i++ )
        {
            main.canvasWindow.fillStyle = nodeColor;
            main.canvasWindow.fillRect( main.nodes[i].x, main.nodes[i].y, 5, 5 );
            main.canvasWindow.font = "15px Arial";
            main.canvasWindow.fillText( main.nodes[i].name, main.nodes[i].x + 10, main.nodes[i].y + 10 );
        }

        // Draw selection
        if ( main.lastClick != -1 && main.nodes.length > 0 )
        {
            main.canvasWindow.lineWidth = 1;
            main.canvasWindow.beginPath();
            var ctrX = main.nodes[main.lastClick].x;
            var ctrY = main.nodes[main.lastClick].y;
            main.canvasWindow.strokeStyle = "#0000ff";
            main.canvasWindow.arc( ctrX, ctrY, 15, 0, 2 * Math.PI );
            main.canvasWindow.stroke();
        }
    },

    clear: function() {
        main.distance = 0;
        main.edges.splice( 0, main.edges.length );
        main.lastClick = -1;
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

    generatePath : function( startNode ) {
        main.clear();
        startNode = 0;
        var lastNode = startNode;
        var newNode = 0;

        var availableNodes = [];

        for ( var i = 1; i < main.nodes.length; i++ )
        {
            availableNodes.push( i );
        }

        for ( var i = 0; i < main.nodes.length - 1; i++ )
        {
            var rand = Math.floor( Math.random() * ( availableNodes.length ) );
            newNode = availableNodes[rand];

            console.log( lastNode, "-", newNode );
            
            main.distance += main.getDistance( main.nodes[lastNode].x, main.nodes[lastNode].y, main.nodes[newNode].x, main.nodes[newNode].y );
            var edge = {
                startX : main.nodes[lastNode].x,
                startY : main.nodes[lastNode].y,
                endX : main.nodes[newNode].x,
                endY : main.nodes[newNode].y,
                counter : main.edges.length + 1
            };
            main.edges.push( edge );
            lastNode = newNode;
            availableNodes.splice( rand, 1 );
        }

        console.log( "Last:", lastNode, "-", newNode );

        // add final path
        newNode = startNode;
        main.distance += main.getDistance( main.nodes[lastNode].x, main.nodes[lastNode].y, main.nodes[newNode].x, main.nodes[newNode].y );
        var edge = {
            startX : main.nodes[lastNode].x,
            startY : main.nodes[lastNode].y,
            endX : main.nodes[newNode].x,
            endY : main.nodes[newNode].y,
            counter : main.edges.length + 1
        };
        main.edges.push( edge );
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
    }
};

