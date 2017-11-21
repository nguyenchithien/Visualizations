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

        main.background = new Image();
        main.background.src = "images/background.png";

        window.addEventListener( "mousedown",   main.click, false );
        window.addEventListener( "keydown",     main.keydown, false );
        window.addEventListener( "keyup",       main.keyup, false );

        main.generateNodes();
    },

    generateNodes : function() {
        console.log( "Generate nodes" );
        main.nodes.push( { name : "A", x : 100, y : 675 } );
        main.nodes.push( { name : "B", x : 350, y : 675 } );
        main.nodes.push( { name : "C", x : 600, y : 675 } );
        main.nodes.push( { name : "D", x : 150, y : 375 } );
        main.nodes.push( { name : "E", x : 300, y : 375 } );
        main.nodes.push( { name : "F", x : 650, y : 375 } );
        main.nodes.push( { name : "G", x : 100, y : 75 } );
        main.nodes.push( { name : "H", x : 350, y : 75 } );
        main.nodes.push( { name : "I", x : 600, y : 75 } );

        // paths
        main.staticEdges.push( { startX : 100, startY : 675, endX : 150, endY : 375 } );
        main.staticEdges.push( { startX : 100, startY : 75, endX : 150, endY : 375 } );
        
        main.staticEdges.push( { startX : 350, startY : 675, endX : 300, endY : 375 } );
        main.staticEdges.push( { startX : 350, startY : 75, endX : 300, endY : 375 } );
        
        main.staticEdges.push( { startX : 300, startY : 375, endX : 650, endY : 375 } );
        main.staticEdges.push( { startX : 600, startY : 675, endX : 650, endY : 375 } );
        main.staticEdges.push( { startX : 600, startY : 75, endX : 650, endY : 375 } );
        
        //main.staticEdges.push( { startX : 150, startY : 375, endX : 300, endY : 375 } );
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

        // Draw background
        main.canvasWindow.drawImage( main.background, 0, 0 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = "black";
        main.canvasWindow.fillText( "Seven Bridges of Königsberg", 10, 15 );
        main.canvasWindow.fillText( "Click two nodes to connect them.", 250, 15 );
        main.canvasWindow.fillText( "'C' clears the path.", 10, 30 );
        main.canvasWindow.fillText( "'R' generates a random path.", 250, 30 );
        
        main.canvasWindow.font = "20px Arial";
        main.canvasWindow.fillText( "Total distance: " + main.distance, 10, 750 );

        main.canvasWindow.font = "15px Arial";
        main.canvasWindow.fillStyle = nodeColor;
        main.canvasWindow.fillText( "Programmed by Rachel Morris", main.settings.width - 220, main.settings.height - 15 );

        // Draw edges
        for ( var i = 0; i < main.staticEdges.length; i++ )
        {
            main.canvasWindow.strokeStyle = "#ffaa00";
            main.canvasWindow.lineWidth = 3;
            main.canvasWindow.beginPath();
            main.canvasWindow.moveTo( main.staticEdges[i].startX, main.staticEdges[i].startY );
            main.canvasWindow.lineTo( main.staticEdges[i].endX, main.staticEdges[i].endY );
            main.canvasWindow.stroke();
            main.canvasWindow.lineWidth = 1;
        }
        
        // Draw edges
        for ( var i = 0; i < main.edges.length; i++ )
        {
            main.canvasWindow.lineWidth = 5;
            main.canvasWindow.strokeStyle = "#000000";
            main.canvasWindow.beginPath();
            main.canvasWindow.moveTo( main.edges[i].startX, main.edges[i].startY );
            main.canvasWindow.lineTo( main.edges[i].endX, main.edges[i].endY );
            main.canvasWindow.stroke();
            main.canvasWindow.font = "20px Arial";
            main.canvasWindow.fillStyle = edgeLabelColor;
            main.canvasWindow.fillText( main.edges[i].counter, (main.edges[i].startX + main.edges[i].endX) / 2, (main.edges[i].startY + main.edges[i].endY) / 2 );
            main.canvasWindow.lineWidth = 1;
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
            main.canvasWindow.beginPath();
            var ctrX = main.nodes[main.lastClick].x;
            var ctrY = main.nodes[main.lastClick].y;
            main.canvasWindow.strokeStyle = "#ff0000";
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
        var lastNode = startNode;
        var newNode = 0;

        var availableNodes = [ 0, 2, 3, 4, 5 ];

        for ( var i = 0; i < 5; i++ )
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

