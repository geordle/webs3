export function redraw(context, pointArray, color = "black") {

    const {height, width} = context.canvas;

    context.clearRect(
        0,
        0,
        width,
        height,
    );
    context.strokeStyle = color;
    context.lineJoin = "round";
    context.lineWidth = 3;

    let prevPoint = pointArray[0];
    for (const click of pointArray) {
        context.beginPath();
        if (prevPoint.length === 0) {
            context.moveTo(click[0]*width , click[1]*height);
        } else {
            context.moveTo(prevPoint[0]*width, prevPoint[1]*height);
        }
        context.lineTo(click[0]*width, click[1]*height);
        context.closePath();
        context.stroke();
        prevPoint = click;
    }
}
