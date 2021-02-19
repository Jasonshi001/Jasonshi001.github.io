console.log('In JavaScript')

//initialize canvas
var canvas = new fabric.Canvas('c');
//set backgroundImage
canvas.setBackgroundImage('https://www.popsci.com/resizer/IJkdofwk2Ip4y5QqQoeZdFG29I0=/918x612/cloudfront-us-east-1.images.arcpublishing.com/bonnier/3NIEQB3SFVCMNHH6MHZ42FO6PA.jpg');
//initialize a rectangle
var rect = new fabric.Rect({
    left: 200,
    top: 100,
    fill: 'red',
    width: 50,
    height: 50,
    angle: 45
});
canvas.add(rect);

//initialize a circle, triangle, ellipse
var circle = new fabric.Circle({
    radius: 50,
    fill: 'green',
    left: 100,
    top: 100
});
var triangle = new fabric.Triangle({
    width: 20,
    height: 30,
    fill: 'blue',
    left: 50,
    top: 50
});
canvas.add(circle, triangle);

var ellipse = new fabric.Ellipse()

//set objects' properties
rect.set({ left: 100, top: 50, width: 40, height: 80, fill: '#f55', opacity: 0.7 });
circle.set('fill', 'red');
circle.set({strokeWidth: 5, stroke: 'rgbn(100, 200, 200, 0.5)'});
circle.set('angle', 15).set('flipY', true);
triangle.set({left: 80, top: 210})

//use images
fabric.Image.fromURL('https://miro.medium.com/max/2400/0*ihTZPO4iffJ8n69_', function(oImg) {
    // scale image down, and flip it, before adding it onto canvas
    oImg.scale(0.2).set('flipX', true);
    oImg.set({
        left: 300,
        top: 270
    });
    oImg.animate('left', '+=100', {
        onChange: canvas.renderAll.bind(canvas),
        duration: 1000,
        easing: fabric.util.ease.easeInElastic
    });
    canvas.add(oImg);
});

//draw lines with path (moveto, lineto...)
var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z')
path.set({left: 220, top: 50, fill: 'yellow'});
canvas.add(path);

//animate objects
rect.animate('angle', '+=45', {
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
});
triangle.animate('left', '+=100', {
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
});
//path won't be animated becasue of the absolute settings above
// path.animate('left', '+=50', {
//     onChange: 1000,
//     easing: fabric.util.ease.easeOutBounce
// })

//gradient
var gradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pixels',
    coords: {x1: 0, y1: 0, x2: circle.width, y2: 0},
    colorStops: [
        { offset: 0, color: 'red' },
        { offset: 0.2, color: 'orange' },
        { offset: 0.4, color: 'yellow' },
        { offset: 0.6, color: 'green' },
        { offset: 0.8, color: 'blue' },
        { offset: 1, color: 'purple' }
    ]
});
circle.set('fill', gradient);

//text
var underlineText = new fabric.Text("underlined text \nwith shadow", {
    underline: true,
    left: 20,
    top:300,
    shadow: 'rgba(0,0,0,0.5) 5px 5px 5px'
});
var strokeThroughText = new fabric.Text("stroke-through text", {
    linethrough: true,
    left: 20,
    top: 400
});
var overlineText = new fabric.Text("overline text", {
    overline: true,
    left: 20,
    top: 450
});
canvas.add(underlineText, strokeThroughText, overlineText)

//mouse clicked and show the coordinates
canvas.on('mouse:down', function(options) {
    console.log(options.e.clientX, options.e.clientY);
    if (options.target) {
        console.log('an object was clicked! ', options.target.type);
    };
});

canvas.renderAll();
