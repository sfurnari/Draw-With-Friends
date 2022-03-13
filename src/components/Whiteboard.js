import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/whiteboard.css';


const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); // getContext() method returns a drawing context on the canvas

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName('color');

    // set the current colour
    const current = {
      color: 'black',
    };

    // helper that will update the current colour
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
      console.log('currently drawing');
      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseUp);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10));

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown);
    canvas.addEventListener('touchend', onMouseUp);
    canvas.addEventListener('touchcancel', onMouseUp);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10));

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    socketRef.current = io.connect('http://localhost:8080');
    socketRef.current.on('drawing', onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />

      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color brown" />
        <div className="color red" />
        <div className="color orange" />
        <div className="color yellow" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color purple" />
      </div>
    </div>
  );
};

export default Board;