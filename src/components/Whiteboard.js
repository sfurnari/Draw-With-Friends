import React, { useRef, useEffect } from 'react';
import '../styles/whiteboard.css';


const Board = (props) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d'); 

    const {width, height} = canvas.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    const colors = document.getElementsByClassName('color');

    const current = {
      color: 'black',
    }; // set the current colour

    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    }; // onColorUpdate

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    } // click listener for colors

    let drawing = false;

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 4;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = width;
      const h = height;

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    }; // drawLine()


    const onMouseDown = (e) => {
      drawing = true;
      // console.log('rect:' , e.target.getBoundingClientRect());
      const {x, y } = getScaledCoords(e)
      current.x = x
      current.y = y
    }; // onMouseDown()

    const getScaledCoords = (e) => {
      const x = e.pageX - e.target.offsetLeft
      const y = e.pageY - e.target.offsetTop
      return {x, y}
    } // getScaledCoords()

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      const {width, height} = e.target.getBoundingClientRect()
      const {x, y } = getScaledCoords(e)
      drawLine(current.x, current.y, x, y, current.color, true);
      current.x = x
      current.y = y
    }; // onMouseMove()

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      const {x, y } = getScaledCoords(e)
      drawLine(current.x, current.y, x, y, current.color, true);
    }; // onMouseUp()

    
    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }; // throttle()

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseUp);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 32));

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    socketRef.current = props.socket;
    socketRef.current.on('drawing', onDrawingEvent);
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