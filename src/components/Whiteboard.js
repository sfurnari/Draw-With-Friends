import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/whiteboard.css';


const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {

    const canvas = canvasRef.current;
    const {width, height} = canvas.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d'); 

    const colors = document.getElementsByClassName('color');

    const current = {
      color: 'black',
    }; // set the current colour

    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    let drawing = false;

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 4;
      context.stroke();
      context.closePath();
      // console.log('currently drawing');
      if (!emit) { return; }
      // const {width, height} = e.target.getBoundingClientRect()
      // const w = width;
      // const h = height;
      // console.log('width', w);
      // console.log('height', h);
      // console.log('x0', x0);
      // console.log('y0', y0);

      // socketRef.current.emit('drawing', {
      //   x0: x0 / w,
      //   y0: y0 / h,
      //   x1: x1 / w,
      //   y1: y1 / h,
      //   color,
      // });
    };


    const onMouseDown = (e) => {
      drawing = true;
      // console.log('rect:' , e.target.getBoundingClientRect());
      const {x, y } = getScaledCoords(e)
      current.x = x
      current.y = y
    };

    const getScaledCoords = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop
      return {x, y}
    }

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      const {width, height} = e.target.getBoundingClientRect()
      const {x, y } = getScaledCoords(e)
      console.log({x, y});
      // const xNorm = e.pageX / window.innerWidth
      // const yNorm = e.pageY / window.innerHeight
      // const canvasX = xNorm * width
      // const canvasY = yNorm * height
      // const canvasX = x
      // const canvasY = y
      console.log('coords:', e.currentTarget.width, e.currentTarget.height);
      drawLine(current.x, current.y, x, y, current.color, true);
      current.x = x
      current.y = y
      console.log('currentx:', current.x);
      console.log('currenty:', current.y);
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      const {x, y } = getScaledCoords(e)
      drawLine(current.x, current.y, x, y, current.color, true);
    };

    // throttle
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

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseUp);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 32));

    // const onResize = () => {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // };

    // window.addEventListener('resize', onResize, false);
    // onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    socketRef.current = io.connect('http://localhost:8080');
    // socketRef.current.on('drawing', onDrawingEvent);
  }, []);

  return (
    <div className='board-container'>
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