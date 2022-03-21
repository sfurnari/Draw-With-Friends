import React, { useRef, useEffect } from 'react';
import '../styles/game.css';


const Board = ({socket, currentlyDrawing}) => {
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
    const size = document.getElementsByClassName('lineSize');

    
    const current = {
      color: 'black',
      size: 4
    }; // set the current colour

    
    const onSizeUpdate = (e) => {
      current.size = e.target.value
    }; // onSizeUpdate
    
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    }; // onColorUpdate
    
    size[0].addEventListener('input', onSizeUpdate) 
      // input listener for size

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    } // click listener for colors

    let drawing = false;

    const drawLine = (x0, y0, x1, y1, color, size, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = size;
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
        size
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
      // const {width, height} = e.target.getBoundingClientRect()
      const {x, y } = getScaledCoords(e)
      drawLine(current.x, current.y, x, y, current.color, current.size, true);
      current.x = x
      current.y = y
    }; // onMouseMove()

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      const {x, y } = getScaledCoords(e)
      drawLine(current.x, current.y, x, y, current.color, current.size, true);
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

    const onResize = () => {
      const {width, height} = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.size);
    }

    const clearBoard = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    socketRef.current = socket;
    socketRef.current.on('drawing', onDrawingEvent);
    socketRef.current.on('newRound', clearBoard)
  }, []);

  return (
    <div 
      className='board-container'
      style={{pointerEvents: currentlyDrawing ? 'auto' : 'none'}}
    >
      <div 
        ref={colorsRef} 
        className="colors"
        style={{visibility: currentlyDrawing ? 'visible' : 'hidden'}}
      >
        <div className="color white" />
        <div className="color black" />
        <div className="color brown" />
        <div className="color red" />
        <div className="color orange" />
        <div className="color yellow" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color purple" />
        <div className="line-size">
          <strong>Brush Size: </strong>
          <input type="range" className="lineSize" min={2} max={30} defaultValue={4}/>
        </div>
      </div>
      <canvas ref={canvasRef} className="whiteboard" />
    </div>
  );
};

export default Board;